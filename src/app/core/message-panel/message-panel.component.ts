import { Message, MessageType } from '../message/message';
import { MessageService } from '../message/message.service';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
;
@Component({
  selector: 'poa-messages',
  templateUrl: './message-panel.component.html'
})
export class MessagePanelComponent implements OnDestroy {


  // Template can only access elements from the component. Access to other elements is not possible.
  // Therefore we have to add a property in order to access the enum:
  // TODO: document access to global namespace
  public readonly messageType = MessageType;

  public messages: Message[] = [];

  private subscription: Subscription;

  constructor(messageService: MessageService) {
    this.subscription = messageService.subscribe(m => this.addMessage(m));
  }

  private addMessage(message: Message): void {
    if (message.type === MessageType.CLEAR) {
      this.messages = [];
    } else {
      this.messages.push(message);
    }
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

