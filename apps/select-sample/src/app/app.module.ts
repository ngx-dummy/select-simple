import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SelectSimpleModule } from "@ngx-dummy/select-simple";

@NgModule({
  declarations: [AppComponent],
 
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, SelectSimpleModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
