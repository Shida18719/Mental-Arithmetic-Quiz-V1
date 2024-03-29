// Use the Fetch API to make a GET request to the /questions endpoint
// const fetchQuestions = async () => {
//     try {
//         const response = await fetch('/questions');
//         const data = await response.json();
//         console.log(data);
//     } catch (error) {
//         console.log('Error fetching questions', error);
//     }
    
// };
// fetchQuestions();


// Get the HTML Elements by their Tag Name and assigned to variable

// Start Quiz Section
const startQuiz = document.getElementById('start-quiz-home');
const userNameInput = document.getElementById("user-name-input");
const usernameBtn = document.getElementById("next-btn");
const errorMsg = document.getElementById("error");
let playerName  =  userNameInput.value;
const playerNameTxt = document.querySelectorAll(".player-name");
const progress = document.getElementById("progress-bar");
const progressBarVol = document.getElementById("progressBar-vol");

// Quiz Rule Box Section
const ruleBox = document.getElementById('rule-box');
const startBtn = document.getElementById('start-quiz-btn');
const backHome = document.getElementById("back-home-btn");

// Select Level of Difficulty Section
const selection = document.getElementById("selection-area");
const level1 = document.getElementById("difficulty-level1");
const level2 = document.getElementById("difficulty-level2");
const level3 = document.getElementById("difficulty-level3");
const homeBtn = document.getElementById("home-btn");

// Questions Section
const questionBox = document.getElementById("question-box-area");
let questionsCounter = document.getElementById("questions-counter");
const questionsText = document.getElementById("questions-txt");
const timeCounter = document.getElementById("time-counter");
let userScore = document.getElementById("user-score");

// Answer options Section
const option1 = document.getElementById("option1");
const option2 = document.getElementById("option2");
const option3 = document.getElementById("option3");
const option4 = document.getElementById("option4");
const optionBtn = document.getElementsByClassName("option-btn");

// Next question 
const nextQueBtn = document.getElementById("next-ques-btn");
const quizEnd = document.getElementById("quiz-end");
const resultBtn = document.getElementById("result-btn");

// Result Section
const quizResultContainer = document.getElementById("quiz-result");
const resultText = document.getElementById("result-text");
const replayQuiz = document.getElementById("replay");

// High score Section
const saveScoreBtn = document.getElementById("save-score-btn");
const hScore = document.getElementById("h-score");
const highScoreList = document.getElementById("high-score-list");
const goHome = document.getElementById("homeBtn");



/** Function to Check UserName input and display error message if invalid or empty
    User name display when the next button is clicked (onload) 
  */ 
window.addEventListener('DOMContentLoaded', () => { 
    usernameBtn.addEventListener("click", function() {

        playerName = userNameInput.value;
        for(let i = 0; i < playerNameTxt.length; i++){
            playerNameTxt[i].innerHTML= userNameInput.value;
        }

        let errorTxt = '';
            // if username input is empty
        if (playerName == '') {
            errorTxt = "Please enter a Username";
            ruleBox.style.display = "none";

        // if username input is less than 8 characters 
        } else if (playerName.length >= 8) {
            errorTxt = "Username must have maximum of 8 characters";
        } 
        // if errorMsg is not empty
        if (errorTxt !== '') {
            
            // display error message in the errorMsg div on home page
            errorMsg.innerHTML = errorTxt;
        } else{ 
            userNameInput.innerHTML = "";
            localStorage.setItem("player", playerName);
            startQuiz.classList.add('hide');
            ruleBox.style.display = "block";
            }
    });

});

// Redirect user to quiz level selection box when start quiz button is clicked
 startBtn.addEventListener("click", function(){
    ruleBox.style.display = "none";
    selection.style.display = "block"; 
 });


// Redirect user to home page when home button is clicked on the difficulty level page
homeBtn.addEventListener("click", function(){

    window.location.reload();
});

 // Redirect user to home page when home button is clicked on the quiz rule box
backHome.addEventListener("click", function(){

    window.location.reload();

});

// Redirect user to home page when home button is clicked on the high score page
goHome.addEventListener("click", function(){

    window.location.reload();

});

