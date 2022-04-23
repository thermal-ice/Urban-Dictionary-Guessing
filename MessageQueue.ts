import {DefinitionObject} from "./UrbanDictionary/DefinitionObject";

class MessageQueue {
    private _queue: Array<DefinitionObject>;

    constructor() {
        this._queue = [];
    }

    queueIsEmpty(){
        return this._queue.length == 0;
    }

    addAllToQueue(elems: Array<DefinitionObject>){
        this._queue.push(... elems);
    }

    popFirst(){
        return this._queue.shift();
    }

    getQueue(){
        return this._queue;
    }

}

export {MessageQueue};