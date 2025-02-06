// src/services/api.ts
import { Platform } from 'react-native';
import * as Types from '../types/api';

const API_URL = Platform.select({
  ios: 'https://slush-backend-production.up.railway.app/',
  android: 'https://slush-backend-production.up.railway.app/',
})!;

class ApiClient {
  private static instance: ApiClient;
  private accessToken: string | null = null;

  private constructor() {}

  static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }
    return ApiClient.instance;
  }

  setAccessToken(token: string) {
    this.accessToken = token;
  }

  getAccessToken(): string | null {
    return this.accessToken;
  }

  clearAccessToken() {
    this.accessToken = null;
  }

  private async fetch<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (this.accessToken) {
      headers['Authorization'] = `Bearer ${this.accessToken}`;
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        ...headers,
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.detail || 'An error occurred');
    }

    return response.json();
  }

  // Auth Endpoints
  async createUser(data: Types.CreateUserRequest): Promise<Types.UserResponse> {
    return this.fetch<Types.UserResponse>('/users/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async login(data: Types.LoginRequest): Promise<Types.LoginResponse> {
    const response = await this.fetch<Types.LoginResponse>('/users/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    this.setAccessToken(response.access_token);
    return response;
  }

  // Payment Session Endpoints
  async listPaymentSessions(): Promise<Types.PaymentSession[]> {
    return this.fetch<Types.PaymentSession[]>('/payments/sessions/');
  }

  async createPaymentSession(
    data: Types.CreatePaymentSessionRequest
  ): Promise<Types.PaymentSession> {
    return this.fetch<Types.PaymentSession>('/payments/sessions/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getPaymentSession(sessionId: string): Promise<Types.PaymentSession> {
    return this.fetch<Types.PaymentSession>(`/payments/sessions/${sessionId}`);
  }

  async getPaymentLink(sessionId: string): Promise<Types.PaymentLinkResponse> {
    return this.fetch<Types.PaymentLinkResponse>(
      `/payments/sessions/${sessionId}/link`
    );
  }

  async claimParticipant(
    sessionId: string,
    participantId: number,
    data: Types.ClaimParticipantRequest
  ): Promise<Types.Participant> {
    return this.fetch<Types.Participant>(
      `/payments/sessions/${sessionId}/participants/${participantId}/claim`,
      {
        method: 'POST',
        body: JSON.stringify(data),
      }
    );
  }

  async selectPaymentPlatform(
    sessionId: string,
    participantId: number,
    data: Types.SelectPlatformRequest
  ): Promise<Types.Participant> {
    return this.fetch<Types.Participant>(
      `/payments/sessions/${sessionId}/participants/${participantId}/platform`,
      {
        method: 'POST',
        body: JSON.stringify(data),
      }
    );
  }

  async getParticipantPaymentLink(
    sessionId: string,
    participantId: number
  ): Promise<string> {
    return this.fetch<string>(
      `/payments/sessions/${sessionId}/participants/${participantId}/payment-link`
    );
  }

  async getPublicSessionDetails(sessionId: string): Promise<Types.PaymentSession> {
    return this.fetch<Types.PaymentSession>(
      `/payments/sessions/${sessionId}/public`
    );
  }

  async getSessionStatus(sessionId: string): Promise<string> {
    return this.fetch<string>(`/payments/sessions/${sessionId}/status`);
  }

  async markPaymentComplete(
    sessionId: string,
    participantId: number
  ): Promise<string> {
    return this.fetch<string>(
      `/payments/sessions/${sessionId}/participants/${participantId}/complete`,
      {
        method: 'POST',
      }
    );
  }

  async getUnclaimedSpots(sessionId: string): Promise<string> {
    return this.fetch<string>(`/payments/sessions/${sessionId}/unclaimed`);
  }

  async validateClaim(
    sessionId: string,
    data: Types.ClaimParticipantRequest
  ): Promise<string> {
    return this.fetch<string>(`/payments/sessions/${sessionId}/validate-claim`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
}

export const api = ApiClient.getInstance();