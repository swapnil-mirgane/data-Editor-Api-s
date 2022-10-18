
import { Column, CreateDateColumn, Entity,PrimaryGeneratedColumn } from "typeorm";
import { Geometry } from 'geojson';
@Entity('sample_data')
export class sample_data {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', nullable: true })
  lat: any;

  @Column({ type: 'decimal', nullable: true })
  long: any;

  @Column({ type: 'decimal', nullable: true })
  alt: any;

  @Column({ nullable: true })
  fname: string;

  @Column({
    type: 'geometry',
    spatialFeatureType: 'geometry',
    srid: 4326,
    nullable: true,
  })
  geom: Geometry;

  @Column({ type: 'timestamptz' }) 
  timestamp: Date;
}
    
    
    
    
    
    
    
    
