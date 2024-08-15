export const jwtConstants = {
  secret:
    'DO NOT USE THIS VALUE. INSTEAD, CREATE A COMPLEX SECRET AND KEEP IT SAFE OUTSIDE OF THE SOURCE CODE.',
};

export enum Expires {
  ONE_DAY = '1d',
  SEVEN_DAY = '7d',
}

export enum LoginMessage {
  PASS_WORD_INCORRECT = 'Mật khẩu không đúng',
  ACCOUT_INCORRECT = 'Tên tài khoản không đúng',
}

export interface IUser {
  id: number;
  nickname: string;
  password: string;
  email: string;
  role: number;
}

export interface IResponseLogin {
  access_token: string;
  refresh_token: string;
}

export interface IPayloadCreateToken {
  email: string;
  userId: number;
}
