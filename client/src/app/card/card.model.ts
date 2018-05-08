import { SortableItem } from './../shared/interfaces';
import { List } from './../list/list.model';

export class Card implements SortableItem {
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
