// users/dto/create-user.dto.ts
import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTeamDto {
  @ApiProperty({ example: 'FC Porto' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'fc-porto', required: false })
  @IsNotEmpty()
  slug: string;


  @ApiProperty({ example: 'green', required: false })
  @IsOptional()
  color: string;
}
