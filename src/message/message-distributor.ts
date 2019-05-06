import {PARSER_ACTIONS, TOPIC} from '../constants'

/**
 * The MessageDistributor routes valid and permissioned messages to
 * various, previously registered handlers, e.g. event-, rpc- or recordHandler
 */
export default class MessageDistributor {
  private callbacks = new Map<TOPIC, Function>()

  // @ts-ignore
  constructor (private options: DeepstreamConfig, private services: DeepstreamServices) {}

  /**
   * Accepts a socketWrapper and a parsed message as input and distributes
   * it to its subscriber, based on the message's topic
   */
  public distribute (socketWrapper: SocketWrapper, message: Message) {
    const callback = this.callbacks.get(message.topic)
    if (callback === undefined) {
      this.services.logger.warn(PARSER_ACTIONS[PARSER_ACTIONS.UNKNOWN_TOPIC], TOPIC[message.topic])
      socketWrapper.sendMessage({
        topic: TOPIC.PARSER,
        action: PARSER_ACTIONS.UNKNOWN_TOPIC,
        originalTopic: message.topic
      })
      return
    }

    // TODO: Can we remove this? A general emit is quite expensive
    // socketWrapper.emit(message.topic, message)

    callback(socketWrapper, message)
  }

  /**
   * Allows handlers (event, rpc, record) to register for topics. Subscribes them
   * to both messages passed to the distribute method as well as messages received
   * from the messageConnector
   */
  public registerForTopic (topic: TOPIC, callback: Function) {
    if (this.callbacks.has(topic)) {
      throw new Error(`Callback already registered for topic ${topic}`)
    }

    this.callbacks.set(topic, callback)
    this.services.message.subscribe(
      topic,
      this.onMessageConnectorMessage.bind(this, callback),
    )
  }

  /**
   * Whenever a message from the messageConnector is received it is passed
   * to the relevant handler, but with SOURCE_MESSAGE_CONNECTOR instead of
   * a socketWrapper as sender
   */
  private onMessageConnectorMessage (callback: Function, message: Message, originServer: string) {
    // callback(SOURCE_MESSAGE_CONNECTOR, message, originServer)
  }
}