import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { sample_data } from './entities/sample.entity';
import * as AWS from 'aws-sdk';
const AWS_S3_BUCKET_NAME=process.env.AWS_S3_BUCKET_NAME;
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  signatureVersion: 'v4',
  region: 'ap-south-1',
  secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY
});
@Injectable()
export class AppService {
  constructor (
    @InjectRepository(sample_data)
    private readonly sample_dataRepository: Repository<sample_data>
     ) {}
  getHello(): string {
    return 'Hello World!';
  }

  // find by id  
  async getImageUrl(id: number) {
    let data:any = await this.sample_dataRepository.findOneBy({id});  
    let baseUrl=process.env.baseUrl
    
    if(!data){
      return{
        msg:`No Data Found `
      }
    }
    const url = s3.getSignedUrl('getObject', { Bucket:process.env.AWS_S3_BUCKET_NAME, Key:`Nilesh_B/2022-09-23/114GOPRO/G0095996.JPG` })
    return {
      data : { url }
    }
  }

// find by bounding box
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
    return { data };
  }


}
