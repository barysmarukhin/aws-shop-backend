import { productsListMock } from './productsList.mock';

export const handler = async event => {
  return {
    statusCode: 200,
    body: JSON.stringify(productsListMock),
  };
};
