import {User} from '../../common/models/user';

export interface AuthResponse {
  token?: string;
  users: User[];
}
