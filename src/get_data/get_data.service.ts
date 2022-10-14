import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetData} from './entities/get_data.entity';
@Injectable()
export class GetDataService {
  constructor (
    @InjectRepository(GetData)
    private readonly getdataRepository: Repository<GetData>
) {}
  create( imageinformation) {
   
    return  this.getdataRepository.save(imageinformation)
  }

  findAll() :Promise<GetData[]>{
    return this.getdataRepository.find();
  }

  async findOne(id: number) {
    let data:any = await this.getdataRepository.findOneBy({id});
    // console.log('swapnil',data);
    
    let baseUrl=process.env.baseUrl
    // console.log(baseUrl);
    
    return {
      data : `${baseUrl}/images/${data.filename}.JPG`
    }
  }

}
