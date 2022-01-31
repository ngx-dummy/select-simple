import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectSimpleModule } from './select-simple.module';
import { SelectComponent } from './select.component';

const panelSelector = '.select';
const overlaySelector = '.select-panel';
const countries = ['Russia', 'USA', 'Germany'];

describe('SelectComponent', () => {
	let component: SelectComponent;
	let fixture: ComponentFixture<SelectComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [SelectSimpleModule],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(SelectComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
		expect(component.disabled).toBeFalsy();
	});

	it('should open overlay when clicked on container', async () => {
		component.options = countries;

		const elPanel: HTMLElement = fixture.nativeElement.querySelector(panelSelector);
		elPanel?.click();
		fixture.detectChanges();
		expect(component.overlayVisible).toBe(true);
		expect(selectEl(fixture, overlaySelector)).toBeTruthy();
		expect(selectEl(fixture, overlaySelector).innerHTML?.length).toBeTruthy();
	});

	it('should be disabled / non-clickable if disabled prop set to `true` ', async () => {
		component.disabled = true;
		const elPanel: HTMLElement = fixture.nativeElement.querySelector(panelSelector);
		elPanel?.click();
		fixture.detectChanges();

		expect(component.overlayVisible).toBe(false);
	});
});

const selectEl = (fixture: ComponentFixture<SelectComponent>, selector: string) => fixture.nativeElement.querySelector(selector);
