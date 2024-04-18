import ProductsService from './services/Product';
import { APIGatewayEvent } from 'aws-lambda';
import logger from '../shared/logger';
import { ApiError } from '../shared/errors';

export const handler = async (event: APIGatewayEvent) => {
  try {
    logger('getProductsList', event);
    const products = await ProductsService.getAll();

    return {
      statusCode: 200,
      body: JSON.stringify(products),
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    };
  } catch (e) {
    const { statusCode, name: message } = e as ApiError;

    return {
      statusCode,
      message,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    };
  }
};
