import { Module, forwardRef } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [forwardRef(() => AuthModule)],
  controllers: [MailController],
  providers: [MailService],
})
export class MailModule {}
