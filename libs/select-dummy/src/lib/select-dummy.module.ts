import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownItemComponent } from "./dropdown/dropdown-item.component";
import { DropdownComponent } from "./dropdown/dropdown.component";

@NgModule({
  imports: [CommonModule, FormsModule],
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
export class SelectDummyModule { }
