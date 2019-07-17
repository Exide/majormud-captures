import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { S3 } from 'aws-sdk';
import shortid from 'shortid';
import config from '../config.json';
import Response from './response';

const s3 = new S3();

export default async function handler(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    if (!event.body) {
        return Response.BadRequest('No input provided');
    }

    const input = event.body;

    try {
        const html = parseInput(input);
        const id = shortid.generate();
        await saveObjectToS3(`${id}.original`, input, 'text/plain');
        await saveObjectToS3(`${id}.html`, html, 'text/html');
        return Response.OK(id);
    } catch (error) {
        console.error(error);
        return Response.InternalServerError();
    }
}

function parseInput(input: string): string {
    // todo: create html from the input
    return input;
}

async function saveObjectToS3(name: string, content: string, contentType: string): Promise<void> {
    const parameters = {
        Bucket: config.s3.bucket,
        Key: name,
        Body: content,
        ContentType: contentType
    };
    await s3.putObject(parameters).promise();
}

function buildResponse(statusCode: number, body: string) {
    return { statusCode, body, headers: { 'Content-Type': 'text/plain' } };
}
