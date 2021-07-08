import { Injectable } from '@nestjs/common';
import { DanceDto } from '../dto/dance.dto';
import { FirestoreService } from '../firestore/firestore.service';

@Injectable()
export class DanceService {
  constructor(private firestore: FirestoreService) {}
  async create(dance: DanceDto): Promise<DanceDto> {
    const record = await this.firestore.dances().add(dance);
    return {
      ...dance,
      id: record.id,
    };
  }
  async findOne(id: string): Promise<DanceDto> {
    const record = await this.firestore.dances().doc(id).get();
    if (record.exists) {
      return { ...record.data(), id: record.id } as DanceDto;
    }
    throw 'Record does not exist';
  }
  async deleteOne(id: string): Promise<DanceDto> {
    const doc = this.firestore.dances().doc(id);

    const record = await doc.get();
    if (record.exists) {
      const data = record.data();
      await doc.delete();
      return { ...data, id: record.id } as DanceDto;
    }
    throw 'Record does not exist';
  }

  async update(id: string, dance: DanceDto): Promise<DanceDto> {
    const doc = this.firestore.dances().doc(id);

    const record = await doc.get();
    if (record.exists) {
      const data = record.data();
      await doc.set(dance);
      return data as DanceDto;
    }
    throw 'Record does not exist';
  }
}
