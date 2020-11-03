import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    // TODO dotenv
    MongooseModule.forRoot('mongodb+srv://backend:kybRcKFgouGzuNkX@p1k-1.hrdvj.mongodb.net/p1k', { useNewUrlParser: true }),
    AuthModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
