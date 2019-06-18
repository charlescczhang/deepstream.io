export * from '../binary-protocol/src/message-constants'

export enum LOG_LEVEL {
    DEBUG = 0,
    INFO = 1,
    WARN = 2,
    ERROR = 3,
    OFF = 100
}

export const enum STATES {
    STOPPED = 'STOPPED',
    LOGGER_INIT = 'LOGGER_INIT',
    PLUGIN_INIT = 'PLUGIN_INIT',
    SERVICE_INIT = 'SERVICE_INIT',
    CONNECTION_ENDPOINT_INIT = 'CONNECTION_ENDPOINT_INIT',
    RUNNING = 'RUNNING',
    CONNECTION_ENDPOINT_SHUTDOWN = 'CONNECTION_ENDPOINT_SHUTDOWN',
    SERVICE_SHUTDOWN = 'SERVICE_SHUTDOWN',
    PLUGIN_SHUTDOWN = 'PLUGIN_SHUTDOWN',
    LOGGER_SHUTDOWN = 'LOGGER_SHUTDOWN'
}
