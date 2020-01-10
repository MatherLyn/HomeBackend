import { getModelForClass, prop } from '@hasezoey/typegoose'

export class User {
  @prop()
  username: string
  @prop()
  password: string
  @prop()
  email: string
  @prop()
  birthday: string
}

export const UserModel = getModelForClass(User)