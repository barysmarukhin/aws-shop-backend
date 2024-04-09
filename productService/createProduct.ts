import { APIGatewayEvent, Handler } from 'aws-lambda';
import { Product as ProductService } from './services';
import { Product } from './models';
import logger from './logger';

export const handler: Handler = async (event: APIGatewayEvent) => {
    try {
        logger('createProduct', event);

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
        return {
            body: {
                error: e.name,
            },
            statusCode: e.statusCode,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
        };
    }
};