// Redirect user to quiz rule box when replay button is clicked.
window.addEventListener('DOMContentLoaded', () => {

    replayQuiz.addEventListener("click", function(){
        // quizResultContainer.style.display = "none";
        // ruleBox.style.display = "block";
        // selection.style.display = "block"; 

        window.location.reload();
    });
});


function getStoredUsername() {
    return localStorage.getItem('playerName');
}


// Redirect user to question page for each level, when level is selected 

let difficultyLevel = "";

// playerName = localStorage.getItem("player");
 const levelTitle = document.getElementById("level");

 // Level 1
window.addEventListener('DOMContentLoaded', () => {  

    level1.addEventListener("click", function(){
        selection.style.display = "none";      
        difficultyLevel = "easy";
        levelTitle.innerHTML = "Level 1"; 
    
        questionStart();
        interval = setInterval(countTime, 1000);
    }); 
    
 
    // Level 2
    level2.addEventListener("click", function(){
        selection.style.display = "none";
        difficultyLevel = "medium"; 
        levelTitle.innerHTML = "Level 2";
    
        questionStart();
        interval = setInterval(countTime, 1000);
    });


    // Level 3
    level3.addEventListener("click", function(){
        selection.style.display = "none";
        difficultyLevel = "hard"; 
        levelTitle.innerHTML = "Level 3";
    
        questionStart();
        interval = setInterval(countTime, 1000);
    });

});   


// Set the next question
nextQueBtn.addEventListener("click", function() {
    setInterval(countTime, 1000)
    nextQuestion(); 
});


//  Set function for time counter     
let timer = 0;
let interval = 0; 

let countTime = ()=> {
    if (timer === 20) {
        clearInterval(interval);
        nextQueBtn.click();  
        timeCounter.innerText = 0    
    } else {
        timer++;
        timeCounter.innerText = timer;
    } 
};

// Set the variables for user score, question number and all questions in the array
let userScored = 0;
userScore.innerHTML = (`${userScored}/5`);
let questionNum = 0;

let currentQuestion;

let allQuestions = [];


// Function to execute each difficulty Level Questions
function questionStart() {

    // Show questions 
    questionBox.style.display = "block"; 
    playerName = localStorage.getItem("player");

    // Code adapted from jsfiddle.net
   
    if (difficultyLevel == 'easy') {
        currentQuestion = questionsLevel1;
    } else if (difficultyLevel == "medium") {
        currentQuestion= questionsLevel2;        
    } else {    
        currentQuestion= questionsLevel3;  
    }

    renderQuestions();
}


// Render first question
function renderQuestions() {

    // Get the difficulty level's set of random questions and options & load the first question.
    allQuestions = shuffle(currentQuestion);
    allQuestions = allQuestions.slice(0, 5);

    questionsText.innerHTML = allQuestions[questionNum].question;

    option1.innerHTML = allQuestions[questionNum].options[0];
    option2.innerHTML = allQuestions[questionNum].options[1];
    option3.innerHTML = allQuestions[questionNum].options[2];
    option4.innerHTML = allQuestions[questionNum].options[3];  
    
}

// disable options
function disableOptions(){
    for(let i = 0; i < optionBtn.length; i++){
        optionBtn[i].disabled = true;
        }
}

// enable options
function enableOptions(){
    for(let i = 0; i < optionBtn.length; i++){
        optionBtn[i].disabled = false;
        }
}


// Function to check if user answer is correct, option button changes to green and vice visa and increases score.
function optionClick(userAnswer) {
    
    if(userAnswer == allQuestions[questionNum].answer) {
        ++userScored;
        userScore.innerHTML = `${userScored}/5`;
        checkAnswers(allQuestions[questionNum].answer).style.backgroundColor="Green";

    }
    else {
        checkAnswers(userAnswer).style.backgroundColor="red";
        checkAnswers(allQuestions[questionNum].answer).style.backgroundColor="Green";
    }

    disableOptions();
}


/**  Function check and return answer option, if answer is strictly equal to option's index. 
*Stops displaying the wrong answers to the wrong questions
*/
function checkAnswers(answerId) {

    if(answerId === 0)
        return option1;
    else if(answerId === 1)
        return option2;
    else if(answerId === 2)
        return option3;
    else if(answerId === 3)
        return option4;
}


