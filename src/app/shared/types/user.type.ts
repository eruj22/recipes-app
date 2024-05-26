export type User = {
  $id?: string;
  $createdAt?: string;
  $updatedAt?: string;
  name: string;
  registration?: string;
  status?: boolean;
  passwordUpdate?: string;
  email: string;
  phone?: string;
  emailVerification?: boolean;
  phoneVerification?: boolean;
  mfa?: boolean;
  targets?: Target[];
  accessedAt?: string;
};

type Target = {
  $id?: string;
  $createdAt?: string;
  $updatedAt?: string;
  name?: string;
  userId?: string;
  providerType?: string;
  identifier?: string;
};
