import { Controller, Get, Query, Render } from '@nestjs/common';
import { AppService } from './app.service.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getHello() {
    return {
      title: 'My First NestJS App'
    }
  }

  @Get('paintings')
  @Render('paintings')
  async getPaintings(@Query('minYear') minYear: string = '0') {
    const db = await this.appService.paintingsDb();
    const paintings = await this.appService.paintingsList(parseInt(minYear));
    return {
      title: 'Paintings',
      db: db,
      paintings: paintings
    }
  }
}
