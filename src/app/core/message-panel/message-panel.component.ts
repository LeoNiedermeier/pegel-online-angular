import { Message, MessageType } from '../message/message';
import { MessageService } from '../message/message.service';
import { Component } from '@angular/core';

@Component({
  selector: 'poa-messages',
  templateUrl: './message-panel.component.html'
})
export class MessagePanelComponent {

  // Template can only access elements from the component. Access to other elements is not possible.
  // Therefore we have to add a property in order to access the enum:
  public readonly messageType = MessageType;

  public messages: Message[] = [];

  constructor(messageService: MessageService) {
    messageService.subscribe(m => this.addMessage(m));
  }

  private addMessage(message: Message): void {
    if (message.type === MessageType.CLEAR) {
      this.messages = [];
    } else {
      this.messages.push(message);
    }
  }
}

