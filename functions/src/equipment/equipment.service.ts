import { Injectable } from '@nestjs/common';
import { EquipmentDto } from '../dto/equipment.dto';
import { FirestoreService } from '../firestore/firestore.service';

@Injectable()
export class EquipmentService {
  constructor(private firestore: FirestoreService) {}
  async create(equipment: EquipmentDto): Promise<EquipmentDto> {
    const record = await this.firestore.equipment().add(equipment);
    return {
      ...equipment,
      id: record.id,
    };
  }
  async findAll(): Promise<EquipmentDto[]> {
    const list = await this.firestore.equipment().limit(20).get();
    return list.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })) as EquipmentDto[];
  }
  async findOne(id: string): Promise<EquipmentDto> {
    const record = await this.firestore.equipment().doc(id).get();
    if (record.exists) {
      return { ...record.data(), id: record.id } as EquipmentDto;
    }
    throw 'Record does not exist';
  }
  async deleteOne(id: string): Promise<EquipmentDto> {
    const doc = this.firestore.equipment().doc(id);

    const record = await doc.get();
    if (record.exists) {
      const data = record.data();
      await doc.delete();
      return { ...data, id: record.id } as EquipmentDto;
    }
    throw 'Record does not exist';
  }

  async update(id: string, equipment: EquipmentDto): Promise<EquipmentDto> {
    const doc = this.firestore.equipment().doc(id);

    const record = await doc.get();
    if (record.exists) {
      const data = record.data();
      await doc.set(equipment);
      return data as EquipmentDto;
    }
    throw 'Record does not exist';
  }
}
