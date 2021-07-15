import firebase from 'firebase/app';
import 'firebase/storage';
firebase.initializeApp({
  apiKey: 'AIzaSyBK5LyUt4u09Ml_wE7HghPAPE5mseMN5d4',
  authDomain: 'mossem-dfa21.firebaseapp.com',
  databaseURL:
    'https://mossem-dfa21-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'mossem-dfa21',
  storageBucket: 'mossem-dfa21.appspot.com',
  messagingSenderId: '227412098450',
  appId: '1:227412098450:web:2120dfc294fec025d7154b',
  measurementId: 'G-L3ZB76W88C'
});

const storage = firebase.storage();
if (location.hostname == 'localhost') {
  storage.useEmulator('localhost', 9205);
}

export { storage };
