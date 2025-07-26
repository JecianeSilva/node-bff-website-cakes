import { TGetCategoriesQueryParam, TGetCategoriesResponse } from "cakes-lib-types-js"

export interface ICategoryClient {
  getCategories(queryParams?: TGetCategoriesQueryParam): Promise<TGetCategoriesResponse>
}