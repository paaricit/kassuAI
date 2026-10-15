import { Controller, Get, Header } from '@nestjs/common';
import { landingPage } from './landing-page';

@Controller()
export class PagesController {
  @Get()
  @Header('Content-Type', 'text/html; charset=utf-8')
  home(): string {
    return landingPage;
  }
}
