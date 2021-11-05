import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownComponent } from './dropdown.component';
import { SelectDummyModule } from '../select-simple.module';

const panelSelector = '.dropdown.component';
const overlaySelector = '.dropdown-panel';
const coutries = ['Russia', 'USA', 'Germany'];

describe('DropdownComponent', () => {
  let component: DropdownComponent;
  let fixture: ComponentFixture<DropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectDummyModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.disabled).toBeFalsy();
  });

  it("should open overlay when clicked on container", async () => {
    component.options = coutries;


    const elPanel: HTMLElement = fixture.nativeElement.querySelector(panelSelector);
    elPanel.click();
    fixture.detectChanges();
    expect(component.overlayVisible).toBe(true);
    expect(selectEl(fixture, overlaySelector)).toBeTruthy();
    expect(selectEl(fixture, overlaySelector).innerHTML?.length).toBeTruthy();
    expect(selectEl(fixture, overlaySelector).innerHTML).toBeTruthy();
  });

  it('should be disabled / non-clickable if disabled prop set to `true` ', async () => {

    component.disabled = true;
    const elPanel: HTMLElement = fixture.nativeElement.querySelector(panelSelector);
    elPanel.click();
    fixture.detectChanges();

    expect(component.overlayVisible).toBe(false);
  });


});

const selectEl = (fixture, selector) => fixture.nativeElement.querySelector(selector);