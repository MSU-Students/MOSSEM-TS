import { Injectable } from '@nestjs/common';
import { PictureDto } from '../dto/picture.dto';
import { FirestoreService } from '../firestore/firestore.service';

@Injectable()
export class PictureService {
  constructor(private firestore: FirestoreService) {}
  async create(picture: PictureDto): Promise<PictureDto> {
    const record = await this.firestore.pictures().add(picture);
    return {
      ...picture,
      id: record.id,
    };
  }
  async findOne(id: string): Promise<PictureDto> {
    const record = await this.firestore.pictures().doc(id).get();
    if (record.exists) {
      return { ...record.data(), id: record.id } as PictureDto;
    }
    throw 'Record does not exist';
  }
  async deleteOne(id: string): Promise<PictureDto> {
    const doc = this.firestore.pictures().doc(id);

    const record = await doc.get();
    if (record.exists) {
      const data = record.data();
      await doc.delete();
      return { ...data, id: record.id } as PictureDto;
    }
    throw 'Record does not exist';
  }

  async update(id: string, picture: PictureDto): Promise<PictureDto> {
    const doc = this.firestore.pictures().doc(id);

    const record = await doc.get();
    if (record.exists) {
      const data = record.data();
      await doc.set(picture);
      return data as PictureDto;
    }
    throw 'Record does not exist';
  }
}
