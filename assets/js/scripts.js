//Global Vars
const highScoreLink = document.querySelector('header a') // link to high score page
const goBackButton = document.querySelector('#go-back') // Shown after quiz is finished
const startQuizButton = document.querySelector('#start-quiz') // button to start quiz
const clearHighScoreButton = document.querySelector('#clear') // button to clear scores
const timer = document.querySelector('#timer') // number for time left
const highScoreEl = document.querySelector('#high-scores');  // div for high scores
const highScoreList = highScoreEl.querySelector('ol')
const homeEl = document.querySelector('#home'); // div for home page
const quizEl = document.querySelector('#quiz'); // div for quiz
const question = document.querySelector('#question'); // h2 for question
const answerButton1 = document.querySelector('#answer-1')
const answerButton2 = document.querySelector('#answer-2')
const answerButton3 = document.querySelector('#answer-3')
const answerButton4 = document.querySelector('#answer-4')
const result = document.querySelector('#result'); // display area for result of answered question
const form = document.querySelector('form')
const input = document.querySelector('input')
const yourScore = document.querySelector('#your-score')
let timeLeft = 75
let score = 0

// Array of objects for quiz questions
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
		question: 'Which of these is NOT a built-in Javascript object: ',
		answers: ['Date', 'Object', 'Null', 'Error'],
		correct: 'Null'
	},{
		question: 'Which of the following can be nested within a <table> element: ',
		answers: ['<thead>', '<a>', '<div>', '<footer>'],
		correct: '<thead>'
	},{
		question: 'Which of the following is not a CSS selector: ',
		answers: ['*', ':', '$', '#'],
		correct: '$'
	},{
		question: 'Which of the following defines the main axis in flexbox?',
		answers: ['x-axis', 'y-axis', 'center', 'column'],
		correct: 'column'
	},{
		question: 'Which of the following is a CSS psuedo class?',
		answers: [':target', ':bracket', ':user', ':pepperoni'],
		correct: ':target'
	},{
		question: 'Which of the following cannot be used as a color in CSS: ',
		answers: ['rgb(190, 66, 100)', 'superLightOrange' ,'#23bf8h', 'hsl(172, 82, 67)'],
		correct: 'superLightOrange'
	},{
		question: 'Click yes',
		answers: ['yes', 'no', 'no way', 'maybe'],
		correct: 'yes'
	},
]

// Function for viewing High Scores
const seeHighScores = () => {
	highScoreEl.setAttribute('style', 'display: block')
	homeEl.setAttribute('style', 'display: none')
	quizEl.setAttribute('style', 'display: none')
	//clear the existing nodes in the ol since we sort and append them
	while (highScoreList.firstChild) {
		highScoreList.removeChild(highScoreList.firstChild)
	}
	let highScores = JSON.parse(localStorage.getItem('highScores'))
	if (highScores != null) { // if JSON.parse returns null if the object doesn't exist
		highScores.sort((a,b) => b.score - a.score) //sort scores highest to lowest
		for (let i=0; i<highScores.length; i++) {
			let scoreListItem = document.createElement('li')
			let userScore = highScores[i].name + ' : ' + highScores[i].score
			scoreListItem.textContent = userScore;
			highScoreList.append(scoreListItem) // append sorted items to ol
		}
	}
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
	quizLogic();
	localStorage.removeItem('score') // clear stored score in case user doesn't save before starting again
	seeQuizPage();
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
		// questionCount is incremented after a question is answered
		question.textContent = questions[questionCount].question;
		answerButton1.textContent = questions[questionCount].answers[0]
		answerButton2.textContent = questions[questionCount].answers[1]
		answerButton3.textContent = questions[questionCount].answers[2]
		answerButton4.textContent = questions[questionCount].answers[3]
	}
	//Countdown timer
	let countdownTimer = setInterval(() => {
		timeLeft > 0 ? timer.textContent = timeLeft : (timer.textContent = null, stopQuiz(), clearInterval(countdownTimer));
		timeLeft -= 1
	}, 1000);
	nextQuestion()
	let answerButtons = document.querySelector('#answers');
	// Event listener for answer buttons
	answerButtons.addEventListener('click', function(event) {
		let selectedAnswer = event.target
		if (
			selectedAnswer.textContent == questions[questionCount].correct && 
			questionCount < questions.length - 1 && 
			timeLeft > 0
			) {
			score += 1;
			questionCount += 1;
			result.textContent = 'Correct!'
			nextQuestion()
		} 
		else if (
			selectedAnswer.textContent != questions[questionCount].correct &&
			 questionCount < questions.length - 1 && 
			 timeLeft > 0
			 ){
			questionCount += 1;
			result.textContent = 'Incorrect.'
			timeLeft -= 2
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
	yourScore.textContent = 'Your score is ' + score
	seeHighScores()
	let highScores
	localStorage.getItem('highScores') == null ? highScores = [] : highScores = JSON.parse(localStorage.getItem('highScores'))

	let user = ''
	form.setAttribute('style', 'display: block')
	form.addEventListener('submit', () => {
		let name = input.value
		let score = localStorage.getItem('score')
		user = {name : name, score : score}
		highScores.push(user)
		localStorage.setItem('highScores', JSON.stringify(highScores))
		form.setAttribute('style', 'display: none')
	})
}

// Function for finished quiz
const stopQuiz = () => {
	score += timeLeft;
	timeLeft = 0;
	localStorage.setItem('score', score.toString());
	saveHighScore()
}

//Function to reset high scores
const clearHighScores = () => {
	localStorage.removeItem('highScores')
}

// Add high score reset to button
clearHighScoreButton.onclick = () => {
	clearHighScores()
	seeHighScores()
}