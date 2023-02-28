import { IsJWT, IsOptional } from 'class-validator';

export class RefreshTokenDto {
  @IsJWT()
  @IsOptional()
  refreshToken: string;
}
