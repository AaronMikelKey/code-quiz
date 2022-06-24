//Global Vars
const highScoreLink = document.querySelector('header a') 
const goBackButton = document.querySelector('#go-back') // Shown after quiz is finished
const startQuizButton = document.querySelector('#start-quiz')
const timer = document.querySelector('#timer')

// Function for viewing High Scores
const seeHighScores = () => {
	const highScoreEl = document.querySelector('#high-scores');
	const homeEl = document.querySelector('#home');
	const quizEl = document.querySelector('#quiz');
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
	const highScoreEl = document.querySelector('#high-scores');
	const homeEl = document.querySelector('#home');
	const quizEl = document.querySelector('#quiz');
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
	const highScoreEl = document.querySelector('#high-scores');
	const homeEl = document.querySelector('#home');
	const quizEl = document.querySelector('#quiz');
	highScoreEl.setAttribute('style', 'display: none')
	homeEl.setAttribute('style', 'display: none')
	quizEl.setAttribute('style', 'display: block')
}

// Show quiz page and start quiz
const startQuiz = () => {
	seeQuizPage();
	// *TODO: ADD FUNCTION FOR STARTING QUIZ*
}

// Start quiz when clicked
startQuizButton.onclick = () => {
	startQuiz()
	quiz();
}

// Function for quiz
const quiz = () => {
	let timeLeft = 75
	setInterval(() => {
		timeLeft > 0 ? timer.innerText = timeLeft : null;
	}, 1000);
}