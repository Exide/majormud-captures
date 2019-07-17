import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import Response from './response';
import axios from 'axios';

export default async function handler(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    // todo: remove this once we've done the necessary input validation
    console.log(event);

    // todo: parse urlencoded data
    const recaptchaToken = '';
    const capture = '';

    // todo: parse multipart data if necessary

    // todo: get the base URL from the request
    const baseURL = 'https://captures.majormud.io';

    try {
        const isValid = await validateReCAPTCHAToken(recaptchaToken);
        if (!isValid) return Response.BadRequest('invalid reCAPTCHA token');

        const response = await axios.post(baseURL, capture);
        console.debug(`POST ${baseURL} ${response.status}`);
        if (response.status === 400) return Response.BadRequest(response.data);
        if (response.status === 500) return Response.InternalServerError();

        return Response.Redirect(`${baseURL}/${response.data}`);
    } catch (error) {
        console.error(error);
        return Response.InternalServerError();
    }
}

async function validateReCAPTCHAToken(token: string): Promise<boolean> {
    return true;
}
