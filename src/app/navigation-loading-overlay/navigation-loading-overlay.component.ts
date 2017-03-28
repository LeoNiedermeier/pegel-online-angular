import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

@Component({
  selector: 'poa-navigation-loading-overlay',
  // inline template with multiline string
  template: `<div *ngIf="loading" class="overlay justify-content-center align-items-center">
                  <i class="fa fa-refresh fa-spin fa-3x fa-fw"></i>
                  <span class="sr-only">Loading...</span>
             </div>`,
  // inline style with multiline string
  styles: [`.overlay { position: fixed;
                       display: flex;
                       top: 0;
                       left: 0;
                       width: 100%;
                       height: 100%;
                       z-index: 1050;
                       background-color: rgba(0, 0, 0, 0.3); }`]
})
export class NavigationLoadingOverlayComponent {

  // Sets initial value to true to show loading spinner on first load
  loading = true;

  constructor(private router: Router) {
    router.events.subscribe((event: Event) => {
      this.navigationInterceptor(event);
    });
  }


  // Shows and hides the loading spinner during RouterEvent changes
  navigationInterceptor(event: Event): void {
    // http://stackoverflow.com/questions/37069609/show-loading-screen-when-navigating-between-routes-in-angular-2
    if (event instanceof NavigationStart) {
      this.loading = true;
    }
    // do not forget cancel and error case!
    if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
      this.loading = false;
    }
    // the RoutesRecognized does nothing
  }
}
