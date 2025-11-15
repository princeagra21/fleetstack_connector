import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller() // root route
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get() // GET /
  getHello(): string {
    return this.appService.getHello();
  }
}
