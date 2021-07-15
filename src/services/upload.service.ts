import { storage } from 'app/firestore/storage.config';

class UploadService {
  async uploadFile(file: File, category: string): Promise<string> {
    const storageRef = storage.ref(`${category}/${file.name}`).put(file);
    return new Promise(resolve => {
      storageRef.on('state_changed', async () => {
        try {
          const url: string = await storageRef.snapshot.ref.getDownloadURL();
          resolve(url);
        } catch (error) {
          resolve(error);
        }
      });
    });
  }
}

const uploadService = new UploadService();
export default uploadService;
