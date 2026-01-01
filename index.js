import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://www.dnd5eapi.co/api/2014/";

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/about", (req, res) => {
    res.render("about.ejs");
});

app.get("/spells", async (req, res) => {
    try {
        const result = await axios.get(API_URL + "spells?level=1");
        console.log(JSON.stringify(result.data));
        res.render("spells.ejs");
    } catch(e) {
        res.render("spells.ejs", { content: JSON.stringify(e.response.data) });
    }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
