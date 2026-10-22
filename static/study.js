function print(msg){
    console.log(msg)
}

print("is is working study ??")

let QuestionDiv = document.getElementById("QuestionDiv")
let AnswersDiv = document.getElementById("AnswersDiv")
let AnswersBtns = AnswersDiv.querySelectorAll(".mcq-study-answer-btn")
let explanationBox = document.getElementById("explanationBox")


function genrateQuestion(){
    let Question = getQuestion()

    QuestionDiv.innerHTML= Question.question;
    for (let i = 0; i < AnswersBtns.length; i++) {
        const element = AnswersBtns[i];
        element.innerHTML = Question.answers[i];
    }
    // explanationBox.innerHTML = Question.question;
}

function getQuestion(){
    if (!(subject.value =="Mix") && !(topic.value =="Mix")){
        let arr = (Question[0][subject.value][topic.value]).questions;
        return arr[Math.floor(Math.random() * arr.length)];
    }
}



let solveBTN = document.getElementById("back-btn")
let checkAnswer = document.getElementById("checkAnswer")
let nextBTNNav = document.getElementById("next-btn")


console.log(solveBTN)
console.log(checkAnswer)
console.log(nextBTNNav)


checkAnswer.addEventListener("click", giveAnswer)


function giveAnswer(){
    explanationBox.style.display= "block";
}