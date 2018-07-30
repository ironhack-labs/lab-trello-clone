import { List } from '../models/list.model';
import { Card } from '../models/card.model';

export interface IronTrelloGenericResponse {
    message: string;
    error?: string;
    list?: List;
    card?: Card;
}