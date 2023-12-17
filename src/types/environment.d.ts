declare global {
  namespace NodeJS {
    interface NodeEnv {
      REACT_APP_BASE_URL: string;
    }
  }
}
