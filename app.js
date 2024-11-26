async function summarize() {
    const notes = document.getElementById("notes").value; // Get the text from textarea

    if (!notes.trim()) {
        document.getElementById("summary").textContent = "Please write some notes!";
        return;
    }

    const apiKey = "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"; // Replace with your OpenAI API key

    try {
        const response = await fetch("https://api.openai.com/v1/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`, // Authenticate with your API key
            },
            body: JSON.stringify({
                model: "gpt-4", // Model for summarization
                prompt: `Summarize the following text:\n\n${notes}`, // The input text
                max_tokens: 150, // Adjust token length for the summary
                temperature: 0.7, // Creativity level
            }),

        });
        console.log(apiKey)
        console.log(notes)
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json(); // Parse the API response
        document.getElementById("summary").textContent =
            data.choices[0].text.trim() || "No summary returned.";
    } catch (error) {
        console.error("Error:", error); // Log any errors
        document.getElementById("summary").textContent =
            `An error occurred: ${error.message}`;
    }
}
