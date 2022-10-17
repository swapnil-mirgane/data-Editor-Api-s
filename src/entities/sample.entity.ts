
import { Column, Entity,PrimaryGeneratedColumn } from "typeorm";
@Entity('sample_data')
export class sample_data {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    latitude:string;
    @Column()
    longitude:string;
    @Column()
    altitude:number;
    @Column()
    filename:string;
    @Column()
    // raw_data:({type:'jsonb',default:{}});
    raw_data:string;
    @Column()
    timestamp:number;
    @Column()
    created_date:number;
}
    
    
    
    
    
    
    
    
