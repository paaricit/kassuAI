import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreatePilotRequestDto } from './dto/create-pilot-request.dto';
import { PilotService } from './pilot.service';

@Controller('api')
export class PilotController {
  constructor(private readonly pilotService: PilotService) {}

  @Get('health')
  health() {
    return { ok: true, service: 'kassu-ai' };
  }

  @Post('pilot')
  create(@Body() dto: CreatePilotRequestDto) {
    return this.pilotService.create(dto);
  }
}
