import { Transform } from 'class-transformer';
import {
  IsIn,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export const AUM_OPTIONS = [
  'Under ₹25 crore',
  '₹25–100 crore',
  'Over ₹100 crore',
] as const;

export const LANGUAGE_OPTIONS = [
  'Tamil',
  'Kannada',
  'Telugu',
  'Hindi',
  'English',
  'A mix',
] as const;

function emptyToUndefined(value: unknown): unknown {
  if (typeof value !== 'string') return value;
  const trimmed = value.trim();
  return trimmed === '' ? undefined : trimmed;
}

export class CreatePilotRequestDto {
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @MinLength(2)
  @MaxLength(80)
  name!: string;

  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  @IsString()
  @Matches(/^\+?[0-9][0-9\s-]{7,18}$/, {
    message: 'Enter a WhatsApp number we can reach',
  })
  phone!: string;

  @Transform(({ value }) => emptyToUndefined(value))
  @IsOptional()
  @IsString()
  @MaxLength(80)
  city?: string;

  @Transform(({ value }) => emptyToUndefined(value))
  @IsOptional()
  @IsString()
  @MaxLength(32)
  arn?: string;

  @Transform(({ value }) => emptyToUndefined(value))
  @IsOptional()
  @IsIn(AUM_OPTIONS)
  aum?: (typeof AUM_OPTIONS)[number];

  @Transform(({ value }) => emptyToUndefined(value))
  @IsOptional()
  @IsIn(LANGUAGE_OPTIONS)
  language?: (typeof LANGUAGE_OPTIONS)[number];
}
