import { Stock, StockRaw } from '../repository';

const createOne = async (stock: StockRaw) => Stock.createOne(stock);

export default {
    createOne,
};
