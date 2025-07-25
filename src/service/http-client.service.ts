  import { Injectable, HttpException, Logger } from '@nestjs/common';
  import { HttpService } from '@nestjs/axios';
  import { firstValueFrom } from 'rxjs';
  import {
    AxiosError,
    AxiosRequestConfig,
    AxiosResponse,
    InternalAxiosRequestConfig,
  } from 'axios';

  export interface IHttpClientService {
    get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
  }

  @Injectable()
  export class HttpClientService implements IHttpClientService {
    private readonly logger = new Logger(HttpClientService.name);

    constructor(private httpService: HttpService) {
      this.httpService.axiosRef.interceptors.request.use(this.handleRequest);
      this.httpService.axiosRef.interceptors.response.use(
        this.handleResponse,
        this.handleErrorResponse,
      );
    }

    private handleRequest = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
      this.logger.debug(`[Request] ${config.method?.toUpperCase()} ${config.url}`);
      return config;
    };

    private handleResponse = (response: AxiosResponse): AxiosResponse => {
      this.logger.debug(`[Response] ${response.status} - ${response.config.url}`);
      return response;
    };

    private handleErrorResponse = (error: AxiosError<{ code: string; message: string }>): never => {
      const status = error?.response?.status || 500;
      const message = error?.response?.data?.message || error.message || 'Erro desconhecido';
      this.logger.error(`❌ Erro na requisição: ${status} - ${message}`);
      throw new HttpException(message, status);
    };

    async get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
      const response: AxiosResponse<T> = await firstValueFrom(this.httpService.get<T>(url, config));
      return response;
    }
  }
