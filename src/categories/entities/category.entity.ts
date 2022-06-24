import { Task } from "src/tasks/task.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category {

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    cat_title:string;

    @ManyToMany(()=>Task,(task)=>task.categories)
    tasks:Task[]

}
