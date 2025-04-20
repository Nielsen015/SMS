// types/clerk.d.ts
import '@clerk/nextjs/server';

declare module '@clerk/nextjs/server' {
  interface SessionClaims {
    publicMetadata?: {
      role?: string;
      // Add other custom metadata you use
    };
  }
}