export type ProductRaw = {
    id?: string;
    title: string;
    description: string;
    price: number;
}

export type StockRaw = {
    product_id: string;
    count: number;
}
