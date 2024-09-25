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
import { LogoutComponent } from './reg-login/logout/logout.component';
import { AuthGuard } from './guard/authguard.guard';
import { LoanApplyComponent } from './components/loan-apply/loan-apply.component';
import { LoanPaymentComponent } from './components/loan-payment/loan-payment.component';

const routes: Routes = [
  {
    path: 'loan-list', component: LoanListComponent, canActivate: [AuthGuard]
  },
  {
    path: 'loan-apply', component: LoanApplyComponent, canActivate: [AuthGuard]
  },
  {
    path: 'loan-payment/:id', component: LoanPaymentComponent, canActivate: [AuthGuard]
  },
  {
    path: 'transaction-list', component: TransactionListComponent, canActivate: [AuthGuard]
  },
  { path: 'deposit', component: DepositComponent, canActivate: [AuthGuard] },
  {
    path: 'transfer', component: TransferComponent, canActivate: [AuthGuard]
  },
  {
    path: 'withdraw', component: WithdrawComponent, canActivate: [AuthGuard]
  },
  { path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuard] },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },
  {
    path: 'logout', component: LogoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
