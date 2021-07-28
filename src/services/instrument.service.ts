import { InstrumentDto } from './rest-api/api';
import { restApi } from './rest-api.service';
class InstrumentService {

  async getAllInstruments() {
    const response = await restApi.getInstruments();
    if (response.status == 200) {
      return response.data;
    } else {
      return [];
    }
  }

  async getOneInstrument(id: string) {
    const response = await restApi.getInstrument(id);
    if (response.status == 200) {
      return response.data;
    } else {
      return [];
    }
  }

  async createInstrument(payload: InstrumentDto) {
    const response = await restApi.addInstrument(payload);
    if (response.status == 201) {
      return response.data;
    } else {
      return [];
    }
  }

  async editInstrument(id: string, payload: InstrumentDto) {
    console.log(id, payload);
    const response = await restApi.updateInstrument(id, payload);
    console.log(response);
    if (response.status == 200) {
      return response.data;
    } else {
      return [];
    }
  }

  async removeInstrument(id: string) {
    const response = await restApi.deleteInstrument(id);
    if (response.status == 200) {
      return response.data;
    } else {
      return [];
    }
  }
}

export const instrumentService = new InstrumentService();
