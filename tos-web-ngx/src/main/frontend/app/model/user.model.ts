
export class UserModel
{
  constructor(
      public userID: number,

      public username: string,

      public userPwd: string,

      public userEnabled: boolean,

      public userLastLogin: Date,

      public userIsAdmin: boolean,
    ) { }
}