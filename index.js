import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://www.dnd5eapi.co/api/2014/";

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
