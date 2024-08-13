import "dotenv";
import express from "express";
import recipeRoutes from "./routes/recipe-routes.js";
const app = express();

const PORT = process.env.PORT || 5050;

app.use("/api", recipeRoutes)

app.listen(PORT, ()=> {
    console.log(`runnning at http://localhost:${PORT}`);
});