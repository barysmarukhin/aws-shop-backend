import { handler as getProductById } from '../getProductById';
import { productsListMock } from '../productsList.mock';
import { APIGatewayProxyEvent } from 'aws-lambda';

describe('getProductById', () => {
  test('getProductById should return product data if product exists', async () => {
    const idForTargetProduct = productsListMock[3].id
    const response = await getProductById({ pathParameters: { productId: idForTargetProduct } } as unknown as APIGatewayProxyEvent);
    const product = JSON.parse(response.body);

    expect(response.statusCode).toBe(200);
    expect(typeof product).toBe('object');
    expect(product.id).toBe(idForTargetProduct);
  });

  test('getProductById should return 404 if product does not exist', async () => {
    const response = await getProductById({ pathParameters: { productId: 'nonexistent' } } as unknown as APIGatewayProxyEvent);

    expect(response.statusCode).toBe(404);
    expect(JSON.parse(response.body)).toEqual({ message: 'Product not found' });
  });
});