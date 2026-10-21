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
    .then(data => { Question = data; renderSubjects(); })
    .catch(error => console.error(error));

function renderSubjects() {
    console.log("this is the Question" ,Question[0])
    subject.innerHTML = `<option value="Mix">Mix</option>`
    Object.keys(Question[0]).forEach(i => {
        let option = document.createElement("option");
        option.value= i;
        option.innerText = i;
        subject.appendChild(option)
    });
}


subject.addEventListener("change",() =>{
    topic.innerHTML = `<option value="Mix">Mix</option>`
    Object.keys(Question[0][subject.value]).forEach(i => {
        let option = document.createElement("option");
        option.value= i;
        option.innerText = i;
        topic.appendChild(option)
    })
})
// subject.addEventListener('change', renderTopics);
if (nextBTN) nextBTN.addEventListener('click', genrateQuestion);
