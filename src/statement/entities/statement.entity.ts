import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Statement {
  @PrimaryGeneratedColumn()
  'id': number;
  @Column()
  'ownerName': string;
  @Column()
  'debtor': string;
  @Column()
  'outstandingBalance': number;
  @Column()
  'lastPayment': Date;
  @Column()
  'status': string;
  @Column()
  'submitTime': Date;
  @Column()
  'payAmount': number;
}
