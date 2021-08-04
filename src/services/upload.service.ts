import { storage } from 'app/firestore/storage.config';

class UploadService {
  async uploadFile(file: File, category: string, cb?:(percent: number)=> void): Promise<any> {
    const storageRef = storage.ref(`${category}/${file.name}`).put(file);
    return new Promise((resolve, reject) => {
      storageRef.on('state_changed',(value) => {
        //next
        const percentage =  100.0 * value.bytesTransferred / value.totalBytes;
        cb?.call(this, percentage);
      }, (error) => {
        reject(error);
      }, () => {
        //complete
        storageRef.snapshot.ref.getDownloadURL().then(resolve).catch(reject);
      });
    });
  }
}

const uploadService = new UploadService();
export default uploadService;
