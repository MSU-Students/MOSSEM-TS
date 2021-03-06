import { JwtRefreshTokenStrategy } from './jwt.refresh.token.strategy';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from './user.service';
import { AuthController } from './auth.controller';
import { JwtConfig } from './../config/jwt.config.type';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwTStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { FirestoreService } from '../firestore/firestore.service';
@Module({
  imports: [
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<JwtConfig>('refresh').secret,
        signOptions: {
          expiresIn: configService.get<JwtConfig>('refresh').expiresIn,
        },
      }),
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwTStrategy,
    UserService,
    JwtRefreshTokenStrategy,
    FirestoreService,
  ],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
