import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { sample_data } from './entities/sample.entity';


@Injectable()
export class AppService {
  constructor (
    @InjectRepository(sample_data)
    private readonly sample_dataRepository: Repository<sample_data>
     ) {}
  getHello(): string {
    return 'Hello World!';
  }
  async findOne(id: number) {
    let data:any = await this.sample_dataRepository.findOneBy({id});  
    let baseUrl=process.env.baseUrl
    let url=` ${baseUrl}/storage/${data.filename}.JPG `
    return {
      data : { url }
    }
  }
}
