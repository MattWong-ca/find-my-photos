import requests
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Get values from environment variables
api_key = os.getenv('FLICKR_API_KEY')
username = "ethglobal"
# user_id = "195507307@N03"

# API endpoint
url = "https://api.flickr.com/services/rest/"

# Parameters for the API call
params = {
    'method': 'flickr.people.findByUsername',
    'api_key': api_key,
    'username': username,
    'format': 'json',
    'nojsoncallback': 1
}

try:
    # Make the API request
    response = requests.get(url, params=params)
    response.raise_for_status()
    
    # Parse the response
    data = response.json()
    
    # Check if the request was successful
    if data['stat'] == 'ok':
        user_id = data['user']['id']
        username = data['user']['username']['_content']
        
        print(f"Username: {username}")
        print(f"User ID: {user_id}")
    else:
        print(f"Error: {data['message']}")
        
except requests.exceptions.RequestException as e:
    print(f"Error making request: {str(e)}")
except KeyError as e:
    print(f"Error parsing response: {str(e)}")
