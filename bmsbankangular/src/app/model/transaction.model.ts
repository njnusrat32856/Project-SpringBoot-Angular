import { TransactionType } from "./transactionType.model";
import { User } from "./user.model";

export class Transaction {

    id !: number;
    transactionDate !: string;
    amount !: number;
    transactionType !: TransactionType; //deposit,withdraw,fund transfer
    description !: string;
    targetAccountNumber !: string; 

    status !: string;
    userid!: User
}