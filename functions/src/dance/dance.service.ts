import { Injectable } from '@nestjs/common';
import { DanceDto } from '../dto/dance.dto';
import { FirestoreService } from '../firestore/firestore.service';
import firebase from 'firebase';

@Injectable()
export class DanceService {
  constructor(private firestore: FirestoreService) {}
  async create(dance: DanceDto): Promise<DanceDto> {
    const record = await this.firestore.dance().add(dance);
    return {
      ...dance,
      id: record.id,
    };
  }
  async findAll(): Promise<DanceDto[]> {
    const list = await this.firestore.dance().limit(20).get();
    return list.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })) as DanceDto[];
  }
  async findOne(id: string): Promise<DanceDto> {
    const record = await this.firestore.dance().doc(id).get();
    if (record.exists) {
      return { ...record.data(), id: record.id } as DanceDto;
    }
    throw 'Record does not exist';
  }
  async deleteOne(id: string): Promise<DanceDto> {
    const doc = this.firestore.dance().doc(id);

    const record = await doc.get();
    if (record.exists) {
      const data = record.data();
      await doc.delete();
      return { ...data, id: record.id } as DanceDto;
    }
    throw 'Record does not exist';
  }

  async update(id: string, dance: DanceDto): Promise<DanceDto> {
    const doc = this.firestore.dance().doc(id);

    const record = await doc.get();
    console.log(record);
    if (record.exists) {
      const data = record.data();
      await doc.set(dance);
      return data as DanceDto;
    }
    throw 'Record does not exist';
  }
}
