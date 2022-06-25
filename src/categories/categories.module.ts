import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesRepository } from './categories.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[TypeOrmModule.forFeature([CategoriesRepository]),
  AuthModule
],
  controllers: [CategoriesController],
  providers: [CategoriesService]
})
export class CategoriesModule {}
