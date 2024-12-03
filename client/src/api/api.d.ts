// src/api/api.d.ts
declare module '../api/api' {
    import { AxiosRequestConfig, AxiosResponse } from 'axios';
  
    export function get<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R>;
    export function put<T = any, R = AxiosResponse<T>>(url: string, data?: T, config?: AxiosRequestConfig): Promise<R>;
    // Add other function declarations as needed

    

        const api: any;
      
        
      
  
  }

  export default api;