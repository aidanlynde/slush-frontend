// src/types/api.ts
export interface LoginResponse {
    access_token: string;
    token_type: string;
  }
  
  export interface UserResponse {
    id: number;
    email: string;
    username: string;
    is_active: boolean;
    created_at: string;
  }
  
  export interface CreateUserRequest {
    email: string;
    username: string;
    password: string;
  }
  
  export interface LoginRequest {
    email: string;
    password: string;
  }
  
  export type PaymentPlatform = 'VENMO' | string;
  
  export interface Participant {
    id: number;
    temp_identifier: string;
    amount_owed: number;
    status: string;
    claimed_name?: string;
    claimed_at?: string;
    payment_platform?: PaymentPlatform;
    platform_username?: string;
    payment_timestamp?: string;
  }
  
  export interface PaymentSession {
    id: number;
    session_id: string;
    created_at: string;
    total_amount: number;
    currency: string;
    status: string;
    participants: Participant[];
  }
  
  export interface CreatePaymentSessionRequest {
    total_amount: number;
    currency: string;
    participants: {
      temp_identifier: string;
      amount_owed: number;
    }[];
  }
  
  export interface PaymentLinkResponse {
    payment_link: string;
    qr_code: string;
  }
  
  export interface ClaimParticipantRequest {
    claimed_name: string;
  }
  
  export interface SelectPlatformRequest {
    platform: PaymentPlatform;
    platform_username: string;
  }