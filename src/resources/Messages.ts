import { AxiosInstance } from "axios";
import { z } from "zod";
import {
  SendMessageDto,
  SendMediaDto,
  SendBulkDto,
  MessageResponse,
  BulkResponse,
} from "../types";

// Schemas Zod para validação local (Espelham o backend)
const phoneSchema = z
  .string()
  .regex(
    /^[1-9]\d{1,14}$/,
    "Número de telefone inválido. Use apenas dígitos, ex: 5511999999999"
  );

const sendMessageSchema = z.object({
  to: phoneSchema,
  message: z.string().min(1, "Mensagem não pode estar vazia"),
  full_name: z.string().optional(),
  email: z.string().email("Email inválido").optional(),
  document: z.string().optional(),
});

const sendMediaSchema = z.object({
  to: phoneSchema,
  message: z.string().optional(),
  mediaUrl: z.string().url("URL da mídia inválida"),
  fileName: z.string().optional(),
  mimeType: z.string().optional(),
  full_name: z.string().optional(),
  email: z.string().email("Email inválido").optional(),
  document: z.string().optional(),
});

const contactItemSchema = z.union([
  z.string(), // Apenas o número
  z.object({
    phone: z.string(),
    full_name: z.string().optional(),
    email: z.string().email("Email inválido").optional(),
    document: z.string().optional(),
    code: z.string().optional(),
  }), // Objeto completo
]);

const sendBulkSchema = z.object({
  contacts: z
    .array(contactItemSchema)
    .min(1, "Lista de contatos vazia")
    .max(100, "Máximo de 100 contatos por requisição"),
  message: z.string().min(1, "Mensagem não pode estar vazia"),
  randomize: z.boolean().optional().default(true),
});

export class Messages {
  constructor(private client: AxiosInstance) {}

  /**
   * Envia uma mensagem de texto simples
   */
  async send(data: SendMessageDto): Promise<MessageResponse> {
    // Validação prévia no cliente
    const validated = sendMessageSchema.parse(data);

    const response = await this.client.post<MessageResponse>(
      "/messages/send",
      validated
    );
    return response.data;
  }

  /**
   * Envia uma mensagem com mídia (imagem, vídeo, documento, etc)
   */
  async sendMedia(data: SendMediaDto): Promise<MessageResponse> {
    const validated = sendMediaSchema.parse(data);

    const response = await this.client.post<MessageResponse>(
      "/messages/send-media",
      validated
    );
    return response.data;
  }

  /**
   * Envia mensagens em massa para múltiplos destinatários
   */
  async sendBulk(data: SendBulkDto): Promise<BulkResponse> {
    const validated = sendBulkSchema.parse(data);

    const response = await this.client.post<BulkResponse>(
      "/messages/send-bulk",
      validated
    );
    return response.data;
  }
}
