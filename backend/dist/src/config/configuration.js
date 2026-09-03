"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
    nodeEnv: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT || '3000', 10),
    databaseUrl: process.env.DATABASE_URL ||
        (process.env.USE_TEST_DB === 'true' || process.env.DATABASE_PROVIDER === 'sqlite'
            ? 'file:./prisma/tmp/test.db'
            : 'sqlserver://localhost:1433;database=sandbox;user=victor;password=mVc3@281210;trustServerCertificate=true'),
    jwtSecret: process.env.JWT_SECRET || 'dynamic-documents-secret-key-change-in-production-min-32-chars',
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d',
    storage: {
        driver: process.env.STORAGE_DRIVER || 'local',
        localPath: process.env.STORAGE_LOCAL_PATH || './uploads',
        endpoint: process.env.STORAGE_ENDPOINT || 'http://localhost:9000',
        region: process.env.STORAGE_REGION || 'us-east-1',
        accessKey: process.env.STORAGE_ACCESS_KEY || 'minioadmin',
        secretKey: process.env.STORAGE_SECRET_KEY || 'minioadmin',
        bucket: process.env.STORAGE_BUCKET || 'documents',
        forcePathStyle: process.env.STORAGE_FORCE_PATH_STYLE === 'true',
    },
    maxFileSize: parseInt(process.env.MAX_FILE_SIZE || '10485760', 10),
    publicFormBaseUrl: process.env.PUBLIC_FORM_BASE_URL || 'http://localhost:5173/f',
});
//# sourceMappingURL=configuration.js.map