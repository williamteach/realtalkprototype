// RealTalk

const express = require("express");
const app = express();
const pool = require("./db");
const methodOverride = require('method-override');

app.use(express.urlencoded({ extended: true}));
app.use(express.json()); // => req.body
app.use(methodOverride('_method'));

app.set('view engine', 'ejs');

// ROUTES

// GET ALL EXPRESSIONS
app.get('/expressions', async (req, res) => {
    try {
        const allExpressions = await pool.query("SELECT * FROM expressions;");
// show all expresions
        res.render('index', { allExpressions }); 
} catch (err) {
        console.error(err.message);
}
});    

// DISPLAY CREATE EXPRESSION PAGE
app.get('/new', (req, res) => {
    res.render('new');
});

// CREATE THE EXPRESSION  
app.post("/expressions", async (req, res) => {
    try {
        const { description } = req.body;
        await pool.query("INSERT INTO expressions(description) VALUES ($1) RETURNING *", [description]);
        res.redirect('/expressions');
    } catch (err) {
        console.error(err.message);
    }
});

// DISPLAY SINGLE EXPRESSIONS PAGE
app.get('/show', (req, res) => {
    res.render('show');
});

// DISPLAY SINGLE EXPRESSION
app.get('/expressions/:id', async (req, res) => {
    const { id } = req.params;
    console.log(req.params);
    const expression = await pool.query("SELECT * FROM expressions WHERE expression_id = $1", [id]
    );
    console.log(expression);
    res.render('show', { expression });
});

// DELETE EXPRESSION
app.delete("/expressions/:id", async (req, res) => {
    try {
    const { id } = req.params;
    await pool.query("DELETE FROM expressions WHERE expression_id = $1", [id]
    );
        res.render('deleted');
    } catch (err) {
        console.error(err.message);
    }
   });
   


app.listen(3000, () => {
    console.log("server is listening on port 3000");
});

