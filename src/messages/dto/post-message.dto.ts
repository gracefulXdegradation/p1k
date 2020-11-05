import { IsString, IsNotEmpty } from 'class-validator';

export class PostMessageDto {
  @IsString()
  @IsNotEmpty()
  text: string;
}
