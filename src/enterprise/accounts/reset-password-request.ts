export interface ResetPasswordRequest {
  passwordResetToken?: string;
  password: string;
  previousPassword?: string;
}
