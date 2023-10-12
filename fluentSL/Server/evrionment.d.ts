declare global {
    namespace NodeJS {
      interface ProcessEnv {
        APP_SECRET: string;
        PORT?: string;
        APP_ACCESS_TOKEN_EXP_SECS: any;
        MONGO_URL:any
      }
    }
  }

  export {};
