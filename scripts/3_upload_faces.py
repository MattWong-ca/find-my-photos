import boto3
import sys
from dotenv import load_dotenv
import os
import requests
from urllib.parse import urlparse
from multiprocessing import Pool, cpu_count

# Load environment variables from .env file
load_dotenv()

def is_url(path):
    """Check if the path is a URL"""
    try:
        result = urlparse(path)
        return all([result.scheme, result.netloc])
    except:
        return False

def get_filename_from_url(url):
    """
    Extract just the filename from a Flickr URL
    Example: from 'https://live.staticflickr.com/65535/54157151546_0d52e9c47e_o.jpg'
    returns '54157151546_0d52e9c47e_o.jpg'
    """
    return url.split('/')[-1]

def get_image_bytes(image_path):
    """Get image bytes from either a local file or URL"""
    if is_url(image_path):
        # Download image from URL
        response = requests.get(image_path)
        response.raise_for_status()  # Raise an exception for bad status codes
        return response.content
    else:
        # Read local file
        with open(image_path, 'rb') as image:
            return image.read()

def process_single_face(args):
    """Process a single face for multiprocessing"""
    url, collection_id, row_num = args
    external_id = get_filename_from_url(url)
    
    try:
        # Initialize the Rekognition client
        rekognition = boto3.client(
            'rekognition',
            aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'),
            aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY'),
            region_name=os.getenv('AWS_DEFAULT_REGION')
        )
        
        # Get image bytes
        image_bytes = get_image_bytes(url)
        
        # Add face to collection
        response = rekognition.index_faces(
            CollectionId=collection_id,
            Image={'Bytes': image_bytes},
            ExternalImageId=external_id,
        )
        
        if not response['FaceRecords']:
            print(f"Row {row_num}: No faces detected")
            return False

        face_count = len(response['FaceRecords'])
        print(f"Row {row_num}: Added {face_count} faces from {external_id}")
        return True
        
    except Exception as e:
        print(f"Row {row_num}: Error processing {external_id}: {str(e)}")
        return False

def add_faces_from_file(collection_id, start_row=1, urls_file="photos_sf.txt"):
    """Read URLs from file and process in parallel"""
    try:
        # Read URLs from file
        with open(urls_file, 'r') as f:
            urls = f.readlines()
        
        # Clean URLs and start from specified row
        urls = [url.strip() for url in urls[start_row-1:]]
        
        print(f"Found {len(urls)} URLs to process, starting from row {start_row}")
        
        # Prepare arguments for multiprocessing
        args = [(url, collection_id, i) for i, url in enumerate(urls, start_row)]
        
        # Use multiprocessing to speed up processing
        num_processes = min(cpu_count(), 6)
        print(f"Processing with {num_processes} parallel processes")
        
        # Track progress and save last processed row
        success_count = 0
        with Pool(num_processes) as pool:
            for i, result in enumerate(pool.imap(process_single_face, args)):
                current_row = start_row + i
                if result:
                    success_count += 1
                    # Save progress after each successful processing
                    with open('last_processed_row.txt', 'w') as f:
                        f.write(str(current_row))
                
                # Show progress
                print(f"\rProgress: {i+1}/{len(urls)} images processed ({(i+1)/len(urls)*100:.1f}%)", end="")
        
        print(f"\n\nCompleted processing all images")
        print(f"Successfully processed {success_count} images out of {len(urls)}")
        print(f"Last processed row: {start_row + len(urls) - 1}")
        
    except FileNotFoundError:
        print(f"Error: Could not find file {urls_file}")
        return False
    except Exception as e:
        print(f"Error processing images: {str(e)}")
        return False

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python3 3_upload_faces.py <collection_id>")
        print("Example: python3 3_upload_faces.py bangkok-2024")
        sys.exit(1)
    
    collection_id = sys.argv[1]
    
    # Try to read the last processed row
    try:
        with open('last_processed_row.txt', 'r') as f:
            last_row = int(f.read().strip())
            start_row = last_row + 1
            print(f"Resuming from row {start_row}")
    except FileNotFoundError:
        start_row = 1
        print(f"Starting from row {start_row}")
    
    add_faces_from_file(collection_id, start_row=start_row) 