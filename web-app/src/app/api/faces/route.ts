import { NextResponse } from 'next/server';
import AWS from 'aws-sdk';

// Configure AWS
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_DEFAULT_REGION
});

const rekognition = new AWS.Rekognition();

export async function POST(request: Request) {
  try {
    const { action, collectionId, image, externalImageId } = await request.json();

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
        //   MaxFaces: 5,
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