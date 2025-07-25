import { Controller, Get, HttpCode, Inject, Param, Query, UseInterceptors } from '@nestjs/common';
import { HttpServiceInterceptor } from '../middlewares/interceptor';
import { ZodValidationPipe } from '../utils';
import { ICategoryService } from '../service/category.service';
import { GetCategoriesQueryParamSchema, ICategory, TGetCategoriesQueryParam, TGetCategoriesResponse } from 'cakes-lib-types-js';

@UseInterceptors(HttpServiceInterceptor)
@Controller('/category')
export class CategoryController {
  constructor(
    @Inject('ICategoryService')
    private readonly categoryService: ICategoryService,
  ) {}
  @Get()
  @HttpCode(200)
  async getCategories(
    @Query(new ZodValidationPipe(GetCategoriesQueryParamSchema))
    queryParams: TGetCategoriesQueryParam
  ): Promise<TGetCategoriesResponse> {
    return await this.categoryService.getCategories(queryParams)
  }
}
