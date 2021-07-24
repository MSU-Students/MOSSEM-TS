import { Injectable } from '@nestjs/common';
import { InstrumentDto } from '../dto/instrument.dto';
import { FirestoreService } from '../firestore/firestore.service';

@Injectable()
export class InstrumentService {
  constructor(private firestore: FirestoreService) {}
  async create(instrument: InstrumentDto): Promise<InstrumentDto> {
    const record = await this.firestore.instrument().add(instrument);
    return {
      ...instrument,
      id: record.id,
    };
  }
  async findAll(): Promise<InstrumentDto[]> {
    const list = await this.firestore.instrument().limit(20).get();
    return list.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })) as InstrumentDto[];
  }
  async findOne(id: string): Promise<InstrumentDto> {
    const record = await this.firestore.instrument().doc(id).get();
    if (record.exists) {
      return { ...record.data(), id: record.id } as InstrumentDto;
    }
    throw 'Record does not exist';
  }
  async deleteOne(id: string): Promise<InstrumentDto> {
    const doc = this.firestore.instrument().doc(id);

    const record = await doc.get();
    if (record.exists) {
      const data = record.data();
      await doc.delete();
      return { ...data, id: record.id } as InstrumentDto;
    }
    throw 'Record does not exist';
  }

  async update(id: string, instrument: InstrumentDto): Promise<InstrumentDto> {
    const doc = this.firestore.instrument().doc(id);
    
    const record = await doc.get();
    if (record.exists) {
      const data = record.data();
      await doc.set(instrument);
      return data as InstrumentDto;
    }
    throw 'Record does not exist';
  }
}
