import { Exclude } from "class-transformer";
import { User } from "src/auth/user.entity";
import { Category } from "src/categories/entities/category.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatus } from "./task-status.enum";


@Entity()
export class Task
{
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    title:string;

    @Column()
    description:string;

    @Column()
    status:TaskStatus;

    @ManyToOne((_type)=>User,user => user.tasks, {eager:false,onDelete:"CASCADE"})
    @Exclude({toPlainOnly:true})
    user:User;

    @ManyToMany(()=>Category,(category)=>category.tasks)
    @JoinTable()
    categories:Category[]
}