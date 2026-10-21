function print(msg){
    console.log(msg)
}

print("is is working study ??")

let QuestionDiv = document.getElementById("QuestionDiv")
let AnswersDiv = document.getElementById("AnswersDiv")
let AnswersBtns = AnswersDiv.querySelectorAll(".mcq-study-answer-btn")


function genrateQuestion(){
    let Question = getQuestion()

    QuestionDiv.innerHTML=Question.question;
    for (let i = 0; i < AnswersBtns.length; i++) {
        const element = AnswersBtns[i];
        element.innerHTML = Question.answers[i];
    }
    
}

function getQuestion(){
    if (!(subject.value =="Mix") && !(topic.value =="Mix")){
        let arr = (Question[0][subject.value][topic.value]).questions;
        return arr[Math.floor(Math.random() * arr.length)];
    }
}