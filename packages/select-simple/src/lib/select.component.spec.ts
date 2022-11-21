import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectSimpleModule } from './select-simple.module';
import { SelectComponent } from './select.component';

const panelSelector = '.select-trigger';
const overlaySelector = '.select-panel';
const countries = ['Russia', 'USA', 'Germany'];

describe('SelectComponent', () => {
	let component: SelectComponent;
	let fixture: ComponentFixture<SelectComponent>;
	let fixtureNativeElement: HTMLElement;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [SelectSimpleModule],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(SelectComponent);
		fixtureNativeElement = fixture.nativeElement;
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
		expect(component.disabled).toBeFalsy();
	});

	it('should open overlay when clicked on container', async () => {
		component.options = countries;

		const elPanel: HTMLElement = fixtureNativeElement?.querySelector(panelSelector) as HTMLElement;
		fixtureNativeElement?.click();
		fixture.detectChanges();
		fixture.whenStable().then(() => {
			expect(selectEl(elPanel, overlaySelector)).toBeTruthy();
			expect(selectEl(elPanel, overlaySelector).innerHTML?.length).toBeTruthy();
		});
	});

	it('should be disabled / non-clickable if disabled prop set to `true` ', async () => {
		component.disabled = true;
		const elPanel: HTMLElement = fixtureNativeElement?.querySelector(panelSelector) as HTMLElement;
		fixtureNativeElement?.click();
		fixture.detectChanges();

		expect(selectEl(elPanel, overlaySelector)).toBeFalsy();
	});
});

const selectEl = (nativeEl: HTMLElement, selector: string) => nativeEl?.querySelector(selector) as HTMLElement;
