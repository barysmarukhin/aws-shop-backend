import { productsListMock } from './productsList.mock';

export const handler = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify(productsListMock),
  };
};
