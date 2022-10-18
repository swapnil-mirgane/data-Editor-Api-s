import {  Controller, Get,  Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  
  @Get('api/v1/image/detail')
  findOne(@Query('id') id: string) {
    return this.appService.findOne(+id);
  }


  @Get('allData')
  async findAll(@Query() query: { bbox: any }): Promise<any> {
    let BBox = `${query.bbox}`;
    let arr = query.bbox.split(',');
    if (arr.length === 4) {
      return this.appService.find(BBox);
    } else {
      return {
        message: 'No Data Found',
        data: [],
      };
    }
  }

}
