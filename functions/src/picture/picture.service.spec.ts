import { Injectable } from '@nestjs/common';
import { DanceDto } from '../dto/dance.dto';
import { FirestoreService } from '../firestore/firestore.service';

@Injectable()
export class DanceService {
    constructor(private firestore: FirestoreService){}

    async create(vendor: DanceDto): Promise<DanceDto> {
        const record = await this.firestore.dances().add(vendor)
        return {
            ...vendor,
            id: record.id
        }
    }
    async update(id: string, vendor: DanceDto): Promise<DanceDto> {
        const doc = this.firestore.dances().doc(id);
        const record = await doc.get();
        if (record.exists) {
            await doc.update(vendor);
            return vendor as DanceDto;
        }
        throw "Record does not exist";
    }
    async findOne(id: string) : Promise<DanceDto> {
        const record = await this.firestore.dances().doc(id).get();
        if (record.exists) {
            return record.data() as DanceDto;
        }
        throw "Record does not exist";
    }
    async findAll(): Promise<DanceDto[]> {
        const list = await this.firestore.dances().limit(20).get();
        return list.docs.map(doc => ({...doc.data(), id: doc.id})) as DanceDto[];
    }
}
