import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectItemComponent } from './select-item.component';
import { SelectComponent } from './select.component';

@NgModule({
	imports: [CommonModule, FormsModule],
	declarations: [SelectComponent, SelectItemComponent],
	exports: [SelectComponent, SelectItemComponent],
})
export class SelectSimpleModule { }
