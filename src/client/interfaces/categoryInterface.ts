import { ICategory, TGetCategoriesQueryParam, TGetCategoriesResponse, IPostSaveCategoryResponse, TPutCategoryStatusRequestBody, TPostSaveCategoryRequestBody, TPutCategoryParam, TDeleteCategoryParam, TPutCategoryRequestBody } from "cakes-lib-types-js"

export interface ICategoryClient {
  getCategories(queryParams?: TGetCategoriesQueryParam): Promise<TGetCategoriesResponse>
}