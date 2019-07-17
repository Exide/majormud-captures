import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { S3 } from 'aws-sdk';
import config from '../config.json';
import Response from './response';

const s3 = new S3();

export default async function handler(event: APIGatewayEvent): Promise<APIGatewayProxyResult> {
    if (!event.pathParameters || !event.pathParameters.id) {
        return Response.BadRequest('No ID provided');
    }

    const id = event.pathParameters.id;

    try {
        await deleteObjectsFromS3(id);
        // todo: detect when the id doesn't exist and return 404
        return Response.NoContent()
    } catch (error) {
        console.error(error);
        return Response.InternalServerError();
    }
}

async function deleteObjectsFromS3(id: string): Promise<void> {
    const parameters = {
        Bucket: config.s3.bucket,
        Delete: {
            Objects: [
                { Key: `${id}.original` },
                { Key: `${id}.html` }
            ]
        }
    };
    await s3.deleteObjects(parameters).promise();
}
