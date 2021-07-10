import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DanceController } from './dance/dance.controller';
import { DanceService } from './dance/dance.service';
import { FirestoreService } from './firestore/firestore.service';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: ['.env.dev.local', '.env.dev', '.env.prod']
    })
  ],
  controllers: [
    AppController,
    DanceController,
  ],
  providers: [
    AppService,
    DanceService,
    FirestoreService,
  ],
})
export class MossemAppModule {}
