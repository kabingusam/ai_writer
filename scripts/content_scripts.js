//content_script.js

// Import the axios library for making HTTP requests
import axios from 'axios';

// Listen for messages from the background script
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.message === "generate_summary") {

            // Get the text of the article
            var articleText = document.querySelector("article").textContent;

            // Make a POST request to the GPT-3 API
            axios.post('https://api.openai.com/v1/engines/davinci/completions', {
                prompt: articleText,
                max_tokens: 100
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer {OPENAI_API_KEY}'
                }
            })
                .then(function (response) {
                    var summary = response.data.choices[0].text;
                    // Display the summary in a new div
                    var summaryDiv = document.createElement("div");
                    summaryDiv.innerHTML = summary;
                    document.querySelector("body").appendChild(summaryDiv);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }
);
