import lambdaTester from 'lambda-tester';
import { handler } from '../getProductById';
import { handler as getAllProducts } from '../getProductsList';
import { APIGatewayEvent } from 'aws-lambda';
import { Response } from '../../types/api';

describe('getProductsById', () => {
    it('should return 404', async () => {
        try {
            return lambdaTester(handler)
                .event({ pathParameters: '' } as unknown as APIGatewayEvent)
                .expectResult(({ statusCode }: Response) => {
                    expect(statusCode).toEqual(404);
                });
        } catch (e) {
            console.error(e);
        }
    });

    it('should return item', async () => {
        try {
            const event = { body: {} } as APIGatewayEvent;

            const { body }: any = await getAllProducts(event);

            const data = JSON.parse(body);

            return lambdaTester(handler)
                .event({
                    pathParameters: {
                        productId: data[0].id,
                    },
                } as unknown as APIGatewayEvent)
                .expectResult(({ statusCode, body }: Response) => {
                    expect(statusCode).toEqual(200);
                    expect(body).toBeDefined();
                    expect(body.id === data[0].id);
                });
        } catch (e) {
            console.error(e);
        }
    });
});
