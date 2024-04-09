import { Product } from './services';
import { APIGatewayEvent } from 'aws-lambda';
import logger from './logger';
import { ApiError } from './errors';

export const handler = async (event: APIGatewayEvent) => {
  try {
    logger('getProductsById', event);

    const { productId } = event.pathParameters as { productId: string };
    const productFound = await Product.getById(productId);

    return {
      statusCode: 200,
      body: JSON.stringify(productFound),
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    };
  } catch (e) {
    const { statusCode, name: message } = e as ApiError ;

    return {
      statusCode,
      message,
      body: 'Product not found',
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    };
  }
};
