import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoanListComponent } from './components/loan-list/loan-list.component';
import { TransactionListComponent } from './components/transaction-list/transaction-list.component';
import { DepositComponent } from './components/deposit/deposit.component';
import { TransferComponent } from './components/transfer/transfer.component';
import { WithdrawComponent } from './components/withdraw/withdraw.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
