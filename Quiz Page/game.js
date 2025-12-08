const questions = [
  {
    question: "What does HTML stand for?",
    choices: [
      "Hyper Text Markup Language",
      "High Tech Modern Language",
      "Home Tool Markup Language",
      "Hyperlinks and Text Markup Language",
    ],
    correct: 0,
  },
  {
    question: "Which property is used to change the text color in CSS?",
    choices: ["font-color", "text-color", "color", "text-style"],
    correct: 2,
  },
  {
    question: "What is the purpose of responsive web design?",
    choices: [
      "To make websites faster",
      "To make websites work on different screen sizes",
      "To reduce file sizes",
      "To add animations",
    ],
    correct: 1,
  },
  {
    question: "Which CSS property controls the spacing inside an element?",
    choices: ["margin", "padding", "border", "spacing"],
    correct: 1,
  },
  {
    question: "What is the correct way to link an external CSS file?",
    choices: [
      '<link rel="stylesheet" href="style.css">',
      '<css src="style.css">',
      '<stylesheet href="style.css">',
      '<link href="style.css">',
    ],
    correct: 0,
  },
  {
    question: "Which of the following is NOT a semantic HTML tag?",
    choices: ["<header>", "<article>", "<div>", "<footer>"],
    correct: 2,
  },
  {
    question: "What does CSS stand for?",
    choices: [
      "Cascading Style Sheets",
      "Computer Style Sheets",
      "Creative Style Sheets",
      "Cascading System Sheets",
    ],
    correct: 0,
  },
  {
    question: "Which property is used to create rounded corners in CSS?",
    choices: ["border-radius", "corner-radius", "round-border", "border-round"],
    correct: 0,
  },
  {
    question: "What is the purpose of the viewport meta tag?",
    choices: [
      "To specify the page title",
      "To make the website responsive on mobile devices",
      "To link CSS files",
      "To define character encoding",
    ],
    correct: 1,
  },
  {
    question: "Which flexbox property aligns items along the main axis?",
    choices: [
      "align-items",
      "justify-content",
      "flex-direction",
      "align-content",
    ],
    correct: 1,
  },
];

let currentQuestionIndex = 0;
let answeredCorrectly = false;

function loadQuestion() {
  const current = questions[currentQuestionIndex];
  document.getElementById("question").textContent = current.question;
  document.getElementById("currentQuestion").textContent =
    currentQuestionIndex + 1;
  document.getElementById("totalQuestions").textContent = questions.length;

  const choicesContainer = document.getElementById("choicesContainer");
  choicesContainer.innerHTML = "";

  current.choices.forEach((choice, index) => {
    const choiceDiv = document.createElement("div");
    choiceDiv.className = "choice-container";
    choiceDiv.innerHTML = `
                    <p class="choice-prefix">${String.fromCharCode(
                      65 + index
                    )}</p>
                    <p class="choice-text">${choice}</p>
                `;

    choiceDiv.addEventListener("click", () => selectAnswer(index, choiceDiv));
    choicesContainer.appendChild(choiceDiv);
  });

  document.getElementById("nextBtn").style.display = "none";
  answeredCorrectly = false;
}

function selectAnswer(selectedIndex, element) {
  const current = questions[currentQuestionIndex];
  const isCorrect = selectedIndex === current.correct;
  const allChoices = document.querySelectorAll(".choice-container");

  // Disable all choices after selection
  allChoices.forEach((choice) => {
    choice.style.pointerEvents = "none";
  });

  if (isCorrect) {
    element.classList.add("correct");
    answeredCorrectly = true;
  } else {
    element.classList.add("wrong");
    // Show the correct answer
    allChoices[current.correct].classList.add("correct");
  }

  document.getElementById("nextBtn").style.display = "block";
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    loadQuestion();
  } else {
    showQuizComplete();
  }
}

function showQuizComplete() {
  const questionContainer = document.querySelector(".question-container");
  questionContainer.innerHTML = `
                <div class="quiz-complete">
                    <h2>Quiz Complete!</h2>
                    <p>You answered all 10 questions.</p>
                    <button class="next-btn" onclick="location.reload()">Restart Quiz</button>
                </div>
            `;
}

document.getElementById("nextBtn").addEventListener("click", nextQuestion);

// Load the first question
loadQuestion();
