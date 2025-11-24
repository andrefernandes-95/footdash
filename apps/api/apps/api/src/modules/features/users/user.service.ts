// apps/api/src/modules/user/user.service.ts
import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateUserDto } from './user.dto';
import * as bcrypt from 'bcryptjs';
import { User } from 'apps/api/src/modules/features/users/user.entity';
import { EmailVerificationService } from 'apps/api/src/modules/features/email-verification/email-verification.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly emailVerificationService: EmailVerificationService,
    private readonly dataSource: DataSource, // inject DataSource for transactions
  ) { }

  async signUp(createUserDto: CreateUserDto): Promise<User> {
    return this.dataSource.transaction(async (transactionManager) => {

      const { email, username, password } = createUserDto;

      // Check if user already exists
      const existingUser = await transactionManager.findOne(User, {
        where: [{ email }, { username }],
      });
      if (existingUser) {
        throw new ConflictException('User with this email or username already exists');
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
      // Create user
      const user = transactionManager.create(User, {
        email,
        username,
        password: hashedPassword,
        isActive: false, // inactive until verified
      });

      await transactionManager.save(User, user);

      // Create email verification token
     const emailVerification = await this.emailVerificationService.generateToken(user, transactionManager);

      // Send email (can fail, but won't rollback user creation)
      await this.emailVerificationService.enqueueEmailVerification(user.email, emailVerification.token)
      
      return user;
    })
  }


  async validateLogin(email: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) return null;

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return null;

    return user;
  }

  async getUserById(userId: number) {
    return this.userRepository.findOne({ where: { id: userId } });
  }
}
