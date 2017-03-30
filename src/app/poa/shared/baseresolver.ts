import { Message } from '../../core/message/message';
import { MessageService } from '../../core/message/message.service';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';

export abstract class BaseResolver<T> implements Resolve<T> {

  constructor(private messageService: MessageService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<T> {
    // add a default error handling, would be nice as a interceptor or aspect
    return this.doResolve(route, state)
      .catch((error: any) => { this.messageService.publish(Message.error('Error: ' + error)); return Observable.of(null); });
  }

  abstract doResolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<T>;
}
