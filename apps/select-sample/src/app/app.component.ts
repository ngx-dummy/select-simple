import { Component, Host, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { ITemplates } from '@ngx-dummy/select-simple';

@Component({
  selector: 'ngx-dummy-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  host: {
    class: 'flex pad-1_2',
  },
})
export class AppComponent implements OnInit {
  @ViewChild('btnTmpl', { static: true }) bntOpenTmpl: TemplateRef<HTMLElement>;
  @ViewChild('selectedItemTemplate', { static: true })
  selectedItemTemplate: TemplateRef<HTMLElement>;
  title = 'Select-sample';

  selectedCity1: any;
  selectedCity2: any;
  selectedCity3: any;
  templates: ITemplates = {};

  headStyle = {
    background: 'lightgreen',
  };
  panelStyling = {
    background: '#10882a38',
    color: '#91c',
    fontSize: '700',
    lineHeight: '200%',
    borderRadius: '1rem',
    border: 'none',
    boxShadow: '1px 5px 2px rgba(155, 225, 225, .25)',
    left: '.5rem',
    width: '200%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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

  simpleCitiesArray = [...this.cities].map(({ name, code }) => name);

  form = new FormGroup({
    selector: new FormControl(this.cities[0]),
  });

  ngOnInit() {
    this.templates = {
      opennerBtnTemplate: this.bntOpenTmpl,
      selectedItemTemplate: this.selectedItemTemplate,
    };
    this.form.valueChanges.subscribe((formValue) => {
      console.log({ formValue, formValid: this.form.valid });
      this.selectedCity1 = formValue;
    });
  }
}
