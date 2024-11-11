import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpErrorInterceptor } from '../interceptors/http-error-interceptor.interceptor';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    NgbModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    NgbModule,
  ],
})
export class SharedModule {}