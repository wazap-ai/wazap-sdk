export interface SendMessageDto {
  to: string;
  message: string;
  full_name?: string;
  email?: string;
  document?: string;
}

export interface SendMediaDto {
  to: string;
  mediaUrl: string;
  message?: string;
  fileName?: string;
  mimeType?: string;
  full_name?: string;
  email?: string;
  document?: string;
}

export interface SendBulkDto {
  contacts: Array<
    | string
    | {
        phone: string;
        full_name?: string;
        email?: string;
        document?: string;
        code?: string;
      }
  >;
  message: string;
  randomize?: boolean;
}

export interface MessageResponse {
  success: boolean;
  message: string;
  data: {
    uuid: string;
    messageId: string;
    to: string;
    status: string;
    timestamp: string;
    mediaInfo?: {
      fileName: string;
      mimeType: string;
    };
  };
}

export interface BulkResponse {
  success: boolean;
  message: string;
  data: {
    batchUuid: string;
    summary: {
      total: number;
      success: number;
      failed: number;
      invalid: number;
    };
    results: any[];
    errors?: any[];
  };
}
