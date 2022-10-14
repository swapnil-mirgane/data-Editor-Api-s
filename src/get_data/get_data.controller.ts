import { Controller, Get, Post, Body, Param, UseInterceptors,UploadedFile, Res} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Observable, of } from 'rxjs';
import { GetDataService } from './get_data.service';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path = require('path');
import { join } from 'path';
@Controller('api/v1/image/detail')
export class GetDataController {
  constructor(private readonly getDataService: GetDataService) {}

  @Post()
  create(@Body() createGetDatumDto) {
    return this.getDataService.create(createGetDatumDto);
  }

  @Get()
  findAll() {
    return this.getDataService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.getDataService.findOne(+id);
  }
  
@Post('upload')
@UseInterceptors(FileInterceptor('file',{
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
        const filename: string = path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
        const extension: string = path.parse(file.originalname).ext;

        cb(null, `${filename}${extension}`)
    }
})
}))
uploadFile(@UploadedFile() file):Observable<Object> {
return of ({imagePath:file.path});
}



 // image data get
  @Get('images/:image')
  seeUploadedFile(@Param('image') image, @Res() res) {
    return res.sendFile(image, { root: './uploads' });
  }
}
