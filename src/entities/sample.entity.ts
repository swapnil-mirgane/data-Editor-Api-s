
import { Column, CreateDateColumn, Entity,PrimaryGeneratedColumn } from "typeorm";
import { Geometry } from 'geojson';
@Entity('sample_data')
export class sample_data {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({type:'decimal',nullable:true})
    lat:string;
    @Column({type:'decimal',nullable:true})
    long:string;
    @Column({type:'decimal',nullable:true})
    alt:number;
    @Column()
    filename:string;
    @Column({type:'jsonb',default:{}})
    raw_data:any
    @CreateDateColumn()
    created_date:Date;
    @Column({
        type: 'geometry',
        spatialFeatureType: 'geometry',
        srid: 4326,
        nullable: true,
      })
      geom: Geometry;
}
    
    
    
    
    
    
    
    
