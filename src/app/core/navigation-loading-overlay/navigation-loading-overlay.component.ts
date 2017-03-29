import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

@Component({
  selector: 'poa-navigation-loading-overlay',
  // inline template with multiline string; backticks
  // Spinner in overlay with bootstrap 4 and font awesome
  // the background: rgba(0,0,0,0.5); prohibits inheritance of opacity to spinner
  template: `<div *ngIf="loading" class="modal-content modal-backdrop justify-content-center align-items-center w-100 h-100" 
                                  style="background: rgba(0,0,0,0.5);">
                  <i class="fa fa-spinner fa-spin fa-3x fa-fw text-white"></i>
                  <span class="sr-only">Loading...</span>
             </div>`,
})
export class NavigationLoadingOverlayComponent {

  loading = false;

  private counter = 0;

  constructor(router: Router) {
    router.events.subscribe((event: Event) => {
      this.navigationInterceptor(event);
    });
  }

  // Shows and hides the loading spinner during RouterEvent changes
  navigationInterceptor(event: Event): void {
    // http://stackoverflow.com/questions/37069609/show-loading-screen-when-navigating-between-routes-in-angular-2
    if (event instanceof NavigationStart) {
      // the counter is an indicator that we are between start and stop loading (counter > 0)
      this.counter++;
      // the loading should be set with a small time delay
      setTimeout(() => {
        // if counter === 0, there was a NavigationEnd event (etc) meanwhile -> do not show overlay
        if (this.counter > 0 && !this.loading) {
          this.loading = true;
        }
      }, 50);

      // Note: use "=>": it is a function expression! Not direct use of the checkAndSetLoading method.
      // setTimeout(() => this.checkAndSetLoading(), 100);
    }
    // do not forget cancel and error case!
    if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
      if (this.counter > 0) {
        this.counter--;
      }
      if (this.counter === 0 && this.loading) {
        this.loading = false;
      }
    }
    // the RoutesRecognized event does nothing
  }
}
