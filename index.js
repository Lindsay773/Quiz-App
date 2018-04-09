let questionNumber = 0;
let score = 0;

function generateQuestion() {
  const numQuestions = STORE.quizItems.length;
  
  if (questionNumber < numQuestions) {
    const quizItem = STORE.quizItems[questionNumber];
    
    return `
      <div class="currentFeedback" role="banner">
        <ul>
          <li class="questionCount">Question: <span class="questionNumber">${questionNumber + 1}</span>/${numQuestions}</li>
          <li class="scoreCount"><span class="score">Score: ${score}</span>/${numQuestions}</li>
        </ul>
      </div>
      <section class="questionForm">
        <form>
          <fieldset>
            <legend>
            <h2 class="quizQuestion">${quizItem.question}</h2>
            </legend>
            <label class="answerChoice">
              <input type="radio" value="${quizItem.answers[0]}" name="answer" required>
              <span>${quizItem.answers[0]}</span>
            </label>
            <label class="answerChoice">
              <input type="radio" value="${quizItem.answers[1]}" name="answer" required>
              <span>${quizItem.answers[1]}</span>
            </label>
            <label class="answerChoice">
              <input type="radio" value="${quizItem.answers[2]}" name="answer" required>
              <span>${quizItem.answers[2]}</span>
            </label>
            <label class="answerChoice">
              <input type="radio" value="${quizItem.answers[3]}" name="answer" required>
              <span>${quizItem.answers[3]}</span>
            </label>
          </fieldset>
          <button class="submitAnswer" type="submit">SUBMIT</button>
        </form>
      </section>
    `;
  }
  else {
    renderFinalFeedbackPage();
  }
}

function startQuiz() {
  $('.startPage').on('click', '.startBtn', function(event) {
    $('.startPage').addClass('display-none');
    $('.questionPage').css('display', 'block');
    $('.questionNumber').text(1);
  });
}

function renderQuestion() {
  $('.questionPage').html(generateQuestion());
}

function userSelectAnswer() {
  $(document).on('click', '.submitAnswer', function(event) {
    event.preventDefault;
    let selected = $('input:checked');
    let answer = selected.val();
    if (!answer) {
      alert("Please select an answer");
      return;
    }
    
    let correctAnswer = `${STORE.quizItems[questionNumber].correctAnswer}`;
    if (answer === correctAnswer) {
      userAnswerFeedbackCorrect();
      score++;
    }
    else {
     userAnswerFeedbackWrong();
    }
  });
}

function userAnswerFeedbackCorrect() {
  let correctAnswer = `${STORE.quizItems[questionNumber].correctAnswer}`;
  $('.questionPage').html(`
    <section class="answerFeedback">
      <div class="correctFeedback section">
        <h2 class="feedback">Cheers! You got it right!</h2>
        <img class="correct-img" src="http://thestandardedition.files.wordpress.com/2010/05/3057895414_c4762f3cd6.jpg" alt="people making a toast to the end of prohibition">
        <button class="nextQuestion btn" type="submit">NEXT</button>
      </div>
    </section>
  `);
} 

function userAnswerFeedbackWrong() {
  let correctAnswer =`${STORE.quizItems[questionNumber].correctAnswer}`;
  $('.questionPage').html(`
    <section class="answerFeedback"> 
      <div class="incorrectFeedback section">
        <h2 class="feedback">Sorry! The correct answer is ${correctAnswer}.</h2>
        <img class="incorrect-img" src="https://i.cbc.ca/1.4070679.1492121975!/fileImage/httpImage/image.jpg_gen/derivatives/16x9_620/usa-prohibiton.jpg" alt="police dumping beer barrels during prohibition">
        <button class="nextQuestion btn" type="submit">NEXT</button>
      </div>
    </section>
  `);
}
function renderFinalFeedbackPage() {
  $('.questionPage').html(`
    <section class="finalFeedbackPage">
      <div class="finalResults section">
        <p class="results"> You got ${score} / ${STORE.quizItems.length}!</p>
        <img class="final-img" src="https://masscentral.com/wp-content/uploads/2017/12/PROHIBITION.jpg" alt="end of prohibition newspaper article">
        <button class="restartBtn btn" type="submit">RESTART</button>
      </div>
    </section>
  `);
}
function handleQuizRestart() {
  $('main').on('click', '.restartBtn', function(event) {
    questionNumber = 0;
    score = 0;
    renderQuestion();
  });
}
function setupApp() {
  $('.startPage').on('click', '.startBtn', function(event) {
    $('.startPage').addClass('display-none');
    $('.questionPage').css('display', 'block');
    $('.questionNumber').text(1);
    renderQuestion();
  });
  $('main').on('click', '.nextQuestion', function(event) {
    questionNumber += 1;
    renderQuestion();
  });
  userSelectAnswer();
  handleQuizRestart();
}


function createQuiz() {
  setupApp();
}

$(createQuiz());