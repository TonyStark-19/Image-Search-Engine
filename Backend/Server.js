// import necessary modules
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

// initialize exoress app and dotenv
dotenv.config();
const app = express();

// enable CORS
app.use(cors());

// search endpoint
app.get("/search", async (req, res) => {
    const query = req.query.query;
    const page = req.query.page || 1;

    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${query}&per_page=12`;

    const response = await fetch(url, {
        headers: {
            Authorization: `Client-ID ${process.env.UNSPLASH_KEY}`
        }
    });

    const data = await response.json();
    res.json(data);
});

// start server
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});