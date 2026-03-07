declare module 'custom-env' {
    /**
     * Load environment variables from `.env` files into process.env.
     *
     * @param envname Environment name (e.g. 'dev', 'test', 'production')
     * @param path Optional directory to look for .env files
     * @param defaultEnvFallback Whether to fall back to `.env` if specific env file is missing
     */
    export function env(
      envname?: string,
      path?: string,
      defaultEnvFallback?: boolean
    ): void;
  }