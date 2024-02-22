import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class UserRepository {
  findOneUserByUserId = async (userId) => {
    const user = await prisma.user.findUnique({
      where: {
        userId,
      },
    });
    return user;
  };

  selectOneUserbyClientId = async (clientId) => {
    const user = await prisma.user.findUnique({
      where: {
        clientId,
      },
    });
    return user;
  };

  selectOneUserbyEmail = async (email) => {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  };

  selectOneUserbyEmailAndPassword = async (email, password) => {
    const user = await prisma.user.findUnique({
      where: {
        email,
        password,
      },
    });
    return user;
  };

  createUser = async (data) => {
    const user = await prisma.user.create({
      data,
    });
    return user;
  };
}

const userRepository = new UserRepository();
export default userRepository;