import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { User } from 'src/auth/user.entity';
import { Category } from 'src/categories/entities/category.entity';

@Injectable()
export class TasksService {

  private logger = new Logger('TasksService', true);

  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
  ) { }

  async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    const { status, search } = filterDto;
    const query = this.tasksRepository.createQueryBuilder('task');
    query.where({ user }).leftJoinAndSelect("task.categories", "categories");

    if (status) {
      query.andWhere('task.status = :status', { status })
    }
    if (search) {
      query.andWhere('(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))', { search: `%${search}%` },);
    }

    try {
      const tasks = await query.getMany();



      return tasks;
    } catch (error) {
      this.logger.error(`Failed to get Tasks for User "${user.username}",Filters:${JSON.stringify(filterDto)}`);
      throw new InternalServerErrorException();
    }
  }


  async getTaskById(id: string, user: User): Promise<Task> {

    // const found = await this.tasksRepository.findOne(id);
    const found = await this.tasksRepository.findOne({ where: { id, user } });


    if (!found) {
      throw new NotFoundException(`Task with ID ${id} is not found`)
    }

    return found;

  }

  async createTask(createTaskDto: CreateTaskDto, user: User, file): Promise<Task> {
    const { title, description, categoriesid } = createTaskDto;
    let categories = [];
    const path= file.path;
    

    for (let i = 0; i < categoriesid.length; i++) {
      const genre = await Category.findOne(categoriesid[i])
      categories.push(genre);
    }

    const task = this.tasksRepository.create({
      title,
      description,
      categories,
      path,
      status: TaskStatus.OPEN,
      user,
    });
    await this.tasksRepository.save(task);
    return task;
  }

  async deleteTask(id: string, user: User): Promise<void> {
    const result = await this.tasksRepository.delete({ id, user });

    if (result.affected === 0) {
      throw new NotFoundException(`Task id ${id} not found`);
    }
  }

  async updateTaskStatus(id: string, status: TaskStatus, user: User): Promise<Task> {
    const task = await this.getTaskById(id, user);


    task.status = status;
    await this.tasksRepository.save(task);

    return task;
  }

}
