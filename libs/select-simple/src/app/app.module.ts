import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SelectDummyModule } from "@ngx-dummy/select-simple";

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, SelectDummyModule],
  bootstrap: [AppComponent],
})
export class AppModule { }
