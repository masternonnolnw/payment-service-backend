import { Module } from '@nestjs/common';
import { StatementService } from './statement.service';
import { StatementController } from './statement.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Statement } from './entities/statement.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Statement])],
  controllers: [StatementController],
  providers: [StatementService],
})
export class StatementModule {}
