import { User } from "./user.model";

export class Loan {

    id !: number;
    
    loanAmount !: number;
    interestRate !: number;
    monthlyPayment !: number;
    durationInMonths !: number;
    startDate !: Date;
    endDate !: Date;
    status !: boolean;

    user !: User;

}