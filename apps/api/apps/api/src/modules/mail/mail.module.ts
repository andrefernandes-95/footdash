import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'localhost',
        port: 1026,
      },
      defaults: {
        from: '"Foot Dash" <no-reply@footdash.local>',
      },
      preview: true,
    }),
  ],
})
export class MailModule {}
