export interface CredentialInterfaces {
  credentialId: number;
  websiteName: string;
  websiteUrl: string;
  encryptedPassword: string;
  categoryId: number;
  notes: string;
  createdBy: number;
  createdAt: Date;
  updatedAt: Date;
  updatedBy?: number;
}

export interface category {
  categoryId: number;
  categoryName: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  updatedBy?: number;
}

export interface AssignedCredential {
  assignedCredentialId: string;
  credentialId: number;
  assignedTo: number;
  assignedBy: number;
  assignedAt?: Date;
  notes?: string;
  updatedBy?: number;
  updatedAt?: Date;
}
