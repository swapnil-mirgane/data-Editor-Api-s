import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { sample_data } from './entities/sample.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(sample_data)
    private readonly sample_dataRepository: Repository<sample_data>,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  // find by id
  async findOne(id: number) {
    let data: any = await this.sample_dataRepository.findOneBy({ id });
    let baseUrl = process.env.baseUrl;

    if (!data) {
      return {
        msg: `No Data Found `,
      };
    }
    let url = ` ${baseUrl}/storage/${data.fname}`;
    return {
      data: { url },
    };
  }

  async find(BBox) {
    let data1: any = await this.sample_dataRepository
      .query(`SELECT * FROM sample_data WHERE ST_Contains(
        ST_Transform(
            ST_MakeEnvelope(${BBox},4326)  
            ,4326)
        ,sample_data.geom::geometry)`);
    let data = await data1.map((ele) => {
      return {
        id: ele.id,
        lat: ele.lat,
        long: ele.long,
      };
    });
    return { NoOfData: data.length, data };
  }
}
