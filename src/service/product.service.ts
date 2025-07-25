import { Inject, Injectable } from "@nestjs/common";
import { IProduct, TGetProductQueryParams, TGetProductsResponse } from "cakes-lib-types-js";
import { IProductsClient } from "../client/interfaces/ProductInterface";
import { mapperProducts } from "../utils";

export interface IProductService {
  getProducts(queryParams: TGetProductQueryParams): Promise<TGetProductsResponse>
}

@Injectable()
export class ProductService implements IProductService {
  constructor(
    @Inject('IProductsClient')
    private readonly productsClient: IProductsClient
  ) {}

  async getProducts(queryParams: TGetProductQueryParams): Promise<TGetProductsResponse> {
    const data = await this.productsClient.getProducts(queryParams)
    return mapperProducts(data as IProduct[])
  }
}