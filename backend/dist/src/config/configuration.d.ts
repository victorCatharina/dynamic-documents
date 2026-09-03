export interface AppConfig {
    nodeEnv: string;
    port: number;
    databaseUrl: string;
    jwtSecret: string;
    jwtExpiresIn: string;
    storage: {
        driver: 'local' | 's3';
        localPath: string;
        endpoint?: string;
        region?: string;
        accessKey?: string;
        secretKey?: string;
        bucket?: string;
        forcePathStyle?: boolean;
    };
    maxFileSize: number;
    publicFormBaseUrl: string;
}
declare const _default: () => AppConfig;
export default _default;
