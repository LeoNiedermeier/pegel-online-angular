import { Water } from './../shared/water.model';
import { AbstractControl, FormBuilder, FormControl, FormGroup, NgForm, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Params, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TableSorterEventService } from '../shared/table-sorter/tabel-sorter-event.service';
import { WaterLevel } from '../shared/waterlevel.model';
import 'rxjs/add/operator/switchMap';


@Component({
  selector: 'poa-water-level',
  templateUrl: './water-level.component.html',
  providers: [TableSorterEventService]
})
export class WaterLevelComponent {
  // Validation messages: ControlName : { messageKey : messageText, ....}
  private static readonly validationMessages = {
    'days': {
      'numberFormat': 'Tage: Zahl zwischen 0 un 99.',
    },
    'hours': {
      'numberFormat': 'Stunden: Zahl zwischen 0 un 99.',
    }
  };

  // format: { controleName : [messages,...], ...}
  formErrors = { days: null, hours: null };

  faSearch = false;

  searchForm: FormGroup;

  waterLevels: WaterLevel[] = [];
  private compareFunction: (a: any, b: any) => number;
  static onValueChanged (form: FormGroup, formErrors: any, validationMessages: any) {
    if (!form) { return; }

    // check only fields which have a validation message
    for (const field of Object.keys(validationMessages)) {
      // clear previous error message (if any)
      delete formErrors[field];
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = validationMessages[field];
        for (const key of Object.keys(control.errors)) {
          if (messages[key] != null) {
            if (formErrors[field] == null) {
              formErrors[field] = new Array();
            }
            (<string[]>formErrors[field]).push(messages[key]);
          }
        }
      }
    }
  }

  static validateNumberRange (): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      const n = parseFloat(control.value);
      return (control.value === '' || !isNaN(n) && n >= 0 && n <= 100) ? null : { 'numberFormat': { n } };
    };
  }
  constructor(private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder,
    tableSorterEventService: TableSorterEventService) {
    this.createForm();
    // table sorting
    tableSorterEventService.subscribe(e => {
      this.compareFunction = e.compareFunction;
      this.sortInputData();
    });

    this.route.data.subscribe((data: { waterLevels: WaterLevel[] }) => {
      this.waterLevels = data.waterLevels;
      this.sortInputData();
    }
    );
  }

  private sortInputData (): void {
    if (this.compareFunction != null) {
      this.waterLevels.sort(this.compareFunction);
    }
  }

  private createForm () {
    this.searchForm = this.formBuilder.group({
      // FormControl: name : [initial value, validators]
      days: ['', [WaterLevelComponent.validateNumberRange()]],
      hours: ['', [WaterLevelComponent.validateNumberRange()]]
    });
    this.searchForm.valueChanges
      .subscribe(data => WaterLevelComponent.onValueChanged(this.searchForm, this.formErrors, WaterLevelComponent.validationMessages));
  }

  onSubmit (): void {
    if (!this.searchForm.valid) {
      return;
    }

    // use the same format like in [routerLink] directive.
    // DO NOT set the parameters as queryParams in  NavigationExtras (does not change route -> no call of resolver -> no data)

    // simple handling of form values:
    const params = {};
    if (this.searchForm.value.days !== '') {
      params['days'] = this.searchForm.value.days;
    }
    if (this.searchForm.value.hours !== '') {
      params['hours'] = this.searchForm.value.hours;
    }

    this.router.navigate(['./',
      params],
      // should show same page, therefore relative to current and './' as path
      { relativeTo: this.route }
    );
  }
}
