import { productsListMock } from './productsList.mock';

export const handler = async event => {
  const productId = event.pathParameters.productId;
  const product = productsListMock.find(p => p.id == productId);

  if (!product){
    return {
      statusCode: 404,
      body: JSON.stringify({ message: 'Product not found' }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(product),
  };
};