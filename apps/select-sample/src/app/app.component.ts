import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'ngx-dummy-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'select-sample';
  // baseEl: HTMLSelectElement;
  selectedCity1: any;


  cities = [
    { name: 'Moscow', code: 'MS' },
    { name: 'St.Pete', code: 'SPB' },
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Paris', code: 'PRS' }
  ];

  form = new FormGroup({
    selector: new FormControl(this.cities[0])
  });


  ngOnInit() {
    this.form.valueChanges.subscribe(formValue => {
      console.log({ formValue });
    });
  }
}




