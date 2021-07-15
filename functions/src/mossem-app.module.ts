import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DanceController } from './dance/dance.controller';
import { DanceService } from './dance/dance.service';
import { FirestoreService } from './firestore/firestore.service';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { InstrumentController } from './instrument/instrument.controller';
import { InstrumentService } from './instrument/instrument.service';
import { SongController } from './song/song.controller';
import { SongService } from './song/song.service';
import { PictureController } from './picture/picture.controller';
import { PictureService } from './picture/picture.service';

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
    InstrumentController,
    SongController,
    PictureController,
  ],
  providers: [
    AppService,
    DanceService,
    InstrumentService,
    FirestoreService,
    SongService,
    PictureService,
  ],
})
export class MossemAppModule {}
