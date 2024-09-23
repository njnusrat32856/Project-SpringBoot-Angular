import { Role } from "./role.model";
import { Token } from "./token.model";

export class User {

    id !: number;
    accountNumber !: string;
    firstName !: string;
    lastName !: string;
    email !: string;
    password !: string;
    gender !: string;
    address !: string;
    mobileNo !: string;
    nid !: string;
    dob !: string;
    image !: string;
    accountType !: string;
    createDate !: string;
    status !: boolean;
    balance !: number;

    role!: Role;
  
    tokens!: Token[];

}
