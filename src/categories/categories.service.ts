import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriesRepository } from './categories.repository';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {

  constructor(
    @InjectRepository(CategoriesRepository)
    private categoryRepository: CategoriesRepository,
  ) { }


 async create(createCategoryDto: CreateCategoryDto):Promise<Category> {

    const {cat_title}=createCategoryDto;

    const categories =this.categoryRepository.create({
      cat_title
    })

    await this.categoryRepository.save(categories);
    return categories;
  }

  findAll() {
    return `This action returns all categories`;
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
