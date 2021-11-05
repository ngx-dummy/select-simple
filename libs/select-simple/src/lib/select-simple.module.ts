import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownComponent } from './dropdown/dropdown.component';
import { DropdownItemComponent } from './dropdown/dropdown-item.component';

@NgModule({
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    DropdownComponent,
    DropdownItemComponent
  ],
  exports: [
    DropdownComponent,
    DropdownItemComponent
  ],
})
export class SelectSimpleModule {}
