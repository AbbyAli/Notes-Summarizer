const express = require("express");
const fetch = require("node-fetch");
const app = express();
const PORT = 3000;

const OPENAI_API_KEY = "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"; // Securely store your API key here

app.use(express.json());

app.post("/summarize", async (req, res) => {
    try {
        const response = await fetch("https://api.openai.com/v1/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: "gpt-4",
                prompt: `Summarize the following text:\n\n${notes}`,
                max_tokens: 150,
                temperature: 0.7,
            }),
        });

        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).send("Server error: " + error.message);
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
