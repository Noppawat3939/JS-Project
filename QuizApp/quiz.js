window.addEventListener('load', () => {
    const Loading = document.querySelector('.loading-bg');
    setTimeout(() => {
        Loading.style.display = 'none';
    }, 2000)
});

const startBtn = document.querySelector('.start-btn button');
const startText = document.querySelector('.start-text');
const ruleBox = document.querySelector('.rule-box');
const exitBtn = ruleBox.querySelector('.buttons .exit-btn');
const continueBtn = ruleBox.querySelector('.buttons .continue-btn');
const questionsBox = document.querySelector('.questions-box');
const choiceList = document.querySelector('.choice-list');
const timeCount = document.querySelector('.time-count');
const timeText = document.querySelector('.time-text');
const resultBox = document.querySelector('.result-box');
const restartBtn = resultBox.querySelector('.restart-btn');

startBtn.addEventListener('click' , () => {
    ruleBox.classList.add('show');
    startBtn.parentElement.style.display = 'none';
    startText.style.display = 'none';
});

exitBtn.addEventListener('click' , () => {
    ruleBox.classList.remove('show');
    startBtn.parentElement.style.display = 'block';
    startText.style.display = 'block';
});

continueBtn.addEventListener('click' , () => {
    ruleBox.classList.remove('show');
    questionsBox.classList.add('show');
    nextBtn.style.pointerEvents ='none';

    showQuestions(0);
    quesCounter(1);
    setTimer(timeValue) ;
});
let counter;
let que_count = 0;
let que_id = 1;
let timeValue = 16;
let userScore = 0;

const nextBtn = questionsBox.querySelector('.next-btn');

nextBtn.addEventListener('click' , () => {
    if(que_count < questions.length -1) {
        que_count++;
        que_id++;
        showQuestions(que_count);
        quesCounter(que_id);
        clearInterval(counter);
        setTimer(timeValue);

        nextBtn.style.pointerEvents ='none';
        timeCount.classList.remove('timeout');
    }
    else {
        console.log('quiz end!')
        showResult();
    }
});

restartBtn.addEventListener('click' , () => {
    window.location.reload();
})

function showQuestions(index) {
    const quesText = document.querySelector('.question-text');
    let quesTag = `<span>`+ questions[index].id + '. ' + questions[index].question + `</span>`;
    quesText.innerHTML = quesTag;

    let choiceTag = `<div class="choice"><span>`+ questions[index].choice[0] + `</span></div>`
                    +`<div class="choice"><span>` + questions[index].choice[1] + `</span></div>`
                    +`<div class="choice"><span>` + questions[index].choice[2] + `</span></div>`
                    +`<div class="choice"><span>` + questions[index].choice[3] + `</span></div>`;
    choiceList.innerHTML = choiceTag;

    const choice = choiceList.querySelectorAll('.choice');
    choice.forEach((choose) => {
        choose.setAttribute('onclick' , 'choiceSelect(this)');
    });
};

function choiceSelect(answer) {
    clearInterval(counter);
    //setTimer(timeValue);

    let userChoice = answer.textContent;
    let correctChoice = questions[que_count].answer;
    let allChoice = choiceList.children.length;

    if(userChoice == correctChoice) {
        answer.classList.add('correct');
        userScore += 1;
    }
    else {
        answer.classList.add('wrong')

        //! if answer wrong then auto selected the correct answer
        for(let i =0; i < allChoice ; i++) {
            if(choiceList.children[i].textContent == correctChoice) {
                choiceList.children[i].setAttribute("class", "choice correct")
            }
        };
    };

    for(let i =0 ; i < allChoice ; i++) {
        choiceList.children[i].classList.add('dis');
    };
    nextBtn.style.pointerEvents ='auto';
};

function showResult() {
    const congratText = document.querySelector('.congrat-text');
    const scoreText = document.querySelector('.score-text');

    resultBox.classList.add('show');
    questionsBox.classList.remove('show');

    if(userScore >=4 ) {
        congratText.innerHTML = `<h1>Congrat!<br> <span>you are good a lot.</span></h1>`
    }
    else if(userScore >= 2) {
        congratText.innerHTML = `<h1>Well<br><span>you are in the intermediate level.</span></h1>`
    }
    else {
        congratText.innerHTML = `<h1>It's OK<br><span>Next time you have to try harder.</span></h1>`
    }
    scoreText.innerHTML = `<p>You got <span>${userScore}</span> points</p>`;
}

function setTimer(time) {
    counter = setInterval(timer , 1000);
    function timer() {
        time--;
        timeCount.textContent = time;
        if(time == 0) {
            timeCount.classList.add('timeout');
            timeText.textContent =  'Time Out';

            clearInterval(counter);

            //! choice addclass 'dis' show next-btn
            let allChoice = choiceList.children.length;        
            for(let i =0 ; i<allChoice ; i++) {
                choiceList.children[i].classList.add('dis')
            }
            nextBtn.style.pointerEvents = 'auto';
        }
        else {
            timeText.textContent =  'Time Left';
        }
    }
}

function quesCounter(index) {
    const totalQues = questionsBox.querySelector('.total-questions');
    let totalQuesTag = `<p><span>` + index + `</span> of <span>5</span> Questions</p>`;
    totalQues.innerHTML = totalQuesTag;
};