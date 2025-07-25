import { IHttpClientService } from '../service/http-client.service';
import { Inject, Injectable } from "@nestjs/common";
import { queryString } from '../utils/queryString';
import { ICategoryClient } from './interfaces/categoryInterface';
import { TGetCategoriesQueryParam, TGetCategoriesResponse } from 'cakes-lib-types-js';

@Injectable()
export class CategoryClient implements ICategoryClient {
  constructor(
    @Inject('IHttpClientService')
    private readonly HttpClientService: IHttpClientService
  ) {}

  async getCategories(
    queryParams?: TGetCategoriesQueryParam
  ): Promise<TGetCategoriesResponse> {
    const { data } = await this.HttpClientService.get<TGetCategoriesResponse>(
      `${process.env.API_BASE_URL}/categories?${queryString.encode(queryParams)}`,
    )
    return data
  }
}