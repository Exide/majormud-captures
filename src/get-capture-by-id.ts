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
        const html = await getObjectFromS3(`${id}.html`);
        // todo: detect when the id doesn't exist and return 404
        return Response.OK(html, 'text/html');
    } catch (error) {
        console.error(error);
        return Response.InternalServerError();
    }
}

async function getObjectFromS3(name: string): Promise<string> {
    const parameters = {
        Bucket: config.s3.bucket,
        Key: name
    };
    const { Body } = await s3.getObject(parameters).promise();
    if (!Body) throw new Error('No data returned');
    return Body.toString();
}
