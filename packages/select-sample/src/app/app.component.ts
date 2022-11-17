import { Component, HostBinding, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BasicStylesSet, ITemplates } from '@ngx-dummy/select-simple';

@Component({
	selector: 'ngx-dummy-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
	@HostBinding('class') class = 'flex pad-1_2';
	@ViewChild('btnTmpl', { static: true }) bntOpenTmpl!: TemplateRef<HTMLElement>;
	@ViewChild('selectedItemTemplate', { static: true }) selectedItemTemplate!: TemplateRef<HTMLElement>;
	title = 'Select-sample';

	selectedCity1: unknown = undefined;
	selectedCity2: unknown = undefined;
	selectedCity3: unknown = undefined;
	itemsTemplates: ITemplates = {};

	headStyle: BasicStylesSet = {
		backgroundColor: '#4d537c',
		border: '4px dotted teal',
		color: '#e2e1e1',
		padding: '1rem',
		boxShadow: 'teal 3px 3px 11px',
		borderRadius: '1rem',
		width: '100%',
		maxWidth: '25rem',
	};
	panelStyling: BasicStylesSet = {
		color: '#fff',
		backgroundColor: '#0e4a3bcc',
		padding: '10%',
		fontSize: '700',
		lineHeight: '200%',
		borderRadius: '1rem',
		border: 'none',
		boxShadow: '2px 5px 2px #DDD',
		left: '.5rem',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-start',
		justifyContent: 'space-around',
	};

	cities = [
		{ name: 'Moscow', code: 'MS' },
		{ name: 'St.Pete', code: 'SPB' },
		{ name: 'New York', code: 'NY' },
		{ name: 'Rome', code: 'RM' },
		{ name: 'London', code: 'LDN' },
		{ name: 'Paris', code: 'PRS' },
	];

	simpleCitiesArray = [...this.cities].map(({ name }) => name);

	form = new FormGroup({
		selector: new FormControl(this.cities[0]),
	});

	checkFormValid($event: MouseEvent) {
		$event.preventDefault();
		alert('Is form valid: ' + this.form.valid);
	}

	ngOnInit() {
		this.itemsTemplates = {
			openerBtnTemplate: this.bntOpenTmpl,
			selectedItemTemplate: this.selectedItemTemplate,
		};
		this.form.valueChanges.subscribe((formValue) => {
			console.log({ formValue, formValid: this.form.valid });
			this.selectedCity1 = { formValue, formValid: this.form.valid };
		});
	}
}
