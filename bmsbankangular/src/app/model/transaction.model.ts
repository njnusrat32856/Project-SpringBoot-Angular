
export class Transaction {

    id !: number;
    transactionDate !: Date;
    amount !: number;
    transactionType !: string; //deposit,withdraw,fund transfer
    description !: string;
    targetAccountNumber ?: string; 

    status !: boolean;
}