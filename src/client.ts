import axios, { AxiosInstance, AxiosError } from "axios";
import { Messages } from "./resources/Messages";

export interface WazapOptions {
  companyToken: string;
  accountToken: string;
  baseUrl?: string;
  timeout?: number;
}

export class Wazap {
  private client: AxiosInstance;
  public messages: Messages;

  constructor(options: WazapOptions) {
    this.client = axios.create({
      baseURL: options.baseUrl || "https://api.wazap.ai/external/v1",
      timeout: options.timeout || 10000,
      headers: {
        "X-Company-Token": options.companyToken,
        "X-Account-Token": options.accountToken,
        "Content-Type": "application/json",
      },
    });

    // Interceptor de erros para simplificar o tratamento
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response) {
          // Erro da API (4xx, 5xx)
          throw new Error(
            `Wazap API Error: ${
              (error.response.data as any)?.message || error.message
            }`
          );
        }
        throw error;
      }
    );

    this.messages = new Messages(this.client);
  }
}

export default Wazap;
