import products from '../products.mock';
import { NotFoundError } from '../errors';
import { Product } from '../models';

const getAll = async (): Promise<Product[]> => products;

const getById = async (productId: string): Promise<Product> => {
    const productFound = products.find(({ id }) => id === productId);

    if (!productFound) {
        throw new NotFoundError();
    }

    return productFound;
};

export default {
    getAll,
    getById
}
