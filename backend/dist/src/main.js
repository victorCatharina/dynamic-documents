"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const http_exception_filter_1 = require("./common/filters/http-exception.filter");
const swagger_1 = require("@nestjs/swagger");
const config_1 = require("@nestjs/config");
async function bootstrap() {
    const logger = new common_1.Logger('Bootstrap');
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    const port = configService.get('port') || 3000;
    app.enableCors({
        origin: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
    }));
    app.useGlobalFilters(new http_exception_filter_1.GlobalExceptionFilter());
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Plataforma de Documentos Dinâmicos API')
        .setDescription('API REST para gerenciamento de templates dinâmicos, versionamento imutável, geração de PDFs e integrações.')
        .setVersion('1.0')
        .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Insira o token JWT de usuário administrativo',
        in: 'header',
    }, 'JWT')
        .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        name: 'API_KEY',
        description: 'Insira a API Key para autenticação de integrações externas',
        in: 'header',
    }, 'API_KEY')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, document);
    await app.listen(port);
    logger.log(`🚀 Dynamic Documents Backend running on: http://localhost:${port}`);
    logger.log(`📚 Swagger documentation available at: http://localhost:${port}/api/docs`);
}
bootstrap();
//# sourceMappingURL=main.js.map