declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string;
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    AUTH_SECRET: string;
    AMAZON_S3_ACCESS_KEY: string;
    AMAZON_S3_SECRET_KEY: string;
    AMAZON_S3_REGION: string;
    AMAZON_S3_BUCKET_NAME: string;
  }
}
