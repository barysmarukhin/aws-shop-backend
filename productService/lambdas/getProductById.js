import { productsListMock } from './productsListMock';

export const getProductById = async event => {
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
