import { Inject, Injectable } from "@nestjs/common";
import { ICategoryClient } from "../client/interfaces/categoryInterface";
import { TGetCategoriesQueryParam, TGetCategoriesResponse } from "cakes-lib-types-js";

export interface ICategoryService {
  getCategories(queryParams: TGetCategoriesQueryParam): Promise<TGetCategoriesResponse>
}

@Injectable()
export class CategoryService implements ICategoryService {
  constructor(
    @Inject('ICategoryClient')
    private readonly categoryClient: ICategoryClient
  ) {}

  async getCategories(queryParams: TGetCategoriesQueryParam): Promise<TGetCategoriesResponse> {
    return await this.categoryClient.getCategories(queryParams)
  }
}