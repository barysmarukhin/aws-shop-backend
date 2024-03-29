import { productsListMock } from './productsListMock';

export const getProductsList = async event => {
  return {
    statusCode: 200,
    body: JSON.stringify(productsListMock),
  };
};
