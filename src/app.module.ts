import { Module } from '@nestjs/common';
import { PagesModule } from './pages/pages.module';
import { PilotModule } from './pilot/pilot.module';

@Module({
  imports: [PagesModule, PilotModule],
})
export class AppModule {}
