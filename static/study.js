function print(msg){
    console.log(msg)
}

print("is is working study ??")


// doc vars
let nextBTN = document.getElementById("nextQuestion");
let subject = document.getElementById("subject");
let topic = document.getElementById("topic");
let eloRange = document.getElementById("eloRange");
var Question;
// init
fetch("static/data/data.json")
    .then(res => res.json())
    .then(data => {Question = data; initSelect();})
    .catch(error => console.error(error));
// eventlistner

function initSelect(){
    subject.innerHTML = `<option value="Mix">Mix</option>`;
    for (let s = 0; s < Object.keys(Question[0]).length; s++) {
        const whichSubject = Object.keys(Question[0])[s];
        const option = document.createElement("option");
        option.value = whichSubject;
        option.textContent = whichSubject;
        subject.appendChild(option);
    }
}

subject.addEventListener("change", ()=>{
    topic.innerHTML= `<option value="Mix">Mix</option>`;
    let objTopic = (Question[0][subject.value])
    for (let t = 0; t < Object.keys(objTopic).length; t++) {
        const whichTopic = Object.keys(objTopic)[t];

        const option = document.createElement("option");
        option.value = whichTopic;
        option.textContent = whichTopic;
        topic.appendChild(option);
    }
})

nextBTN.addEventListener('click', genrateQuestion);




let QuestionDiv = document.getElementById("QuestionDiv")
let AnswersDiv = document.getElementById("AnswersDiv")
let AnswersBtns = AnswersDiv.querySelectorAll(".mcq-study-answer-btn")




function genrateQuestion(){
    console.log(AnswersBtns);
    // mathjax or letex will came up here....
    let tQuestion = selectQuetion()
    QuestionDiv.innerHTML= tQuestion.question
    for (let i = 0; i < AnswersBtns.length; i++) {
        const answer = AnswersBtns[i];
        answer.innerHTML = tQuestion.answers[i]
        print(tQuestion.answers[i])
    }
    

}




function selectQuetion(){
    return getRandomElement((Question[0][subject.value][topic.value].questions));
} 


function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}