// Fireworks Implementation
class Firework {
    constructor(x, y, targetY, color) {
        this.x = x;
        this.y = y;
        this.targetY = targetY;
        this.color = color;
        this.particles = [];
        this.exploded = false;
    }

    update() {
        const speed = 4;
        if (this.y > this.targetY) {
            this.y -= speed;
        } else if (!this.exploded) {
            this.explode();
            this.exploded = true;
        }

        this.particles.forEach(p => p.update());
        this.particles = this.particles.filter(p => !p.isDead());
    }

    explode() {
        const particleCount = 100;
        for (let i = 0; i < particleCount; i++) {
            this.particles.push(new Particle(this.x, this.y, this.color));
        }
    }

    draw(ctx) {
        if (!this.exploded) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }

        this.particles.forEach(p => p.draw(ctx));
    }
}

class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.size = 2;
        this.speedX = (Math.random() - 0.5) * 6;
        this.speedY = (Math.random() - 0.5) * 6;
        this.gravity = 0.05;
        this.color = color;
        this.alpha = 1;
        this.decay = Math.random() * 0.02 + 0.01;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.speedY += this.gravity;
        this.alpha -= this.decay;
    }

    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
    }

    isDead() {
        return this.alpha <= 0;
    }
}

const canvas = document.getElementById('fireworks-canvas');
const ctx = canvas.getContext('2d');
let fireworks = [];
let lastFireworkTime = 0;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function animateFireworks(timestamp) {
    requestAnimationFrame(animateFireworks);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    fireworks.forEach(fw => fw.update());
    fireworks.forEach(fw => fw.draw(ctx));
    fireworks = fireworks.filter(fw => fw.particles.length > 0 || !fw.exploded);

    // Launch fireworks periodically
    if (timestamp - lastFireworkTime > 500) {
        const x = Math.random() * canvas.width;
        const y = canvas.height;
        const targetY = Math.random() * canvas.height / 2;
        const colors = ['#ff0000', '#ffffff', '#0000ff'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        fireworks.push(new Firework(x, y, targetY, color));
        lastFireworkTime = timestamp;
    }
}

// Start animation but hide the canvas initially
canvas.style.display = 'none';
requestAnimationFrame(animateFireworks);

// Trivia Quiz Implementation
const questions = [
    {
        question: "When was the Declaration of Independence signed?",
        answers: [
            { text: "1776", correct: true },
            { text: "1812", correct: false },
            { text: "1607", correct: false },
            { text: "1492", correct: false }
        ]
    },
    {
        question: "Who was the first president of the United States?",
        answers: [
            { text: "Abraham Lincoln", correct: false },
            { text: "Thomas Jefferson", correct: false },
            { text: "George Washington", correct: true },
            { text: "John Adams", correct: false }
        ]
    },
    {
        question: "Which state is known as the 'Lone Star State'?",
        answers: [
            { text: "Texas", correct: true },
            { text: "California", correct: false },
            { text: "Florida", correct: false },
            { text: "New York", correct: false }
        ]
    },
    // 20 Additional Questions
    {
        question: "What year did the United States land the first man on the moon?",
        answers: [
            { text: "1969", correct: true },
            { text: "1959", correct: false },
            { text: "1979", correct: false },
            { text: "1989", correct: false }
        ]
    },
    {
        question: "Which amendment to the U.S. Constitution guarantees freedom of speech?",
        answers: [
            { text: "First Amendment", correct: true },
            { text: "Second Amendment", correct: false },
            { text: "Fourth Amendment", correct: false },
            { text: "Fifth Amendment", correct: false }
        ]
    },
    {
        question: "What is the capital of the United States?",
        answers: [
            { text: "New York City", correct: false },
            { text: "Washington D.C.", correct: true },
            { text: "Los Angeles", correct: false },
            { text: "Chicago", correct: false }
        ]
    },
    {
        question: "Which U.S. state was the last to join the Union?",
        answers: [
            { text: "Alaska", correct: true },
            { text: "Hawaii", correct: false },
            { text: "Arizona", correct: false },
            { text: "New Mexico", correct: false }
        ]
    },
    {
        question: "Who wrote the national anthem of the United States?",
        answers: [
            { text: "Francis Scott Key", correct: true },
            { text: "Abraham Lincoln", correct: false },
            { text: "George Washington", correct: false },
            { text: "Thomas Jefferson", correct: false }
        ]
    },
    {
        question: "What is the largest state in the United States by area?",
        answers: [
            { text: "Alaska", correct: true },
            { text: "Texas", correct: false },
            { text: "California", correct: false },
            { text: "Montana", correct: false }
        ]
    },
    {
        question: "Which war was fought between the North and South regions in the United States?",
        answers: [
            { text: "World War I", correct: false },
            { text: "World War II", correct: false },
            { text: "The Civil War", correct: true },
            { text: "The Revolutionary War", correct: false }
        ]
    },
    {
        question: "What document declared the American colonies free from British rule?",
        answers: [
            { text: "The Constitution", correct: false },
            { text: "The Bill of Rights", correct: false },
            { text: "The Declaration of Independence", correct: true },
            { text: "The Emancipation Proclamation", correct: false }
        ]
    },
    {
        question: "Who was the principal author of the Declaration of Independence?",
        answers: [
            { text: "George Washington", correct: false },
            { text: "Thomas Jefferson", correct: true },
            { text: "Benjamin Franklin", correct: false },
            { text: "John Adams", correct: false }
        ]
    },
    {
        question: "Which U.S. president issued the Emancipation Proclamation?",
        answers: [
            { text: "Abraham Lincoln", correct: true },
            { text: "Andrew Johnson", correct: false },
            { text: "Ulysses S. Grant", correct: false },
            { text: "Franklin D. Roosevelt", correct: false }
        ]
    },
    {
        question: "What is the national bird of the United States?",
        answers: [
            { text: "Bald Eagle", correct: true },
            { text: "American Robin", correct: false },
            { text: "Peregrine Falcon", correct: false },
            { text: "Red-tailed Hawk", correct: false }
        ]
    },
    {
        question: "Which U.S. state is known as the 'Sunshine State'?",
        answers: [
            { text: "California", correct: false },
            { text: "Florida", correct: true },
            { text: "Arizona", correct: false },
            { text: "Hawaii", correct: false }
        ]
    },
    {
        question: "Who was the 16th president of the United States?",
        answers: [
            { text: "Abraham Lincoln", correct: true },
            { text: "Andrew Jackson", correct: false },
            { text: "Ulysses S. Grant", correct: false },
            { text: "Theodore Roosevelt", correct: false }
        ]
    },
    {
        question: "What year did the U.S. Constitution come into effect?",
        answers: [
            { text: "1787", correct: true },
            { text: "1776", correct: false },
            { text: "1801", correct: false },
            { text: "1791", correct: false }
        ]
    },
    {
        question: "Which amendment abolished slavery in the United States?",
        answers: [
            { text: "13th Amendment", correct: true },
            { text: "14th Amendment", correct: false },
            { text: "15th Amendment", correct: false },
            { text: "19th Amendment", correct: false }
        ]
    },
    {
        question: "What is the longest river in the United States?",
        answers: [
            { text: "Mississippi River", correct: false },
            { text: "Missouri River", correct: false },
            { text: "Colorado River", correct: false },
            { text: "Mississippi-Missouri River System", correct: true }
        ]
    },
    {
        question: "Which U.S. holiday commemorates the Boston Tea Party?",
        answers: [
            { text: "Independence Day", correct: false },
            { text: "Memorial Day", correct: false },
            { text: "Thanksgiving", correct: false },
            { text: "Patriots' Day", correct: true }
        ]
    },
    {
        question: "Who was the U.S. president during World War II?",
        answers: [
            { text: "Franklin D. Roosevelt", correct: true },
            { text: "Harry S. Truman", correct: false },
            { text: "Dwight D. Eisenhower", correct: false },
            { text: "Herbert Hoover", correct: false }
        ]
    },
    {
        question: "What are the colors of the American flag?",
        answers: [
            { text: "Red, White, and Blue", correct: true },
            { text: "Green, White, and Red", correct: false },
            { text: "Blue, Yellow, and Red", correct: false },
            { text: "Black, White, and Green", correct: false }
        ]
    },
    {
        question: "Which city hosted the first modern Olympic Games in the United States?",
        answers: [
            { text: "Los Angeles", correct: true },
            { text: "New York City", correct: false },
            { text: "Chicago", correct: false },
            { text: "Atlanta", correct: false }
        ]
    },
    {
        question: "Which amendment grants women the right to vote in the United States?",
        answers: [
            { text: "19th Amendment", correct: true },
            { text: "18th Amendment", correct: false },
            { text: "21st Amendment", correct: false },
            { text: "16th Amendment", correct: false }
        ]
    },
    {
        question: "What is the largest national park in the United States?",
        answers: [
            { text: "Yellowstone National Park", correct: false },
            { text: "Yosemite National Park", correct: false },
            { text: "Wrangell–St. Elias National Park", correct: true },
            { text: "Grand Canyon National Park", correct: false }
        ]
    },

    {
        question: "What does the U.S. motto 'E pluribus unum' mean?",
        answers: [
          { text: "Out of many, one", correct: true },
          { text: "Liberty for all", correct: false },
          { text: "One nation under God", correct: false },
          { text: "United we stand", correct: false }
        ]
      },
      {
        question: "What is the smallest state?",
        answers: [
          { text: "Delaware", correct: false },
          { text: "Rhode Island", correct: true },
          { text: "Connecticut", correct: false },
          { text: "Vermont", correct: false }
        ]
      },
      {
        question: "What state have the most presidents come from?",
        answers: [
          { text: "New York", correct: false },
          { text: "Virginia", correct: true },
          { text: "Ohio", correct: false },
          { text: "Massachusetts", correct: false }
        ]
      },
      {
        question: "Which three states were named after real people?",
        answers: [
          { text: "Delaware, Louisiana and Georgia", correct: true },
          { text: "Texas, Georgia and Vermont", correct: false },
          { text: "California, Delaware and Georgia", correct: false },
          { text: "Louisiana, Alabama and Georgia", correct: false }
        ]
      },
      {
        question: "Can you name two states that have no counties?",
        answers: [
          { text: "Louisiana, Alaska", correct: true },
          { text: "Nevada, Hawaii", correct: false },
          { text: "Wyoming, Alaska", correct: false },
          { text: "Hawaii, Louisiana", correct: false }
        ]
      },
      {
        question: "Name two states that are touched by eight other states.",
        answers: [
          { text: "Tennessee and Missouri", correct: true },
          { text: "Kansas and Iowa", correct: false },
          { text: "Kentucky and Ohio", correct: false },
          { text: "Texas and Oklahoma", correct: false }
        ]
      },
      {
        question: "How many time zones does the U.S. have?",
        answers: [
          { text: "Four", correct: false },
          { text: "Five", correct: false },
          { text: "Six", correct: true },
          { text: "Seven", correct: false }
        ]
      },
      {
        question: "What is the lowest point in the U.S.?",
        answers: [
          { text: "Death Valley, California", correct: true },
          { text: "Great Salt Lake, Utah", correct: false },
          { text: "Badwater Basin, California", correct: false },
          { text: "Mojave Desert, Nevada", correct: false }
        ]
      },
      {
        question: "What is the highest point in the U.S.?",
        answers: [
          { text: "Mount Denali, Alaska", correct: false },
          { text: "Mount Elbert, Colorado", correct: false },
          { text: "Mount Rainier, Washington", correct: false },
          { text: "Mount McKinley, Alaska", correct: true }
        ]
      }

];

let shuffledQuestions = [];
let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById('question');
const answerButtonsContainer = document.getElementById('answer-buttons');
const resultContainer = document.getElementById('result-container');
const resultElement = document.getElementById('result');
const finalContainer = document.getElementById('final-container');
const finalScoreElement = document.getElementById('final-score');
const replayButton = document.getElementById('replay-btn');

// Utility function to shuffle an array
function shuffle(array) {
    for (let i = array.length -1; i >0; i--) {
        const j = Math.floor(Math.random() * (i +1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function startQuiz() {
    shuffledQuestions = shuffle([...questions]);
    shuffledQuestions.forEach(q => shuffle(q.answers));
    currentQuestionIndex = 0;
    score = 0;
    finalContainer.style.display = 'none';
    resultContainer.style.display = 'none';
    canvas.style.display = 'none';
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    resultContainer.style.display = 'none';
    questionElement.innerText = question.question;
    answerButtonsContainer.innerHTML = '';

    question.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        button.onclick = () => selectAnswer(button, answer.correct);
        answerButtonsContainer.appendChild(button);
    });
}

function selectAnswer(button, correct) {
    // Disable all buttons
    const allButtons = document.querySelectorAll('.btn');
    allButtons.forEach(btn => btn.disabled = true);

    if (correct) {
        button.classList.add('correct');
        score++;
        showResult(true);
        // Proceed to next question after 3 seconds
        setTimeout(() => {
            nextQuestion();
        }, 3000);
    } else {
        button.classList.add('wrong');
        showResult(false);
    }
}

function showResult(isCorrect) {
    resultContainer.style.display = 'block';
    resultElement.innerText = isCorrect ? "Correct! 🇺🇸" : "Incorrect! 🙁";
    if (!isCorrect) {
        // Show final score and replay button after incorrect answer
        setTimeout(() => {
            showFinalScore();
        }, 2000);
    }
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < shuffledQuestions.length) {
        showQuestion(shuffledQuestions[currentQuestionIndex]);
    } else {
        showFinalScore();
    }
}

function showFinalScore() {
    questionElement.innerText = `You scored ${score} out of ${shuffledQuestions.length}!`;
    finalScoreElement.innerText = `Final Score: ${score} / ${shuffledQuestions.length}`;
    answerButtonsContainer.innerHTML = '';
    resultContainer.style.display = 'none';
    finalContainer.style.display = 'block';

    // Show fireworks if max score
    if (score === shuffledQuestions.length) {
        canvas.style.display = 'block';
    }
}

function replayQuiz() {
    startQuiz();
}

// Initialize Quiz on page load
startQuiz();


