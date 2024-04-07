import { APIGatewayEvent, Handler } from 'aws-lambda';
import { Product as ProductService } from './services';
import { Product } from './models';

export const handler: Handler = async (event: APIGatewayEvent) => {
    try {
        const product: Product = JSON.parse(event.body);
        const productCreated = await ProductService.createOne(product);

        return {
            body: productCreated,
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
        };
    } catch (e) {
        console.log(e.message);
    }
};
