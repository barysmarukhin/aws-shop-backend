import { Product } from './services';
import { APIGatewayEvent } from 'aws-lambda';
import logger from './logger';

export const handler = async (event: APIGatewayEvent) => {
  try {
    logger('getProductsById', event);

    const { productId } = event.pathParameters;
    const productFound = await Product.getById(productId);

    return {
      statusCode: 200,
      body: JSON.stringify(productFound),
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    };
  } catch (e) {
    return {
      statusCode: e.statusCode,
      message: e.name,
      body: 'Product not found',
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    };
  }
};
