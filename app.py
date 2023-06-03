from flask import Flask, render_template, request
import requests
import base64
import os

app = Flask(__name__)

# IBM Tone Analyzer Credentials
IBM_API_KEY = os.environ.get('IBM_API_KEY')
IBM_URL = os.environ.get('IBM_URL')

# Spotify API Credentials
SPOTIFY_CLIENT_ID = os.environ.get('SPOTIFY_CLIENT_ID')
SPOTIFY_CLIENT_SECRET = os.environ.get('SPOTIFY_CLIENT_SECRET')
SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token'
SPOTIFY_RECOMMENDATION_URL = 'https://api.spotify.com/v1/recommendations'

# Home Page
@app.route('/')
def home():
    return render_template('index.html')

# Song Recommendation
@app.route('/recommend', methods=['POST'])
def recommend():
    query = request.form['query']

    # Use IBM Tone Analyzer to analyze mood
    tone_payload = {
        'tone_input': {'text': query},
        'content_type': 'application/json'
    }
    tone_headers = {
        'Authorization': 'Bearer ' + IBM_API_KEY
    }
    tone_response = requests.post(IBM_URL, json=tone_payload, headers=tone_headers)
    tone_data = tone_response.json()

    if 'document_tone' in tone_data:
        tones = tone_data['document_tone']['tones']
        if tones:
            # Get the dominant emotion
            dominant_tone = max(tones, key=lambda x: x['score'])
            mood = dominant_tone['tone_id']
        else:
            mood = None
    else:
        mood = None

    if mood:
        # Use Spotify API to recommend songs based on mood
        auth_payload = {
            'grant_type': 'client_credentials'
        }
        auth_headers = {
            'Authorization': 'Basic ' + base64.b64encode(f'{SPOTIFY_CLIENT_ID}:{SPOTIFY_CLIENT_SECRET}'.encode()).decode(),
        }
        auth_response = requests.post(SPOTIFY_TOKEN_URL, data=auth_payload, headers=auth_headers)
        auth_data = auth_response.json()

        if 'access_token' in auth_data:
            access_token = auth_data['access_token']

            recommendation_payload = {
                'seed_genres': 'pop',
                'limit': 5
            }
            recommendation_headers = {
                'Authorization': 'Bearer ' + access_token
            }
            recommendation_response = requests.get(SPOTIFY_RECOMMENDATION_URL, params=recommendation_payload, headers=recommendation_headers)
            recommendation_data = recommendation_response.json()

            if 'tracks' in recommendation_data:
                songs = [track['name'] for track in recommendation_data['tracks']]
            else:
                songs = []
        else:
            songs = []
    else:
        songs = []

    return render_template('recommendation.html', songs=songs)

if __name__ == '__main__':
    app.run(debug=True)
