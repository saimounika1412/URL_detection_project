

from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS

import re

app = Flask(__name__)
CORS(app)
# Example malicious URL blacklist
BLACKLIST = [
    "malicious.com",
    "phishing-site.org",
    "fakebank.net"
]

# Suspicious keywords
SUSPICIOUS_KEYWORDS = ["login", "bank", "free", "verify", "secure"]

# Function to extract the domain from a URL
def extract_domain(url):
    try:
        domain = re.search(r"https?://(www\.)?([^/]+)", url).group(2)
        return domain
    except AttributeError:
        return ""

# Check if the URL matches any blacklist domain
def is_blacklisted(url):
    domain = extract_domain(url)
    return domain in BLACKLIST

# Check if the URL contains suspicious keywords
def contains_suspicious_keywords(url):
    return any(keyword in url.lower() for keyword in SUSPICIOUS_KEYWORDS)
@app.route('/', methods=['GET'])
def home():
    return jsonify({"message": "Flask is running!"})

@app.route('/check-url', methods=['POST'])
def check_url():
    url = request.json.get('url', '')
    if not url:
        return jsonify({'message': 'Please provide a URL.'}), 400

    # Check for blacklisted domain
    if is_blacklisted(url):
        return jsonify({'message': 'This URL is blacklisted! It is likely malicious.', 'status': 'danger'})

    # Check for suspicious keywords
    if contains_suspicious_keywords(url):
        return jsonify({'message': 'This URL contains suspicious keywords! It may be malicious.', 'status': 'danger'})

    return jsonify({'message': 'This URL appears safe.', 'status': 'safe'})

if __name__ == '__main__':
    app.run(debug=True)
