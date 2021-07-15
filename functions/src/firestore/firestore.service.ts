import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import 'firebase/storage';
admin.initializeApp(functions.config().firebase);

@Injectable()
export class FirestoreService {
  db: FirebaseFirestore.Firestore;
  constructor() {
    this.db = admin.firestore();
  }
  dance() {
    return this.db.collection('dance');
  }
  users() {
    return this.db.collection('users');
  }
  instrument() {
    return this.db.collection('instrument');
  }
  song() {
    return this.db.collection('song');
  }
  picture() {
    return this.db.collection('picture');
  }
}
