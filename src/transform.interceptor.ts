import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { classToPlain } from 'class-transformer';
import { Observable } from 'rxjs';
import { tap,map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // console.log('Before...');

    // const now = Date.now();
    return next
      .handle()
      .pipe(map((data)=>classToPlain(data)));
  }
}