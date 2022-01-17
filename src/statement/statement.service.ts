import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStatementDto } from './dto/create-statement.dto';
import { UpdateStatementDto } from './dto/update-statement.dto';
import { Statement } from './entities/statement.entity';

@Injectable()
export class StatementService {
  private readonly logger = new Logger(StatementService.name);
  constructor(
    @InjectRepository(Statement)
    private statementRepo: Repository<Statement>,
  ) {}
  @Cron('0 0 3 14 * *')
  handleCron() {
    this.addDebt();
  }
  async addDebt() {
    const allStatement = await this.statementRepo.find();
    var allStatementResult = [];
    for (let i = 0; i < allStatement.length; i++) {
      var statement = allStatement[i];
      statement.outstandingBalance += 50;
      this.statementRepo.save(statement);
      allStatementResult[i] = statement;
    }
    return allStatementResult;
  }
  create(createStatementDto: CreateStatementDto) {
    return this.statementRepo.save(createStatementDto);
  }

  findAll() {
    return this.statementRepo.find();
  }

  findOne(id: number) {
    return this.statementRepo.findOne(id);
  }

  async update(id: number, updateStatementDto: UpdateStatementDto) {
    const getStatement = await this.findOne(id);
    if (updateStatementDto.ownerName)
      getStatement.ownerName = updateStatementDto.ownerName;
    if (updateStatementDto.debtor)
      getStatement.debtor = updateStatementDto.debtor;
    if (updateStatementDto.outstandingBalance != null)
      getStatement.outstandingBalance = updateStatementDto.outstandingBalance;
    if (updateStatementDto.lastPayment)
      getStatement.lastPayment = updateStatementDto.lastPayment;
    if (updateStatementDto.status)
      getStatement.status = updateStatementDto.status;
    if (updateStatementDto.submitTime)
      getStatement.submitTime = updateStatementDto.submitTime;
    if (updateStatementDto.payAmount)
      getStatement.payAmount = updateStatementDto.payAmount;
    return await this.statementRepo.save(getStatement);
  }

  remove(id: number) {
    return `This action removes a #${id} statement`;
  }
}
