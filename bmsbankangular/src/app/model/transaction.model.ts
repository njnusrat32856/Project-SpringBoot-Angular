import { User } from "./user.model";

export class Transaction {

    id !: number;
    transactionDate !: string;
    amount !: number;
    transactionType !: string; //deposit,withdraw,fund transfer
    description !: string;
    targetAccountNumber !: string; 

    status !: string;
    userid!: User
}