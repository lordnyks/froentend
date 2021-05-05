import { IProfile } from './IProfile';

export interface IUser {
  id?: number;
  email?: string;

  profile?: IProfile;

}
