const nextBTN = document.getElementById('nextQuestion');
const subject = document.getElementById('subject');
const topic = document.getElementById('topic');
const eloRange = document.getElementById('eloRange');
let Question;

fetch('/api/questions')
    .then(response => {
        if (!response.ok) throw new Error('Could not load question data');
        return response.json();
    })
    .then(data => { Question = data; initSelect(); })
    .catch(error => console.error(error));

function initSelect() {
    subject.innerHTML = '<option value="Mix">Mix</option>';
    Object.keys(Question[0]).forEach(name => {
        const option = document.createElement('option');
        option.value = name;
        option.textContent = name;
        subject.appendChild(option);
    });
    renderTopics();
}

function renderTopics() {
    topic.innerHTML = '<option value="Mix">Mix</option>';
    const subjectData = subject.value === 'Mix' ? Question[0] : (Question[0][subject.value] || {});
    const names = new Set();
    Object.values(subjectData).forEach(value => Object.keys(value || {}).forEach(name => names.add(name)));
    names.forEach(name => {
        const option = document.createElement('option');
        option.value = name;
        option.textContent = name;
        topic.appendChild(option);
    });
}

subject.addEventListener('change', renderTopics);
if (nextBTN) nextBTN.addEventListener('click', genrateQuestion);
