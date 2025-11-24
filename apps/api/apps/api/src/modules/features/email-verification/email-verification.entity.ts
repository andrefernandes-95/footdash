// apps/api/src/modules/user/email-verification.entity.ts
import { User } from 'apps/api/src/modules/features/users/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('email_verifications')
export class EmailVerification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  token: string; // a unique token for verification

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ default: false })
  verified: boolean;

  @CreateDateColumn()
  @Column({ name: 'created_at'})
  createdAt: Date;

  @Column({ name: 'expires_at', type: 'timestamp', nullable: true })
  expiresAt: Date;
}
