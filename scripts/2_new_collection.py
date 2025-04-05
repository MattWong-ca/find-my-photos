import boto3
import sys
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

def create_face_collection(collection_id):
    """
    Create a new face collection in AWS Rekognition
    """
    try:
        # Initialize the Rekognition client
        rekognition = boto3.client('rekognition')
        
        # Create the collection
        response = rekognition.create_collection(
            CollectionId=collection_id
        )
        
        # Print success message with collection details
        print(f"Successfully created collection: {collection_id}")
        print(f"Collection ARN: {response['CollectionArn']}")
        print(f"Status code: {response['StatusCode']}")
        
        return True
        
    except rekognition.exceptions.ResourceAlreadyExistsException:
        print(f"Collection {collection_id} already exists")
        return False
    except Exception as e:
        print(f"Error creating collection: {str(e)}")
        return False

if __name__ == "__main__":
    # Check if collection ID is provided as command line argument
    if len(sys.argv) != 2:
        print("Usage: python3 2_new_collection.py <collection_id>")
        print("Example: python3 2_new_collection.py bangkok-2024")
        sys.exit(1)
    
    collection_id = sys.argv[1]
    create_face_collection(collection_id)