export interface IUser {
  id?: string;
  fullName: string;
  email: string;
} 
export interface IAuthState {
  currentUser?: IUser;
}

function state(): IAuthState {
  return {
    currentUser: undefined
  };
}

export default state;
