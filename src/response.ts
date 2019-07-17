export default {

    OK: (content: string, type: string = 'text/plain') => {
        const response = {
            statusCode: 200,
            headers: { 'Content-Type': type },
            body: content
        };
        console.debug(JSON.stringify(response));
        return response;
    },

    NoContent: () => {
        const response = {
            statusCode: 204,
            body: ''
        };
        console.debug(JSON.stringify(response));
        return response;
    },

    Redirect: (location: string) => {
        const response = {
            statusCode: 303,
            headers: { Location: location },
            body: ''
        };
        console.debug(JSON.stringify(response));
        return response;
    },

    BadRequest: (content: string, type: string = 'text/plain') => {
        const response = {
            statusCode: 400,
            headers: { 'Content-Type': type },
            body: content
        };
        console.debug(JSON.stringify(response));
        return response;
    },

    NotFound: (content: string = '', type: string = 'text/plain') => {
        const response = {
            statusCode: 404,
            headers: { 'Content-Type': type },
            body: content
        };
        console.debug(JSON.stringify(response));
        return response;
    },

    InternalServerError: (content: string = 'Uh oh! Something broke on our side.', type: string = 'text/plain') => {
        const response = {
            statusCode: 500,
            headers: { 'Content-Type': type },
            body: content
        };
        console.debug(JSON.stringify(response));
        return response;
    }

};
