import { Injectable } from '@nestjs/common';
import { datasiteData } from './schema';

@Injectable()
export class AppService {
  getHello() {
    return { message: 'Hello! The Client API is running!' };
  }

  getAllClients() {
    return datasiteData;
  }

  getClientById(id: string) {
    return datasiteData.find((d) => d.id === id);
  }
}
