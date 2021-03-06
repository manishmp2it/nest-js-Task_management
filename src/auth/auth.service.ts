import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { User } from './user.entity';


@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(UsersRepository)
        private usersRepository:UsersRepository,
        private jwtService:JwtService,
    ){}

    async signup(authCredentialsDto:AuthCredentialsDto):Promise<void>{

        return this.usersRepository.createUser(authCredentialsDto);

    }

    async signIn(authCredentialsDto:AuthCredentialsDto):Promise<{accessToken:string}>
    {
        const {username,password}=authCredentialsDto;

        const user =await this.usersRepository.findOne({username});

        if(user && (await bcrypt.compare(password,user.password))){
            
            const payload:JwtPayload = {username};
            const accessToken:string= await this.jwtService.sign(payload);
            return {accessToken}
        }
        else{
            throw new UnauthorizedException('please check your login credentials');
        }
    }

    async getUser():Promise<User[]>{

        const users = await this.usersRepository.find({});


         return users;
    }

    async deleteUser(id:string):Promise<void>{

        const result = await this.usersRepository.delete({id})

        if(result.affected===0)
        {
            throw new NotFoundException(`User Id not Found`);
        }

    }
}
