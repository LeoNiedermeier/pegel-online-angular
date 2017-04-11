import { Message } from './message';
import { Injectable, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs/Rx';

@Injectable()
export class MessageService implements OnDestroy {


  private readonly messageSubject: Subject<Message> = new Subject<Message>();

  constructor() {
  }

  public publish(message: Message): void {
    this.messageSubject.next(message);
  }

  public subscribe(next?: (value: Message) => void, error?: (error: any) => void, complete?: () => void): Subscription {
    // Currently just delegates to the subject.
    return this.messageSubject.subscribe(next, error, complete);
  }

  ngOnDestroy(): void {
    this.messageSubject.complete();
  }
}

