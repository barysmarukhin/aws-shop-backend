import { handler as getProductsList } from '../getProductsList';
import productsMock from '../products.mock';

describe('getProductsList', () => {
  test('getProductsList should return array of products', async () => {
    const response = await getProductsList();
    const products = JSON.parse(response.body);

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(products)).toBe(true);
    expect(products).toEqual(productsMock);
  });
});
