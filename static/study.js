function print(msg){
    console.log(msg)
}

print("is is working study ??")

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
    const subjectData = subject.value === "Mix" ? Question[0] : Question[0][subject.value];
    const topicData = topic.value === "Mix" ? Object.values(subjectData).flatMap(item => item.questions || []) : (subjectData?.[topic.value]?.questions || []);
    const available = topicData.length ? topicData : Object.values(Question[0]).flatMap(item => Object.values(item).flatMap(t => t.questions || []));
    return getRandomElement(available);
} 


function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}