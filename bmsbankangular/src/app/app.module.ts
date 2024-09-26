import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { LoanListComponent } from './components/loan-list/loan-list.component';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TransactionListComponent } from './components/transaction-list/transaction-list.component';
import { DepositComponent } from './components/deposit/deposit.component';
import { TransferComponent } from './components/transfer/transfer.component';
import { WithdrawComponent } from './components/withdraw/withdraw.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { LoginComponent } from './reg-login/login/login.component';
import { RegisterComponent } from './reg-login/register/register.component';
import { LogoutComponent } from './reg-login/logout/logout.component';
import { TokenInterceptor } from './guard/TokenInterceptor';
import { LoanApplyComponent } from './components/loan-apply/loan-apply.component';
import { LoanPaymentComponent } from './components/loan-payment/loan-payment.component';
import { BankStatementComponent } from './components/bank-statement/bank-statement.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoanListComponent,
    TransactionListComponent,
    DepositComponent,
    TransferComponent,
    WithdrawComponent,
    UserProfileComponent,
    LoginComponent,
    RegisterComponent,
    LogoutComponent,
    LoanApplyComponent,
    LoanPaymentComponent,
    BankStatementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()),
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
