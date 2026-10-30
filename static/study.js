function print(msg){
    console.log(msg)
}

print("is is working study ??")

let QuestionDiv = document.getElementById("QuestionDiv")
let AnswersDiv = document.getElementById("AnswersDiv")
let AnswersBtns = AnswersDiv.querySelectorAll(".mcq-study-answer-btn")
let explanationBox = document.getElementById("explanationBox")

let Question2;
let letters = ['A', 'B', 'C', 'D'];


function genrateQuestion(){
    Question2 = getQuestion()
    mcqStudyAnswerBtn.forEach((i)=>{
        i.classList.remove("highLight")
        console.log(i)  
    })
    QuestionDiv.innerHTML= Question2.question;
    for (let i = 0; i < AnswersBtns.length; i++) {
        const element = AnswersBtns[i];
        element.innerHTML = Question2.answers[i];
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

let mcqStudyAnswerBtn = []

for (let i = 0; i < 4; i++) {
    mcqStudyAnswerBtn.push(document.getElementById("mcq-study-answer-btn" + String(i+1)))
}
mcqStudyAnswerBtn.forEach((i)=>{
    i.addEventListener("click",()=>{
        console.log(i)
        giveAnswer()
        highLight(i)
    })
})

checkAnswer.addEventListener("click", giveAnswer)
nextBTNNav.addEventListener("click", genrateQuestion)


function highLight(i){
    mcqStudyAnswerBtn.forEach((i2)=>{
        i2.classList.remove("highLight")
    })
    i.classList.add("highLight")
}

function giveAnswer(){
    explanationBox.style.display= "block";
    letters.forEach((i)=>{
        if (Question.correctAnswer == i){
            console.log(i)
        }
    })
}


function resetBTNs (){
    mcqStudyAnswerBtn.forEach((i)=>{
        i.classList.remove("highLight")
        i.classList.remove("correct answer")
    })
}