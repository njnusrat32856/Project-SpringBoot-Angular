import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { LoanListComponent } from './components/loan-list/loan-list.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TransactionListComponent } from './components/transaction-list/transaction-list.component';
import { DepositComponent } from './components/deposit/deposit.component';
import { TransferComponent } from './components/transfer/transfer.component';
import { WithdrawComponent } from './components/withdraw/withdraw.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoanListComponent,
    TransactionListComponent,
    DepositComponent,
    TransferComponent,
    WithdrawComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
