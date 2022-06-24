//Global Vars
const highScoreLink = document.querySelector('header a') // link to high score page
const goBackButton = document.querySelector('#go-back') // Shown after quiz is finished
const startQuizButton = document.querySelector('#start-quiz') // button to start quiz
const timer = document.querySelector('#timer') // number for time left
const highScoreEl = document.querySelector('#high-scores');  // div for high scores
const homeEl = document.querySelector('#home'); // div for home page
const quizEl = document.querySelector('#quiz'); // div for quiz
const question = document.querySelector('#question'); // h2 for question
const answerButton1 = document.querySelector('#answer-1')
const answerButton2 = document.querySelector('#answer-2')
const answerButton3 = document.querySelector('#answer-3')
const answerButton4 = document.querySelector('#answer-4')
const result = document.querySelector('#result'); // display area for result of answered question
let timeLeft = 75
let score = 0

// Object for quiz questions
let questions = [
	{
		question: 'Commonly used data types do NOT include which of the following: ',
		answers: ['Number', 'Array', 'Boolean', 'String'],
		correct: 'Array'
	},{
		question: 'Which of the following is not an HTML element: ',
		answers: ['div', 'img', 'article', 'break'],
		correct: 'break'
	},{
		question: 'Commonly used data types do NOT include which of the following: ',
		answers: ['Number', 'Array', 'Boolean', 'String'],
		correct: 'Array'
	},{
		question: 'Commonly used data types do NOT include which of the following: ',
		answers: ['Number', 'Array', 'Boolean', 'String'],
		correct: 'Array'
	},{
		question: 'String values must be enclosed in which of the following: ',
		answers: ['Parenthesis', 'Brackets', 'Quotation Marks', 'Slashes'],
		correct: 'Quotation Marks'
	},
]

// Function for viewing High Scores
const seeHighScores = () => {
	highScoreEl.setAttribute('style', 'display: block')
	homeEl.setAttribute('style', 'display: none')
	quizEl.setAttribute('style', 'display: none')
}

// Run seeHighScores when link is clicked
highScoreLink.onclick = () => {
	seeHighScores()
}

// Function for viewing home page
const seeHomePage = () => {
	highScoreEl.setAttribute('style', 'display: none')
	homeEl.setAttribute('style', 'display: block')
	quizEl.setAttribute('style', 'display: none')
}

// Go back button from high score page
goBackButton.onclick = () => {
	seeHomePage();
}

// Function for viewing quiz page
const seeQuizPage = () => {
	highScoreEl.setAttribute('style', 'display: none')
	homeEl.setAttribute('style', 'display: none')
	quizEl.setAttribute('style', 'display: block')
}

// Show quiz page and start quiz
const startQuiz = () => {
	localStorage.removeItem('score') // clear stored score in case user doesn't save before starting again
	seeQuizPage();
	quizLogic();
}

// Start quiz when clicked
startQuizButton.onclick = () => {
	startQuiz()
}

// Function for quiz
const quizLogic = () => {
	let questionCount = 0
	//Show questions function
	const nextQuestion = () => {
		question.textContent = questions[questionCount].question;
		answerButton1.textContent = questions[questionCount].answers[0]
		answerButton2.textContent = questions[questionCount].answers[1]
		answerButton3.textContent = questions[questionCount].answers[2]
		answerButton4.textContent = questions[questionCount].answers[3]
	}
	//Countdown timer
	let countdownTimer = setInterval(() => {
		timeLeft > 0 ? timer.textContent = timeLeft : timer.textContent = null;
		timeLeft -= 1
	}, 1000);
	nextQuestion()
	let answerButtons = document.querySelector('#answers');
	console.log(answerButtons)
	answerButtons.addEventListener('click', function(event) {
		console.log(event.target)
		let selectedAnswer = event.target
		if (selectedAnswer.textContent == questions[questionCount].correct && questionCount < questions.length - 1) {
			score += 1;
			questionCount += 1;
			result.textContent = 'Correct!'
			nextQuestion()
		} 
		else if (selectedAnswer.textContent != questions[questionCount].correct && questionCount < questions.length - 1){
			questionCount += 1;
			result.textContent = 'Incorrect.'
			nextQuestion()
		}
		else {
			clearInterval(countdownTimer)
			stopQuiz()
		}
	})

}

// Function to add high scores, save to localstorage
const saveHighScore = () => {
	// TODO: Set object in localstorage to username & score, save over high score in storage.
}

// Function for finished quiz
const stopQuiz = () => {
	score += timeLeft;
	timeLeft = 0;
	localStorage.setItem('score', score.toString());
	seeHighScores();
}