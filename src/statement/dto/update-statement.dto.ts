import { PartialType } from '@nestjs/mapped-types';
import { CreateStatementDto } from './create-statement.dto';

export class UpdateStatementDto extends PartialType(CreateStatementDto) {
  'id': number;
  'ownerName': string;
  'debtor': string;
  'outstandingBalance': number;
  'lastPayment': Date;
  'status': string;
  'submitTime': Date;
  'payAmount': number;
}
