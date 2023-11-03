fetch("/generate", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({ input_text: document.getElementById("input_text").value, tone: document.querySelector('input[name="tone"]:checked').value })
})
    .then(response => response.json())
    .then(data => {
        document.getElementById("generated-text").innerHTML = data.generated_text;
        document.getElementById("selected-tone-container").innerHTML = "Selected tone: " + data.selected_tone;
    })
    .catch(error => {
        console.error("Error fetching data:", error);
    });