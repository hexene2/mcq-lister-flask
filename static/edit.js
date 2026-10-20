(() => {
    const $ = (id) => document.getElementById(id);
    const subjectSelect = $('subject');
    const topicSelect = $('topic');
    const questionSelect = $('questionIndex');
    const form = $('questionForm');
    const status = $('editorStatus');
    const letters = ['A', 'B', 'C', 'D'];
    const ADD_SUBJECT = '__add_subject__';
    const ADD_TOPIC = '__add_topic__';
    let questionData = null;
    let editingIndex = -1;

    async function loadData() {
        status.textContent = 'Loading your question library…';
        try {
            const response = await fetch('/api/questions');
            if (!response.ok) throw new Error('Could not load question library');
            questionData = await response.json();
            if (!Array.isArray(questionData) || !questionData[0]) throw new Error('Question data has an unexpected format');
            renderSubjects();
            status.textContent = 'Question library loaded.';
        } catch (error) {
            status.textContent = `${error.message}. Check that the Flask app is running and data.json is valid.`;
            subjectSelect.innerHTML = '<option value="">Unable to load subjects</option>';
        }
    }

    function renderSubjects(selected = '') {
        const subjects = Object.keys(questionData[0]);
        subjectSelect.innerHTML = '<option value="">Select subject…</option>' +
            subjects.map(name => `<option value="${escapeAttr(name)}">${escapeHtml(name)}</option>`).join('') +
            `<option value="${ADD_SUBJECT}">＋ Add a subject…</option>`;
        if (selected && subjects.includes(selected)) subjectSelect.value = selected;
        else if (subjects.length) subjectSelect.value = subjects[0];
        renderTopics();
    }

    function renderTopics(selected = '') {
        const subject = subjectSelect.value;
        const subjectData = questionData[0][subject];
        if (!subjectData) {
            topicSelect.innerHTML = '<option value="">Select a subject first</option>';
            renderQuestionList();
            return;
        }
        const topics = Object.keys(subjectData);
        topicSelect.innerHTML = '<option value="">Select topic…</option>' +
            topics.map(name => `<option value="${escapeAttr(name)}">${escapeHtml(name)}</option>`).join('') +
            `<option value="${ADD_TOPIC}">＋ Add a topic…</option>`;
        if (selected && topics.includes(selected)) topicSelect.value = selected;
        else if (topics.length) topicSelect.value = topics[0];
        renderQuestionList();
    }

    function renderQuestionList(selectIndex = -1) {
        const questions = getQuestions();
        questionSelect.innerHTML = '<option value="new">＋ New question</option>' + questions.map((q, i) => {
            const label = (q.question || `Question ${i + 1}`).replace(/\s+/g, ' ').slice(0, 75);
            return `<option value="${i}">${i + 1}. ${escapeHtml(label)}</option>`;
        }).join('');
        if (selectIndex >= 0 && selectIndex < questions.length) questionSelect.value = String(selectIndex);
        else questionSelect.value = 'new';
    }

    function getQuestions() {
        const subjectData = questionData?.[0]?.[subjectSelect.value];
        const topicData = subjectData?.[topicSelect.value];
        return Array.isArray(topicData?.questions) ? topicData.questions : [];
    }

    function clearForm() {
        editingIndex = -1;
        form.reset();
        $('elo').value = 100;
        questionSelect.value = 'new';
        $('deleteQuestion').hidden = true;
        $('saveQuestion').textContent = 'Save question';
    }

    function loadQuestion(index) {
        const q = getQuestions()[index];
        if (!q) return clearForm();
        editingIndex = index;
        $('questionText').value = q.question || '';
        $('elo').value = q.elo ?? 100;
        letters.forEach((letter, i) => { $(`answer${letter}`).value = q.answers?.[i] || ''; });
        $('correctAnswer').value = q.correctAnswer || 'A';
        $('explanation').value = q.explanation || '';
        $('deleteQuestion').hidden = false;
        $('saveQuestion').textContent = 'Update question';
        status.textContent = `Editing question ${index + 1}.`;
    }

    function addSubject() {
        const name = window.prompt('Name of the new subject:');
        if (!name || !name.trim()) { renderSubjects(subjectSelect.dataset.previous); return; }
        const clean = name.trim();
        if (questionData[0][clean]) { renderSubjects(clean); status.textContent = 'That subject already exists.'; return; }
        questionData[0][clean] = {};
        renderSubjects(clean);
        topicSelect.innerHTML = `<option value="${ADD_TOPIC}">＋ Add a topic…</option>`;
        topicSelect.value = ADD_TOPIC;
        addTopic();
    }

    function addTopic() {
        const subject = subjectSelect.value;
        if (!subject || subject === ADD_SUBJECT) return;
        const name = window.prompt(`Name of the new topic in ${subject}:`);
        if (!name || !name.trim()) { renderTopics(topicSelect.dataset.previous); return; }
        const clean = name.trim();
        if (questionData[0][subject][clean]) { renderTopics(clean); status.textContent = 'That topic already exists.'; return; }
        questionData[0][subject][clean] = { questions: [] };
        renderTopics(clean);
        clearForm();
        status.textContent = 'Topic created in memory. Save a question to write it to data.json.';
    }

    subjectSelect.addEventListener('focus', () => { subjectSelect.dataset.previous = subjectSelect.value; });
    topicSelect.addEventListener('focus', () => { topicSelect.dataset.previous = topicSelect.value; });
    subjectSelect.addEventListener('change', () => {
        if (subjectSelect.value === ADD_SUBJECT) { addSubject(); return; }
        renderTopics(); clearForm();
    });
    topicSelect.addEventListener('change', () => {
        if (topicSelect.value === ADD_TOPIC) { addTopic(); return; }
        renderQuestionList(); clearForm();
    });
    questionSelect.addEventListener('change', () => {
        if (questionSelect.value === 'new') clearForm();
        else loadQuestion(Number(questionSelect.value));
    });
    $('newQuestion').addEventListener('click', clearForm);

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const subject = subjectSelect.value;
        const topic = topicSelect.value;
        if (!subject || !topic || subject === ADD_SUBJECT || topic === ADD_TOPIC) {
            status.textContent = 'Choose a subject and topic first.'; return;
        }
        const question = {
            question: $('questionText').value.trim(),
            elo: Number($('elo').value),
            answers: letters.map(letter => $(`answer${letter}`).value.trim()),
            correctAnswer: $('correctAnswer').value,
            explanation: $('explanation').value.trim()
        };
        if (!question.question || question.answers.some(answer => !answer) || !question.explanation) {
            status.textContent = 'Please complete the question, all four options, and the explanation.'; return;
        }
        if (!questionData[0][subject][topic]) questionData[0][subject][topic] = { questions: [] };
        if (!Array.isArray(questionData[0][subject][topic].questions)) questionData[0][subject][topic].questions = [];
        const questions = questionData[0][subject][topic].questions;
        if (editingIndex >= 0 && editingIndex < questions.length) questions[editingIndex] = question;
        else { questions.push(question); editingIndex = questions.length - 1; }

        status.textContent = 'Saving…';
        $('saveQuestion').disabled = true;
        try {
            const response = await fetch('/api/questions', {
                method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(questionData)
            });
            const result = await response.json();
            if (!response.ok) throw new Error(result.error || 'Save failed');
            renderQuestionList(editingIndex);
            $('deleteQuestion').hidden = false;
            $('saveQuestion').textContent = 'Update question';
            status.textContent = '✓ Saved to static/data/data.json';
        } catch (error) {
            status.textContent = `Could not save: ${error.message}`;
        } finally { $('saveQuestion').disabled = false; }
    });

    $('deleteQuestion').addEventListener('click', async () => {
        if (editingIndex < 0 || !window.confirm('Delete this question permanently?')) return;
        const questions = getQuestions();
        questions.splice(editingIndex, 1);
        try {
            const response = await fetch('/api/questions', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(questionData) });
            const result = await response.json();
            if (!response.ok) throw new Error(result.error || 'Delete failed');
            renderQuestionList(); clearForm(); status.textContent = 'Question deleted.';
        } catch (error) { status.textContent = `Could not delete: ${error.message}`; }
    });

    function escapeHtml(value) { return String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
    function escapeAttr(value) { return escapeHtml(value); }
    loadData();
})();
