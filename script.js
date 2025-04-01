// Function to check the URL and send a POST request to Flask backend
async function checkUrl() {
    const url = document.getElementById("url-input").value;
    const resultDiv = document.getElementById("result");

    if (!url) {
        resultDiv.textContent = "❌ Please enter a URL.";
        resultDiv.className = "danger";
        resultDiv.classList.remove("hidden");
        return;
    }

    try {
        // Make an asynchronous POST request to the Flask backend
        const response = await fetch('http://127.0.0.1:5000/check-url', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url: url })
        });

        const data = await response.json();

        if (response.ok) {
            resultDiv.textContent = `✅ ${data.message}`;
            resultDiv.className = data.status;
        } else {
            resultDiv.textContent = `⚠️ ${data.message}`;
            resultDiv.className = "danger";
        }
        
        resultDiv.classList.remove("hidden");
    } catch (error) {
        resultDiv.textContent = "🚨 Error connecting to the server.";
        resultDiv.className = "danger";
        resultDiv.classList.remove("hidden");
        console.error("Error details:", error);
    }
}
