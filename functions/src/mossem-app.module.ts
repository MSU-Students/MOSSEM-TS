import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongService } from './song/song.service';
import { InstrumentController } from './instrument/instrument.controller';
import { InstrumentService } from './instrument/instrument.service';
import { FirestoreService } from './firestore/firestore.service';
import { DanceService } from './dance/dance.service';
import { SongController } from './song/song.controller';
import { DanceController } from './dance/dance.controller';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { PictureController } from './picture/picture.controller';
import { PictureService } from './picture/picture.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: ['.env.dev.local', '.env.dev', '.env.prod']
    }),
    AuthModule
  ],
  controllers: [
    AppController,
    SongController,
    InstrumentController,
    DanceController,
    PictureController,
  ],
  providers: [
    AppService,
    SongService,
    InstrumentService,
    FirestoreService,
    DanceService,
    PictureService,
  ],
})
export class MossemAppModule {}
