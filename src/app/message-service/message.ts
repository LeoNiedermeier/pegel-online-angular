
/**
 * Class encapsulates a text as message and has a message type
 */
export class Message {

  /**
   * Creates a Message of type ERROR.
   */
  static error(text: String): Message {
    return new Message(MessageType.ERROR, text);
  }

  /**
   * Creates a Message of type ERROR.
   */
  static info(text: String): Message {
    return new Message(MessageType.INFO, text);
  }

  /**
   * Creates a Message of type CLEAR.
   */
  static clear(): Message {
    return new Message(MessageType.CLEAR, '');
  }

  constructor(public type: MessageType, public text: String) {
  }
}

export enum MessageType {
  INFO,
  ERROR,

  /**
   * Indicates that the message queue should be cleared.
   */
  CLEAR
}
