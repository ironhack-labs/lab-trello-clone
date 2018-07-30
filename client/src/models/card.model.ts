import { List } from './list.model';

export class Card {
    _id: string;
    title: string;
    description: string;
    position: number;
    dueDate: Date;
    list: string;
    created_at: Date;
    updated_at: Date;

    constructor(rawObj) {
        Object.assign(this, rawObj);
    }

    setList(id) {
        this.list = id;
    }
}