import requests
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Get API key from environment variables
API_KEY = os.getenv('FLICKR_API_KEY')

def get_album_photos(api_key, user_id, photoset_id):
    """
    Fetch all photo IDs in an album (photoset).
    """
    url = "https://api.flickr.com/services/rest/"
    all_photos = []
    page = 1
    per_page = 500

    while True:
        params = {
            "method": "flickr.photosets.getPhotos",
            "api_key": api_key,
            "photoset_id": photoset_id,
            "user_id": user_id,
            "format": "json",
            "nojsoncallback": 1,
            "per_page": per_page,
            "page": page,
        }
        response = requests.get(url, params=params).json()
        if "photoset" not in response:
            print("Error fetching album:", response.get("message", "Unknown error"))
            break

        photos = response["photoset"]["photo"]
        all_photos.extend(photos)

        if page >= response["photoset"]["pages"]:
            break
        page += 1

    return all_photos

def get_high_res_photo_url(api_key, photo_id):
    """
    Retrieve the highest-resolution photo URL for a given photo ID.
    """
    url = "https://api.flickr.com/services/rest/"
    params = {
        "method": "flickr.photos.getSizes",
        "api_key": api_key,
        "photo_id": photo_id,
        "format": "json",
        "nojsoncallback": 1,
    }
    response = requests.get(url, params=params).json()
    sizes = response.get("sizes", {}).get("size", [])
    
    for size in sizes:
        if size["label"] == "Original":
            return size["source"]
    return sizes[-1]["source"] if sizes else None

def save_urls_to_file(urls, filename="photos_bangkok.txt"):
    """
    Save URLs to a file, one per line
    """
    with open(filename, 'w') as f:
        for url in urls:
            f.write(f"{url}\n")

if __name__ == "__main__":
    if not API_KEY:
        raise ValueError("FLICKR_API_KEY not found in environment variables")

    # Flickr API and album details
    USER_ID = "195507307@N03"
    BANGKOK_PHOTOSET_ID = "72177720322102882"

    # Step 1: Fetch all photos in the album
    print("Fetching photos from album...")
    album_photos = get_album_photos(API_KEY, USER_ID, BANGKOK_PHOTOSET_ID)
    print(f"Found {len(album_photos)} photos in the album.")

    # Step 2: Get high-res URLs for all photos
    print("Getting high-res URLs...")
    urls = []
    for i, photo in enumerate(album_photos, 1):
        print(f"Processing photo {i} of {len(album_photos)}")
        url = get_high_res_photo_url(API_KEY, photo["id"])
        if url:
            urls.append(url)

    # Step 3: Save URLs to file
    print(f"Saving {len(urls)} URLs to file...")
    save_urls_to_file(urls)
    print("Done! URLs have been saved to photos_bangkok.txt") 