import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectItemComponent } from './select/select-item.component';
import { SelectComponent } from './select/select.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [SelectComponent, SelectItemComponent],
  exports: [SelectComponent, SelectItemComponent],
})
export class SelectSimpleModule {}
