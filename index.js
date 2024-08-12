import "dotenv";
import express from "express";
const app = express();

const PORT = process.env.PORT || 5050;

app.get("/", (req,res) => {
    res.send("Welcome to my API");
});

app.listen(PORT, ()=> {
    console.log(`runnning at http://localhost:${PORT}`);
});