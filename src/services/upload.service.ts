import { storage } from 'app/firestore/storage.config';

class UploadService {
  async uploadFile(file: File, category: string, cb?:(percent: number)=> void): Promise<{
    url: string, pause: ()=> void, resume: ()=> void
  }> {
    const storageRef = storage.ref(`${category}/${file.name}`).put(file);
    return new Promise((resolve, reject) => {
      storageRef.on('state_changed',(value) => {
        //next
        const percentage =  100.0 * value.bytesTransferred / value.totalBytes;
        cb?.call(this, Math.round(percentage));
        if (percentage > 0) {
          storageRef.snapshot.ref.getDownloadURL().then((url:string) => {
            resolve({
              url: url,
              pause: () => {
                return storageRef.pause();
              },
              resume: () => {
                return storageRef.resume();
              }
            });
          }).catch(reject);
        }
      }, (error) => {
        reject(error);
      }, () => {
        //complete
        cb?.call(this, 100);
      });
    });
  }
}

const uploadService = new UploadService();
export default uploadService;
