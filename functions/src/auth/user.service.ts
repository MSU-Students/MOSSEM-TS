import { Injectable } from '@nestjs/common';
import { FirestoreService } from '../firestore/firestore.service';
import { IUser } from '../interfaces/user.interface';
@Injectable()
export class UserService {
    constructor(private firestore: FirestoreService) { }

    async getUserAccount(email: string): Promise<IUser> {
        const docs = await this.firestore.users()
            .where('email', '==', email.toLowerCase()).get();
        if (!docs.empty) {
            const record = docs.docs[0]; 
            return {...record.data(), id: record.id} as IUser;
        }
    }


    async createUserAccount(userAccount: IUser): Promise<IUser> {
        const record = await this.firestore.users().add(userAccount);
        return {
            ...userAccount,
            id: record.id,
            password: undefined
        };
    }

    async setCurrentRefreshToken(refreshToken: string, userId: string) {
        const doc = this.firestore.users().doc(userId);
        const record = await doc.get();
        if (record.exists) {
            const data = record.data() as IUser;
            data.refreshToken = refreshToken;
            await doc.set(data);
            return { ...data, id: record.id };
        }
        throw 'Record does not exist';
    }

}