import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreatePilotRequestDto } from './dto/create-pilot-request.dto';

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 3;

@Injectable()
export class PilotService {
  private readonly logger = new Logger(PilotService.name);
  private readonly recent = new Map<string, number[]>();

  create(dto: CreatePilotRequestDto) {
    this.assertNotSpamming(dto.phone);
    const receivedAt = new Date().toISOString();
    this.logger.log(
      JSON.stringify({
        event: 'pilot_request',
        receivedAt,
        name: dto.name,
        phone: dto.phone,
        city: dto.city ?? '',
        arn: dto.arn ?? '',
        aum: dto.aum ?? '',
        language: dto.language ?? '',
      }),
    );
    return {
      ok: true,
      message:
        'Your request is in. Expect a WhatsApp message from the founder within two business days.',
    };
  }

  private assertNotSpamming(phone: string) {
    const key = phone.replace(/\s|-/g, '');
    const now = Date.now();
    const hits = (this.recent.get(key) ?? []).filter((at) => now - at < WINDOW_MS);
    if (hits.length >= MAX_REQUESTS) {
      throw new HttpException(
        'Too many requests from this number. Please try again later.',
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }
    hits.push(now);
    this.recent.set(key, hits);
  }
}
