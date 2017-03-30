import { List } from '../../list/list.model';
import { Card } from '../../card/card.model';

export interface IronTrelloGenericResponse {
    message: string;
    error?: string;
    list?: List;
    card?: Card;
}
