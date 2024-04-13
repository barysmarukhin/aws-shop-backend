import { APIGatewayEvent, Handler } from 'aws-lambda';
import logger from '../shared/logger';

export const handler: Handler = async (event: APIGatewayEvent) => {
  try {
    logger('importFileParser', event);

    return {
      body: 'OK',
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    };
  } catch (e) {
    return {
      body: JSON.stringify({
        error: e.name,
      }),
      statusCode: e.statusCode,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    };
  }
};
