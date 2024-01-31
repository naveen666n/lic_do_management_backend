import {Entity, belongsTo, model, property} from '@loopback/repository';
import {Role} from './role.model';
import {User} from './user.model';
@model({settings: {strict: true}})
export class UserRoleMapping extends Entity {

  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;


  @property({
    type: 'string',
  })
  name?: string;

  @belongsTo(
    () => User,
    {
      name: 'appUser',
      keyFrom: 'appUserId',
      keyTo: 'id'
    }
  )
  appUserId: number;

  @belongsTo(
    () => Role,
    {
      name: 'appRole',
      keyFrom: 'appRoleId',
      keyTo: 'id'
    }
  )
  appRoleId: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<UserRoleMapping>) {
    super(data);
  }
}

export interface UserRoleMappingRelations {
  // describe navigational properties here
}

export type UserRoleMappingWithRelations = UserRoleMapping & UserRoleMappingRelations;
