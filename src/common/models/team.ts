import {Player} from './player';

export interface Teams {
  id: number;
  name: string;
  createdAt: Date;
  players: Player[]
}
