import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  
  @Get('api/v1/image/detail/:id')
  findOne(@Param('id') id: string) {
    return this.appService.findOne(+id);
  }
}
