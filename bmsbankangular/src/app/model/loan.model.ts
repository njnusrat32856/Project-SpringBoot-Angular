import { User } from "./user.model";

export class Loan {

    id !: number;
    loanType !: string;
    loanAmount !: number;
    interestRate !: number;
    monthlyPayment !: number;
    durationInMonths !: number;
    startDate !: string;
    endDate !: string;
    status !: boolean;

    user !: User;

}