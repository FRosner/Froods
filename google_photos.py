from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from googleapiclient import discovery
import os
import pickle


# Scopes required to access the Google Photos Library API
SCOPES = ['https://www.googleapis.com/auth/photoslibrary.readonly']

CREDENTIALS_FILE = os.getenv("FROODS_CREDENTIALS_FILE", ".secrets/client_secret_1077594077914-gbrnhvk4lue6g9jqg342r930dhvvakvi.apps.googleusercontent.com.json")
TOKEN_PICKLE_FILE = os.getenv("FROODS_TOKEN_PICKLE_FILE", ".secrets/token.pickle")

def authenticate():
    creds = None
    # Load credentials from file if they exist
    if os.path.exists(TOKEN_PICKLE_FILE):
        with open(TOKEN_PICKLE_FILE, 'rb') as token:
            creds = pickle.load(token)

    # If there are no (valid) credentials available, prompt the user to log in
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(CREDENTIALS_FILE, SCOPES)
            creds = flow.run_local_server(port=8080)

        # Save the credentials for future use
        with open(TOKEN_PICKLE_FILE, 'wb') as token:
            pickle.dump(creds, token)

    return creds

def search_photos(service, search_term=None, start_date=None, end_date=None):
    """Search photos in Google Photos library based on search term or date range."""
    search_body = {
        "pageSize": 50,
        "filters": {}
    }

    # Add date filters if specified
    if start_date or end_date:
        date_filters = {}
        if start_date:
            date_filters['startDate'] = start_date
        if end_date:
            date_filters['endDate'] = end_date
        search_body["filters"] = {"dateFilter": {"ranges": [date_filters]}}

    # Add search term if specified
    if search_term:
        search_body["filters"]["contentFilter"] = {"includedContentCategories": [search_term]}

    # Execute the search
    results = service.mediaItems().search(body=search_body).execute()
    items = results.get('mediaItems', [])

    if not items:
        print('No media items found.')
    else:
        for item in items:
            print(f"Filename: {item['filename']}, URL: {item['baseUrl']}")

def main():
    creds = authenticate()
    photos_api = discovery.build("photoslibrary", "v1", credentials=creds, static_discovery=False)

    search_photos(photos_api, search_term='food', start_date={'year': 2024, 'month': 7, 'day': 1}, end_date={'year': 2024, 'month': 8, 'day': 10})


if __name__ == '__main__':
    main()
