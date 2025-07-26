import { IProduct, ISimplifiedProduct } from "cakes-lib-types-js";

export function mapperProducts(products: IProduct[]): ISimplifiedProduct[] {
  return products.map(({ id, name, description, price, imageUrl, category }) => ({
    id,
    name,
    description,
    price,
    imageUrl,
    category: category.name
  })) as ISimplifiedProduct[];
}