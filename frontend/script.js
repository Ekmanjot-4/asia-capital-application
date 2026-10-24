let currentCountry = "";
let score = 0;
let questionNumber = 0;

async function getQuestion() {
    const response = await fetch("http://localhost:3000/question");
    const data = await response.json();

    currentCountry = data.country;
    questionNumber++;

    document.getElementById("question").innerText =
        `Question ${questionNumber}/10: What is the capital of ${currentCountry}?`;

    document.getElementById("answer").value = "";
    document.getElementById("result").innerText = "";
}

async function submitAnswer() {
    const answer = document.getElementById("answer").value;

    const response = await fetch("http://localhost:3000/guess", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            country: currentCountry,
            answer: answer
        })
    });

    const data = await response.json();

    if (data.correct) {
        score++;
        document.getElementById("result").innerText = "Correct!";
    } else {
        document.getElementById("result").innerText = "Wrong!";
    }

    if (questionNumber < 10) {
        setTimeout(getQuestion, 800);
    } else {
        setTimeout(() => {
            document.getElementById("question").innerText =
                `Quiz finished! Your score: ${score}/10`;

            document.getElementById("answer").style.display = "none";
            document.querySelector("button").style.display = "none";
        }, 800);
    }
}

getQuestion();