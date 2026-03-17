import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { AppService } from './app.service';
import { ClientDto } from './dto/client.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  @ApiTags('General')
  @ApiOperation({ summary: 'Hello endpoint' })
  @ApiResponse({ status: 200, description: 'Success' })
  getHello() {
    return this.appService.getHello();
  }

  @Get('clients')
  @ApiTags('Clients')
  @ApiOperation({ summary: 'Get all clients' })
  @ApiResponse({ status: 200, description: 'List of all clients', type: [ClientDto] })
  getAllClients() {
    return this.appService.getAllClients();
  }

  @Get('clients/:id')
  @ApiTags('Clients')
  @ApiOperation({ summary: 'Get a client by ID' })
  @ApiParam({ name: 'id', description: 'The datasite ID' })
  @ApiResponse({ status: 200, description: 'Client found', type: ClientDto })
  @ApiResponse({ status: 404, description: 'Client not found' })
  getClientById(@Param('id') id: string) {
    const client = this.appService.getClientById(id);
    if (!client) {
      throw new NotFoundException('Client not found');
    }
    return client;
  }
}
