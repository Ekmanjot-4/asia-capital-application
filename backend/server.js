const express = require("express");
const countries = require("./data");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Welcome to the Guess the Asian Capital API!"
    });
});

app.get("/question", (req, res) => {
    try {
        const randomIndex = Math.floor(Math.random() * countries.length);
        const question = countries[randomIndex];

        res.status(200).json({
            country: question.country
        });
    } catch (error) {
        res.status(500).json({
            error: "Unable to generate a question"
        });
    }
});

app.post("/guess", (req, res) => {
    try {
        const { country, answer } = req.body;

        if (!country || !answer) {
            return res.status(400).json({
                error: "Country and answer are required"
            });
        }

        const question = countries.find(
            item => item.country.toLowerCase() === country.toLowerCase()
        );

        if (!question) {
            return res.status(404).json({
                error: "Country not found"
            });
        }

        const correct =
            question.capital.toLowerCase() === answer.toLowerCase();

        res.status(200).json({
            correct: correct
        });

    } catch (error) {
        res.status(500).json({
            error: "Something went wrong"
        });
    }
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});