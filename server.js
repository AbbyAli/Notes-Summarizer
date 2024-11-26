const express = require("express");
const axios = require("axios");
const path = require("path");
const app = express();
const PORT = 3000;

const OPENAI_API_KEY = "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"; // Securely store your API key here

app.use(express.json());
app.use(express.static(path.join(__dirname))); // Serve static files from the current directory

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html")); // Serve index.html
});

app.post("/summarize", async (req, res) => {
    try {
        const notes = req.body.notes;
        const response = await axios.post("https://api.openai.com/v1/chat/completions", {
            model: "gpt-4",
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                { role: "user", content: `Summarize the following text:\n\n${notes}` }
            ],
            max_tokens: 150,
            temperature: 0.7,
        }, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${OPENAI_API_KEY}`,
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error("Error:", error.response ? error.response.data : error.message);
        res.status(500).send("Server error: " + (error.response ? error.response.data : error.message));
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
