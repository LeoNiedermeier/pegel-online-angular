import { PaginatorAsViewChild } from '../../shared/paginator-as-view-child/paginator-as-view-child.component';
import { Water } from './../shared/water.model';
import { AbstractControl, FormBuilder, FormControl, FormGroup, NgForm, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Params, Router } from '@angular/router';
import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { TableSorterEventService } from '../shared/table-sorter/tabel-sorter-event.service';
import { WaterLevel } from '../shared/waterlevel.model';
import { Subject } from 'rxjs/Rx';
import 'rxjs/add/operator/takeUntil';


@Component({
  selector: 'poa-water-level',
  templateUrl: './water-level.component.html',
  providers: [TableSorterEventService]
})
export class WaterLevelComponent implements OnDestroy, AfterViewInit {
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
  // the fields are not really necessary, but useful for code completion
  formErrors = { days: null, hours: null };

  faSearch = false;

  searchForm: FormGroup;

  // need all data for sorting
  waterLevels: WaterLevel[] = [];

  get pageElements(): WaterLevel[] {
    // the current page elements are stored in the paginator component.
    if (this.paginatorComponent) {
      return this.paginatorComponent.getPageData();
    } else {
      return [];
    }
  }


  // we want to access the component directly via typescript. (not via html template)
  @ViewChild(PaginatorAsViewChild)
  private paginatorComponent: PaginatorAsViewChild<WaterLevel>;

  private compareFunction: (a: any, b: any) => number;

  private ngUnsubscribe: Subject<void> = new Subject<void>();

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

  // example of custom validator:
  static validateNumberRange(min: number, max: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      const n = parseFloat(control.value);
      return (control.value === '' || !isNaN(n) && n >= min && n <= max) ? null : { 'numberFormat': { n } };
    };
  }
  constructor(private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder,
    private tableSorterEventService: TableSorterEventService) {
    this.createForm();
  }

  private sortInputData(): void {
    if (this.compareFunction != null) {
      this.waterLevels.sort(this.compareFunction);
    }
    this.paginatorComponent.setData(this.waterLevels);
  }

  private createForm() {
    this.searchForm = this.formBuilder.group({
      // FormControl: name : [initial value, validators]
      days: ['', [WaterLevelComponent.validateNumberRange(0, 30)]],
      hours: ['', [WaterLevelComponent.validateNumberRange(0, 24)]]
    });
    this.searchForm.valueChanges.takeUntil(this.ngUnsubscribe)
      .subscribe(data => WaterLevelComponent.onValueChanged(this.searchForm, this.formErrors, WaterLevelComponent.validationMessages));
  }

  onSubmit(): void {
    if (!this.searchForm.valid) {
      return;
    }

    // use the same format like in [routerLink] directive.
    // DO NOT set the parameters as queryParams in  NavigationExtras (does not change route -> no call of resolver -> no data)

    // simple handling of form values:
    const params = {};
    // do not set empty values!
    if (this.searchForm.value.days !== '') {
      params['days'] = this.searchForm.value.days;
    }
    if (this.searchForm.value.hours !== '') {
      params['hours'] = this.searchForm.value.hours;
    }

    this.router.navigate(['./', params],
      // should show same page, therefore relative to current and './' as path
      { relativeTo: this.route }
    );
  }

  ngAfterViewInit(): void {
    // due to timings we have to do the following in the ngAfterViewInit method. Will not work in constructor.
    // -> the sortInputData method transfers data to the PaginatorAsViewChild which is not available earlier.
    // table sorting
    this.tableSorterEventService.subscribe(e => {
      this.compareFunction = e.compareFunction;
      this.sortInputData();
    });

    this.route.data.subscribe((data: { waterLevels: WaterLevel[] }) => {
      this.waterLevels = data.waterLevels;
      this.sortInputData();
    }
    );
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.complete();
  }
}
