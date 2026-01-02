import express from "express";
import axios from "axios";
import bodyParser from "body-parser"
import fs from "fs";

const app = express();
const port = 3000;
const API_URL = "https://www.dnd5eapi.co/api/2014/";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/about", (req, res) => {
    res.render("about.ejs");
});

app.get("/spells", async (req, res) => {
    try {
        res.render("spells.ejs");
    } catch(e) {
        res.render("spells.ejs", { content: JSON.stringify(e.response.data) });
    }
});

app.post("/spells", async (req, res) => {
    var dir = "./public/images";
    var pic = "";
    var pics = [];
    if (fs.existsSync(dir)) {
        fs.readdir(dir, (err, filenames) => {
            if (err) {
                onerror(err);
                return;
            }
            var randPicNum = Math.floor(Math.random() * filenames.length);
            pic = "images/" + filenames[randPicNum];
            for (var i = 0; i < filenames.length; i++) {
                var file = "images/" + filenames[i];
                pics.push(file);
            }
        });
    } else {
        console.log("folder doesnt exist")
    }
    if (req.body.spellName) {
        const randSpellNum = Math.floor(Math.random() * (319 - 0));
        try {
            const result = await axios.get(API_URL + "spells");
            const spellResult = await axios.get(API_URL + "spells/" + result.data.results[randSpellNum].index);
            res.render("spells.ejs", { content: spellResult.data, pic: pic });
        } catch(e) {
            res.render("spells.ejs", { content: JSON.stringify(e.response.data) });
        }
    }
    if (req.body.allSpells) {
        try {
            const result = await axios.get(API_URL + "spells");
            res.render("spells.ejs", { content: result.data, pics: pics });
        } catch(e) {
            res.render("spells.ejs", { content: JSON.stringify(e.response.data) });
        }
    }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
