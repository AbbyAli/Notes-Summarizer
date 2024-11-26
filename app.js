async function summarize() {
    const notes = document.getElementById("notes").value;
    const response = await fetch("/summarize", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ notes })
    });

    if (response.ok) {
        const data = await response.json();
        document.getElementById("summary").innerText = data.choices[0].message.content;
    } else {
        const errorText = await response.text();
        document.getElementById("summary").innerText = "Error: " + errorText;
    }
}
