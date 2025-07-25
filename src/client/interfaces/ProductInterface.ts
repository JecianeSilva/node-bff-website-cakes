import { TGetProductQueryParams, TGetProductsResponse } from "cakes-lib-types-js"

export interface IProductsClient {
  getProducts(queryParams: TGetProductQueryParams): Promise<TGetProductsResponse>
}