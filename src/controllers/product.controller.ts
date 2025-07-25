import { Controller, Get, Headers, HttpCode, Inject, Query, UseInterceptors } from '@nestjs/common';
import { HttpServiceInterceptor } from '../middlewares/interceptor';
import { ZodValidationPipe } from '../utils';
import { GetProductQueryParamsSchema, TGetProductQueryParams, TGetProductsResponse } from 'cakes-lib-types-js';
import { IProductService } from '../service/product.service';

@UseInterceptors(HttpServiceInterceptor)
@Controller('/product')
export class ProductController {
  constructor(
    @Inject('IProductService')
    private readonly productService: IProductService,
  ) {}
  @Get()
  @HttpCode(200)
  async getProducts(
    @Query(new ZodValidationPipe(GetProductQueryParamsSchema))
    queryParams?: TGetProductQueryParams
  ): Promise<TGetProductsResponse> {
    return await this.productService.getProducts(queryParams)
  }
}
