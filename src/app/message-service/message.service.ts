import { Message } from './message';
import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Subject } from 'rxjs/Rx';

@Injectable()
export class MessageService {


  readonly msg: Subject<Message> = new Subject<Message>();

  constructor(router: Router) {
    // TODO: das passt woanders besser hin
    router.events.subscribe(event => {
      console.log(event);
      // clear the message panel on "page change"
      if (event instanceof NavigationStart) {
        this.publish(Message.clear());
      }
    });
  }

  public publish(message: Message): void {
    this.msg.next(message);
  }

}

