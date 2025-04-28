import { NextResponse } from 'next/server';
import AWS from 'aws-sdk';

// Map events to their corresponding AWS regions
const EVENT_REGIONS: { [key: string]: string } = {
  'sf-2024': 'ap-northeast-1',
  'bangkok-2024': 'ap-northeast-1',
  'singapore-2024': 'ap-northeast-1',
  'brussels-2024': 'ap-northeast-1',
  'sydney-2024': 'ap-northeast-1',
  'taipei-2025': 'ap-southeast-1',
};

// Configure AWS with dynamic region
const getRekognitionClient = (collectionId: string) => {
  const region = EVENT_REGIONS[collectionId] || process.env.AWS_DEFAULT_REGION;
  
  return new AWS.Rekognition({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region
  });
};

export async function POST(request: Request) {
  try {
    const { action, collectionId, image, externalImageId } = await request.json();
    const rekognition = getRekognitionClient(collectionId);

    switch (action) {
      case 'add':
        const addResponse = await rekognition.indexFaces({
          CollectionId: collectionId,
          Image: { Bytes: Buffer.from(image, 'base64') },
          ExternalImageId: externalImageId
        }).promise();
        return NextResponse.json(addResponse);

      case 'search':
        const searchResponse = await rekognition.searchFacesByImage({
          CollectionId: collectionId,
          Image: { Bytes: Buffer.from(image, 'base64') },
          FaceMatchThreshold: 85
        }).promise();
        return NextResponse.json(searchResponse);

      case 'compare':
        const { sourceImage, targetImage } = await request.json();
        const compareResponse = await rekognition.compareFaces({
          SourceImage: { Bytes: Buffer.from(sourceImage, 'base64') },
          TargetImage: { Bytes: Buffer.from(targetImage, 'base64') },
          SimilarityThreshold: 80
        }).promise();
        return NextResponse.json(compareResponse);

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 