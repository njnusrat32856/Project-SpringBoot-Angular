import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoanListComponent } from './components/loan-list/loan-list.component';
import { TransactionListComponent } from './components/transaction-list/transaction-list.component';
import { DepositComponent } from './components/deposit/deposit.component';
import { TransferComponent } from './components/transfer/transfer.component';
import { WithdrawComponent } from './components/withdraw/withdraw.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { RegisterComponent } from './reg-login/register/register.component';
import { LoginComponent } from './reg-login/login/login.component';

const routes: Routes = [
  {
    path: 'loan-list', component: LoanListComponent
  },
  {
    path: 'transaction-list', component: TransactionListComponent
  },
  { path: 'deposit', component: DepositComponent },
  {
    path: 'transfer', component: TransferComponent
  },
  {
    path: 'withdraw', component: WithdrawComponent
  },
  { path: 'user-profile', component: UserProfileComponent },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'login', component: LoginComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
