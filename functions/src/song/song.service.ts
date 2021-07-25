import { Injectable } from '@nestjs/common';
import { SongDto } from '../dto/song.dto';
import { FirestoreService } from '../firestore/firestore.service';

@Injectable()
export class SongService {
  constructor(private firestore: FirestoreService) {}
  async create(song: SongDto): Promise<SongDto> {
    const record = await this.firestore.song().add(song);
    return {
      ...song,
      id: record.id,
    };
  }
  async findAll(): Promise<SongDto[]> {
    const list = await this.firestore.song().limit(20).get();
    return list.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })) as SongDto[];
  }
  async findOne(id: string): Promise<SongDto> {
    const record = await this.firestore.song().doc(id).get();
    if (record.exists) {
      return { ...record.data(), id: record.id } as SongDto;
    }
    throw 'Record does not exist';
  }
  async deleteOne(id: string): Promise<SongDto> {
    const doc = this.firestore.song().doc(id);

    const record = await doc.get();
    if (record.exists) {
      const data = record.data();
      await doc.delete();
      return { ...data, id: record.id } as SongDto;
    }
    throw 'Record does not exist';
  }

  async update(id: string, song: SongDto): Promise<SongDto> {
    const doc = this.firestore.song().doc(id);
    
    const record = await doc.get();
    if (record.exists) {
      const data = record.data();
      await doc.set(song);
      return data as SongDto;
    }
    throw 'Record does not exist';
  }
}
