"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const logger = new common_1.Logger('Bootstrap');
    // Global validation pipe
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
            enableImplicitConversion: true,
        },
    }));
    // Enable CORS
    app.enableCors({
        origin: process.env.FRONTEND_URL || 'http://localhost:3000',
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    });
    // Set API prefix
    const apiVersion = process.env.API_VERSION || 'v1';
    app.setGlobalPrefix(`api/${apiVersion}`);
    // Swagger documentation
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Violence Reporting Platform API')
        .setDescription('API for Digital Reporting Platform for tracking violence, abuse, and bullying')
        .setVersion('1.0.0')
        .addBearerAuth()
        .addTag('reports', 'Incident reporting endpoints')
        .addTag('cases', 'Case management endpoints')
        .addTag('classification', 'ML classification endpoints')
        .addTag('professionals', 'Professional routing endpoints')
        .addTag('analytics', 'Analytics and reporting')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, document);
    const port = process.env.PORT || 3002;
    await app.listen(port);
    logger.log(`Application is running on: http://localhost:${port}`);
    logger.log(`API documentation available at: http://localhost:${port}/api/docs`);
}
bootstrap();
//# sourceMappingURL=main.js.map