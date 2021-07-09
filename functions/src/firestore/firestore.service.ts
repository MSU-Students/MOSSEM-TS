import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
admin.initializeApp(functions.config().firebase);

@Injectable()
export class FirestoreService {
  db: FirebaseFirestore.Firestore;
  constructor() {
    this.db = admin.firestore();
  }
  songs() {
    return this.db.collection('songs');
  }
  dances() {
    return this.db.collection('dance');
  }
  pictures() {
    return this.db.collection('picture');
  }
  instruments() {
    return this.db.collection('instruments');
  }
  users() {
    return this.db.collection('users');
  }
}
