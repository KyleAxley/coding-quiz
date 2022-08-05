// array holding questions and answers
var questions = [
    {
    question: "What does HTML stand for?",
    answers: {
     a: "Hyper Text Markup Language",
     b: "Hyper Task Market Language",
     c: "Hyper Tool Marketing Lingo",
     d: "pizza..."
    },
     correctAnswer: "a"
    },
    {
        question: "For strict equality comparisons we should use?", 
        answers: {
        a: "=",
        b: "==",
        c: "===",
        d: "strict="
        },
        correctAnswer: "c"
        
    },
    {
        question: "How do you call a function named 'myFunction'?",
        answers: {
        a: "myFunction()",  
        b: "call myFunction()",
        c: "call function myFunction()",
        d: "With a cellphone"
        },
        correctAnswer: "a"
    },
    {
        question: "What does CSS stand for?",
        answers: {
        a: "Creative Styling Sheets",
        b: "Cascade Style Sheets",
        c: "Central Style Sheet",
        d: "Cascading Style Sheets"
        },
        correctAnswer: "d"
    },
    {
        question: "What command is used in the terminal to figure out what branch you are in?",
        answers: {
        a: "git ls",
        b: "pwd",
        c: "git branch",
        d: "git -branch"
        },
        correctAnswer: "c"
    },
    {
        question: "var para = document.querySelector('p'); what does this do?",
        answers: {
        a: "creates a <p> element",
        b: "selects <p> element in the HTML document",
        c: "ignores all <p> elements",
        d: "p is for pizza..."
        },
        correctAnswer: "b"
    },
    {
        question: "How do you declare a JavaScript variable?",
        answers: {
        a: "v carName;",
        b: "variable carName;",
        c: "var carName;",
        d: "all of the above"
        },
        correctAnswer: "c"
    }
]
var score = 0;
var questionIndex = 0;
var time = 60;
var intervalId = 180;
var initialsElement = document.getElementById('initials');

//selecting the HTML elements
const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const startButton = document.getElementById('start-btn');
const resultsText = document.getElementById('resultsText');
const initialInput = document.getElementById('initialInput');
const submitInitialsBtn = document.getElementById('submitInitialsBtn');
var viewHighScore = document.getElementById("viewHighScore");
var listOfHighScores = document.getElementById("listOfHighScores");
var timer = document.getElementById("timer");
var highScoreSection = document.getElementById("highScoreSection");
var goBackBtn = document.getElementById("goBackBtn");
var listOfHighScores = document.getElementById("listOfHighScores");
var start = document.getElementById("start");

// starts the quiz when start button clicked by calling startQuiz function
startButton.addEventListener("click", startQuiz);


// start the quiz
function startQuiz(){
    questionIndex = 0;
    score = 0
    time = 60
    updateCountdown();
    timer.classList.remove("hidden");
    quizTimer();
    start.classList.add("hidden");
    var quiz = document.getElementById('quiz')
    quiz.classList.remove("hidden");
    showQuestion(questionIndex);
    
}

// show question 
function showQuestion(index) {
    if( index > questions.length - 1){
        endQuiz()

       
       
    } else {
        resultsContainer.classList.add("hidden");
        initialInput.classList.add("hidden");
        var question = document.getElementById('question')
        var answer1 = document.getElementById('answer1')
        var answer2 = document.getElementById('answer2')
        var answer3 = document.getElementById('answer3')
        var answer4 = document.getElementById('answer4')
    
        question.textContent = questions[index].question
        answer1.textContent = questions[index].answers.a
        answer2.textContent = questions[index].answers.b
        answer3.textContent = questions[index].answers.c
        answer4.textContent = questions[index].answers.d
    }  
}

function submitAnswer(button){
    
     // if else statement for if button clicked = correct answer 
      var answerSelected = button.textContent
      var correctAnswerKey = questions[questionIndex].correctAnswer
      var correctAnswerValue = questions[questionIndex].answers[correctAnswerKey]
     // var contentDiv = document.getElementById('content');
      
     
     if (answerSelected === correctAnswerValue){
        resultsText.textContent = "Correct!";
        score++;
      } else {
        //return false and show correct answer
        resultsText.textContent = "Wrong! Correct answer is " + correctAnswerValue ;
        time = time - 10;
      }
      questionIndex++;
      showQuestion(questionIndex)
      resultsContainer.classList.remove("hidden");
      
}   
// store high score and initials to local storage
   var saveHighScore = function(event) {
       event.preventDefault();
       // player must enter password
       if (initialsElement.value === "") {
        alert("Please enter your initials!");
        return;
    } 
    quizContainer.classList.add("hidden");
        timer.classList.add("hidden");
        highScoreSection.classList.remove("hidden");

        var savedHighScores = localStorage.getItem("highscore");
        var scoresArray;
    
        if (savedHighScores === null) {
            scoresArray = [];
        } else {
            scoresArray = JSON.parse(savedHighScores)
        }

    var playerScore = 
    {
       "score": score,
       "initials": initialsElement.value
    }
    scoresArray.push(playerScore);

    var scoresArrayString = JSON.stringify(scoresArray);
    localStorage.setItem('highscore', scoresArrayString);
    
    showHighScores();
  };

  // function to display all high scores
  var i = 0;
  function showHighScores() {
    resultsContainer.classList.add("hidden");
    timer.classList.add("hidden");
    highScoreSection.classList.remove("hidden");

    if (savedHighScores === null) {
        return;
    }

    var savedHighScores = localStorage.getItem("highscore");
    var storedHighScores = JSON.parse(savedHighScores);
    for (; i < storedHighScores.length; i++) {
        var eachNewHighScore = document.createElement("p");
        eachNewHighScore.innerHTML = storedHighScores[i].initials + ": " + storedHighScores[i].score;
        listOfHighScores.appendChild(eachNewHighScore);
    }
}
  
    submitInitialsBtn.addEventListener("click", function(event){ 
        saveHighScore(event);
    });

    viewHighScore.addEventListener("click", function(event) { 
        showHighScores(event);
    });
// event listener on go back button to go back to content div on click
    goBackBtn.addEventListener("click", function() {
        highScoreSection.classList.add("hidden");
        resultsContainer.classList.add("hidden");
        start.classList.remove("hidden");
    });

    // event listener on clear high score button - clears the high scores 
    clearHighScoreBtn.addEventListener("click", function(){
        localStorage.removeItem("highscore");
        listOfHighScores.innerHTML = "High Scores Cleared!";
    });
    
  
// timer funtion
  function quizTimer() {
   intervalId = setInterval(updateCountdown, 1000);
  }
  function endQuiz(){
    clearInterval(intervalId);
    quizContainer.classList.add("hidden");
    resultsText.textContent = ("Quiz Complete. Your score is " + score);
    initialInput.classList.remove("hidden");
    timer.classList.add("hidden");
  }

  function updateCountdown() {
    const countdownEl = document.getElementById('time');
    const minutes = Math.floor(time / 60);
    var seconds = time % 60;

    seconds = seconds < 10 ? '0' + seconds : seconds;
    countdownEl.innerHTML = `${minutes}:${seconds}`;
    if (time > 0) {
        time--;
    } else {
        endQuiz()
        countdownEl.innerHTML = "Out of time!";
    }
   }