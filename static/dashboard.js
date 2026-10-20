fetch('/api/questions')
    .then(response => { if (!response.ok) throw new Error('Could not load question library'); return response.json(); })
    .then(data => {
        const subjects = data?.[0] || {};
        const topicNames = Object.values(subjects);
        const topicCount = topicNames.reduce((total, topics) => total + Object.keys(topics || {}).length, 0);
        const questionCount = topicNames.reduce((total, topics) => total + Object.values(topics || {}).reduce((sum, topic) => sum + (Array.isArray(topic?.questions) ? topic.questions.length : 0), 0), 0);
        document.getElementById('subjectCount').textContent = Object.keys(subjects).length;
        document.getElementById('topicCount').textContent = topicCount;
        document.getElementById('questionCount').textContent = questionCount;
    })
    .catch(() => {
        ['subjectCount', 'topicCount', 'questionCount'].forEach(id => document.getElementById(id).textContent = '—');
    });
