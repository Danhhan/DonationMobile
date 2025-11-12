import EventEmitter from 'eventemitter3';

export const EXPIRED_TOKEN = 'EXPIRED_TOKEN';

const eventEmitter = new EventEmitter();

export default eventEmitter;
