import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserInputDto } from './dto/create-user.dto';
import { Prisma } from 'database';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  getUsers() {
    return this.prisma.user.findMany();
  }

  async createUser(dto: CreateUserInputDto) {
    try {
      const user = await this.prisma.user.create({
        data: {
          ...dto,
        },
      });

      return user;
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          throw new ForbiddenException('This email is already taken');
        }
      }
    }
  }

  async deleteUser(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException();
    }

    await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
