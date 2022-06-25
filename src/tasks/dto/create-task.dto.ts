import { IsNotEmpty } from 'class-validator';
import { CreateCategoryDto } from 'src/categories/dto/create-category.dto';

export class CreateTaskDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  
  categoriesid:[]
}
