import { ApiProperty } from '@nestjs/swagger';

export class ClientDto {
  @ApiProperty({ example: '1' })
  id!: string;

  @ApiProperty({ example: 'Alpha Datasite' })
  name!: string;

  @ApiProperty({ example: 'Primary data repository' })
  description!: string;

  @ApiProperty({ example: '2026-01-15T10:00:00Z' })
  createdAt!: string;
}
