"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const Joi = require("joi");
const prisma_module_1 = require("./common/prisma/prisma.module");
const auth_module_1 = require("./modules/auth/auth.module");
const reports_module_1 = require("./modules/reports/reports.module");
const classification_module_1 = require("./modules/classification/classification.module");
const cases_module_1 = require("./modules/cases/cases.module");
const professionals_module_1 = require("./modules/professionals/professionals.module");
const analytics_module_1 = require("./modules/analytics/analytics.module");
const forum_module_1 = require("./modules/forum/forum.module");
const support_module_1 = require("./modules/support/support.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                validationSchema: Joi.object({
                    NODE_ENV: Joi.string().required(),
                    DATABASE_URL: Joi.string().required(),
                    PORT: Joi.number().default(3001),
                    JWT_SECRET: Joi.string().required(),
                    JWT_EXPIRATION: Joi.string().default('24h'),
                    FRONTEND_URL: Joi.string().default('http://localhost:3000'),
                }),
            }),
            jwt_1.JwtModule.registerAsync({
                global: true,
                useFactory: (configService) => ({
                    secret: configService.getOrThrow('JWT_SECRET'),
                    signOptions: {
                        expiresIn: (configService.get('JWT_EXPIRATION') ??
                            '24h'),
                    },
                }),
                inject: [config_1.ConfigService],
            }),
            prisma_module_1.PrismaModule,
            auth_module_1.AuthModule,
            reports_module_1.ReportsModule,
            classification_module_1.ClassificationModule,
            cases_module_1.CasesModule,
            professionals_module_1.ProfessionalsModule,
            analytics_module_1.AnalyticsModule,
            forum_module_1.ForumModule,
            support_module_1.SupportModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map