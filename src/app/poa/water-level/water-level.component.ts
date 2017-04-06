import { WaterLevel } from '../shared/waterlevel.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormControl, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Params, Router, NavigationExtras } from '@angular/router';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'poa-water-level',
  templateUrl: './water-level.component.html'
})
export class WaterLevelComponent implements OnInit {
  private validationMessages = {
    'days': {
      'numberFormat': 'Zahl zwischen 0 un 99.',
    },
    //    'hours': {
    //      'numberFormat': 'Zahl zwischen 0 un 99.',
    //    }
  };

  formErrors = {};

  searchForm: FormGroup;

  waterLevels: WaterLevel[] = [];

  static onValueChanged(form: FormGroup, formErrors: any, validationMessages: any) {
    if (!form) { return; }

    // check only fields which have a validation message
    for (const field of Object.keys(validationMessages)) {
      // clear previous error message (if any)
      delete formErrors[field];
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = validationMessages[field];
        for (const key of Object.keys(control.errors)) {
          formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  static validateNumberRange(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      const n = parseFloat(control.value);
      return (control.value === '' || !isNaN(n) && n >= 0 && n <= 100) ? null : { 'numberFormat': { n } };
    };
  }
  constructor(private route: ActivatedRoute, private router: Router, private fb: FormBuilder) {
    this.createForm();
  }

  private createForm() {
    this.searchForm = this.fb.group({
      // FormControl: name : [initial value, validators]
      days: ['', [WaterLevelComponent.validateNumberRange()]],
      hours: ''
    });
    this.searchForm.valueChanges
      .subscribe(data => WaterLevelComponent.onValueChanged(this.searchForm, this.formErrors, this.validationMessages));
  }

  onSubmit(): void {
    if (!this.searchForm.valid) {
      return;
    }

    // use the same format like in [routerLink] directive.
    // DO NOT set the parameters as queryParams in  NavigationExtras (does not change route -> no call of resolver -> no data)
    this.router.navigate(['./',
      //TODO: how to handle values?
      { days: this.searchForm.value.days, hours: this.searchForm.value.hours }],
      // should show same page, therefore relative to current and './' as path
      { relativeTo: this.route }
    );
  }

  ngOnInit() {
    // use the resolved data
    this.route.data.subscribe((data: { waterLevels: WaterLevel[] }) => this.waterLevels = data.waterLevels);
  }
}