/** Function to display next question, answer options and display end of question when questionCounter is qual to 5, 
* then swap the Next Question button with Result 
*/
function nextQuestion() {
    questionNum+=1;

    progressBarVol.style.width = `${(questionNum/5) * 100}%`;
    
     if(questionNum == 5){

        localStorage.setItem("mostRecentScore", userScored);
        quizEnd.innerHTML = `End of Questions.`;
        resultBtn.style.display = "block";
        nextQueBtn.style.display = "none";
        nextQueBtn.disabled = true;

     }else {
       
            questionsText.innerHTML = allQuestions[questionNum].question;
        
            questionsCounter.innerText = parseInt(questionsCounter.innerText) + 1;
            enableOptions();
    
            option1.innerHTML = allQuestions[questionNum].options[0];
            option2.innerHTML = allQuestions[questionNum].options[1];
            option3.innerHTML = allQuestions[questionNum].options[2];
            option4.innerHTML = allQuestions[questionNum].options[3];
    
            option1.style.backgroundColor = "#3f13a4";
            option2.style.backgroundColor = "#3f13a4";
            option3.style.backgroundColor = "#3f13a4";
            option4.style.backgroundColor = "#3f13a4";
        
            // Start timer
            timer = 0;  
     }    
}


// Hide question box and show result
resultBtn.addEventListener("click", () =>{

    questionBox.style.display = "none";
    showResults();
});


/**
  * Function to randomly display quiz with level of difficulty
*  using the Math.random() to Swap an item with another
 */
function shuffle(questionsArray) {
    //Code from jsfiddle.net/gautamz07/zotsc64e/
    let currentQuestionIndex = questionsArray.length, randomise;

    // The conditional statement to shuffle the remaining questions.
    while (currentQuestionIndex != 0) {

        // Pick from the remaining questions.
        randomise = Math.floor(Math.random() * currentQuestionIndex);
        currentQuestionIndex--;

        // And swap it with the current .
        [questionsArray[currentQuestionIndex], questionsArray[randomise]] = [
        questionsArray[randomise], questionsArray[currentQuestionIndex]];
    }

    return questionsArray;
}


// Show result at the end of the question when the showResults function is called on the click of result button
function showResults(){
    quizResultContainer.style.display = "block"; 
    const icon = document.getElementById("icon");
    
    if (userScored > 3){ 

        //creating template literals and passing the user name,score  and total questions 
        icon.innerHTML = `<i class="far fa-star" aria-hidden="true" id="star"></i>`;
        resultText.innerHTML = ` Congrats! ${playerName}.You are a Star, You scored ${userScored} out of 5. You're ready to move up a new level`;
      }

      else if(userScored > 1){  
        resultText.innerHTML = `Nice, ${playerName}. You scored ${userScored} out of 5`;
        
      }
      else{ 
        resultText.innerHTML = `Sorry, ${playerName}. You scored ${userScored} out of 5. Better luck next time`;   
    }
}

const mostRecentScore = localStorage.getItem("mostRecentScore");

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
userScored.innerHTML = mostRecentScore;

// Save high score in local storage when a user clicks on save score button
saveHighScore = (e) => {
    e.preventDefault();

    const score = {
        score: mostRecentScore,
        name: playerName
    };
    highScores.push(score);

    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(10);

    localStorage.setItem("highScores", JSON.stringify(highScores));
    // window.location.assign("/");

    // Display high score when the user clicks on the save button
    highScoreList.innerHTML = highScores.map(score => {
        return `<li class="highScores">${score.name} - ${score.score}</li>`;
    }).join("");

    // Redirect user to high score box when start save score button is clicked
    quizResultContainer.style.display = "none";
    hScore.style.display = "block";
    highScoreList.style.display = "block";

};

// Redirect user to high score box when start save score button is clicked
// saveScoreBtn.addEventListener("click", function(){
//     quizResultContainer.style.display = "none";
//     hScore.style.display = "block";
    // highScoreList.style.display = "block";

//  });

// Updates footer's copyright year with the current year
const year = document.getElementById("current-year");
year.innerHTML = new Date().getFullYear();
