import ProductsService from './service/ProductService';
import { APIGatewayEvent } from 'aws-lambda';

export const handler = async (event: APIGatewayEvent) => {
  try {
    const { productId } = event.pathParameters;
    const productFound = await ProductsService.getById(productId);

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
