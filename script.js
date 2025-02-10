// Function to check the URL and send a POST request to Flask backend
async function checkUrl() {
    const url = document.getElementById("url-input").value; // Get the URL from the input field
    const resultDiv = document.getElementById("result"); // Get the div to display the result

    if (!url) {
        resultDiv.textContent = "Please enter a URL.";
        return;
    }

    try {
        // Make an asynchronous POST request to the Flask backend
        const response = await fetch('http://127.0.0.1:5000/check-url', { // Replace this with your backend URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url: url }) // Send the URL in the body as JSON
        });

        const data = await response.json(); // Parse the JSON response

        if (response.ok) {
            resultDiv.textContent = data.message; // Display the message from the backend
            resultDiv.className = data.status; // Set the class based on the status ('safe', 'danger', etc.)
        } else {
            resultDiv.textContent = data.message;
            resultDiv.className = 'danger';
        }
    } catch (error) {
        resultDiv.textContent = "Error connecting to the server.";
        resultDiv.className = "danger";
        console.error("Error details:", error); // Log the error for debugging
    }
}
