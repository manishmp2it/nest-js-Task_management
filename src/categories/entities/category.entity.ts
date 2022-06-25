import { Task } from "src/tasks/task.entity";
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    cat_title:string;

    @ManyToMany(()=>Task,(task)=>task.categories)
    tasks:Task[]

}
