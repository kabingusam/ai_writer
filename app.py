import os
import openai
from dotenv import load_dotenv
from flask import (
    Flask,
    flash, 
    render_template, 
    redirect,
    request,
    jsonify,
    url_for,
)

load_dotenv()
app = Flask(__name__)

# API key
openai.api_key = os.getenv('OPENAI_API_KEY')

# Generate text.

def generate_text(prompt):
    response = openai.Completion.create(engine="davinci", prompt=prompt, max_tokens=100, stop= ".")
    generated_text = response["choices"][0]["text"]
    return generated_text

@app.route("/", methods=["GET"])
def index():
    return render_template("index.html")

@app.route("/generate", methods=["POST"])
def generate_text_route():
    if request.method == "POST":
        input_text = request.form["input_text"]
        tone = request.form.get("tone")
        prompt = input_text
        if tone:
            prompt += " " + tone
        response = openai.Completion.create(
            model="text-davinci-003",
            prompt=prompt,
            temperature=0,
            max_tokens=100,
            top_p=1,
            frequency_penalty=0,
            presence_penalty=0
        )
        generated_text = response["choices"][0]["text"]
        return jsonify({"generated_text": generated_text, "selected_tone": tone})
    return jsonify({"error": "Invalid request"})

if __name__ == '__main__':
    app.run()
