const express=require("express");
const countries=require("./data");
const cors=require("cors");
const app=express();
app.use(cors());
app.use(express.json());
app.listen(3000,()=>{
    console.log("Server running on port 3000");
});
app.get("/question",(req,res)=>{
    const randomIndex=Math.floor(Math.random()*countries.length);
    const question=countries[randomIndex];
    res.json({
        country:question.country
    });
})
app.post("/guess",(req,res)=>{
    const {country,answer}=req.body;
    const question = countries.find(item => item.country === country);
     if (question.capital.toLowerCase() === answer.toLowerCase()) {
        res.json({ correct: true });
    } else {
        res.json({ correct: false });
    }
});
app.get("/",(req,res)=>{
    res.send("Welcome to the guess the asian capital!");
});