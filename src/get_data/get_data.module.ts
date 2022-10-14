import { Module } from '@nestjs/common';
import { GetDataService } from './get_data.service';
import { GetDataController } from './get_data.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GetData } from './entities/get_data.entity';

@Module({
  controllers: [GetDataController],
  providers: [GetDataService],
  imports:[TypeOrmModule.forFeature([GetData])]
})
export class GetDataModule {}
