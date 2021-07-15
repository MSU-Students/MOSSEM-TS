import { InstrumentDto, DefaultApi } from './rest-api/api';
import { Configuration } from './rest-api';
const localBasePath =
  'http://localhost:9201/mossem-dfa21/asia-northeast1/restapi';
class InstrumentService extends DefaultApi {
  constructor() {
    super(
      new Configuration({
        basePath: localBasePath
      })
    );
  }

  async getAllInstruments() {
    const response = await this.getInstruments();
    if (response.status == 200) {
      return response.data;
    } else {
      return [];
    }
  }

  async getOneInstrument(id: string) {
    const response = await this.getInstrument(id);
    if (response.status == 200) {
      return response.data;
    } else {
      return [];
    }
  }

  async createInstrument(payload: InstrumentDto) {
    const response = await this.addInstrument(payload);
    if (response.status == 200) {
      return response.data;
    } else {
      return [];
    }
  }

  async editInstrument(id: string, payload: InstrumentDto) {
    const response = await this.updateInstrument(id, payload);
    if (response.status == 200) {
      return response.data;
    } else {
      return [];
    }
  }

  async removeInstrument(id: string) {
    const response = await this.deleteInstrument(id);
    if (response.status == 200) {
      return response.data;
    } else {
      return [];
    }
  }
}

export const instrumentService = new InstrumentService();
