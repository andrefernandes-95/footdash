// users/dto/create-user.dto.ts
import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from '../users/user.dto';

export class CreateTeamDto {
  @ApiProperty({ example: 'FC Porto' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'fc-porto', required: false })
  @IsOptional()
  slug?: string;
}

export class CreateTeamWithUserDto {
  @ApiProperty({ type: CreateUserDto })
  user: CreateUserDto;

  @ApiProperty({ type: CreateTeamDto })
  team: CreateTeamDto;
}
