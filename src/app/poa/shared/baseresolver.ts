import {Message} from '../../core/message/message';
import {MessageService} from '../../core/message/message.service';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Rx';

export abstract class BaseResolver<T> implements Resolve<T> {

  constructor(private messageService: MessageService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<T> {
    // add a default error handling, would be nice as a interceptor or aspect
    return this.doResolve(route, state)
      .catch((error: any) => {
        this.messageService.publish(Message.error('Error: ' + error));
        // provides a null value for the client:
        // return Observable.of(null);
        // with function, otherwise we get a compilation error: Type 'Observable<{} | T>' is not assignable to type 'Observable<T>'
        return this.doCatch(error);
      });
  }

  private doCatch(error: any): Observable<T> {
    // re-throwing the error prevents the router from entering the new state
    throw error;
  }
  abstract doResolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<T>;
}
