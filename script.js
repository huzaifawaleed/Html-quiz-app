
    const startButton = document.getElementById('start-btn');
    const nextButton = document.getElementById('next-btn');
    const questionContainerElement = document.getElementById('question-container');
    const questionElement = document.getElementById('question');
    const answerButtonsElement = document.getElementById('answer-buttons');
    const scoreDisplay = document.getElementById('right-answers');

    let shuffledQuestions, currentQuestionIndex;
    let quizScore = 0;

    startButton.addEventListener('click', startGame);
    nextButton.addEventListener('click', () => {
        currentQuestionIndex++;
        setNextQuestion();
    });

    function startGame() {
        startButton.classList.add('hide');
        shuffledQuestions = questions.sort(() => Math.random() - 0.5);
        currentQuestionIndex = 0;
        questionContainerElement.classList.remove('hide');
        quizScore = 0;
        scoreDisplay.innerText = quizScore;
        setNextQuestion();
    }

    function setNextQuestion() {
        resetState();
        showQuestion(shuffledQuestions[currentQuestionIndex]);
    }

    function showQuestion(question) {
        questionElement.innerText = question.question;
        question.answers.forEach(answer => {
            const button = document.createElement('button');
            button.innerText = answer.text;
            button.classList.add('btn');
            if (answer.correct) {
                button.dataset.correct = answer.correct;
            }
            button.addEventListener('click', selectAnswer);
            answerButtonsElement.appendChild(button);
        });
    }

    function resetState() {
        clearStatusClass(document.body);
        nextButton.classList.add('hide');
        while (answerButtonsElement.firstChild) {
            answerButtonsElement.removeChild(answerButtonsElement.firstChild);
        }
    }

    function selectAnswer(e) {
        const selectedButton = e.target;
        const correct = selectedButton.dataset.correct === 'true';

        setStatusClass(document.body, correct);
        Array.from(answerButtonsElement.children).forEach(button => {
            setStatusClass(button, button.dataset.correct === 'true');
        });

        if (correct) {
            quizScore++;
            scoreDisplay.innerText = quizScore;
        }

        if (shuffledQuestions.length > currentQuestionIndex + 1) {
            nextButton.classList.remove('hide');
        } else {
            startButton.innerText = 'Restart';
            startButton.classList.remove('hide');
        }
    }

    function setStatusClass(element, correct) {
        clearStatusClass(element);
        if (correct) {
            element.classList.add('correct');
        } else {
            element.classList.add('wrong');
        }
    }

    function clearStatusClass(element) {
        element.classList.remove('correct');
        element.classList.remove('wrong');
    }

    const questions = [
        {
            question: 'Which one of these is a Python framework?',
            answers: [
                { text: 'JavaScript', correct: false },
                { text: 'React', correct: false },
                { text: 'Django', correct: true },
                { text: 'Spring Boot', correct: false }
            ]
        },
        {
            question: 'JS stands for?',
            answers: [
                { text: 'JavaScript', correct: true },
                { text: 'JQuery', correct: false },
                { text: 'Typescript', correct: false },
                { text: 'Python', correct: false }
            ]
        },
        {
            question: 'HTML stands for?',
            answers: [
                { text: 'Hypertext Markup Language', correct: true },
                { text: 'Hyper Markup Language', correct: false },
                { text: 'Hypertext Metropolitan Language', correct: false },
                { text: 'Hypertext Preprocessor', correct: false }
            ]
        },
        {
            question: 'CSS stands for?',
            answers: [
                { text: 'Cascading Style Sheet', correct: true },
                { text: 'Hyper Markup Language', correct: false },
                { text: 'cascading simple sheets', correct: false },
                { text: 'Hypertext Preprocessor', correct: false }
            ]
        }
    ];
