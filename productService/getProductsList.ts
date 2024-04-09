import ProductsService from './services/Product';
import { APIGatewayEvent } from 'aws-lambda';
import logger from './logger';

export const handler = async (event: APIGatewayEvent) => {
  try {
    logger('getProductsList', event);
    const products =  await ProductsService.getAll();

    return {
      statusCode: 200,
      body: JSON.stringify(products),
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    };
  } catch (e) {
    console.log(e);
    return {
      statusCode: e.statusCode,
      message: e.name,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    };
  }
};
