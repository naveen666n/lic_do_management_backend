import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: true}})
export class User extends Entity {

  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: false,
  })
  mobileNumber: string;

  @property({
    type: 'string',
    required: false,
  })
  email?: string;

  @property({
    type: 'string',
    required: true,
  })
  addressLine1: string;

  @property({
    type: 'string',
    required: true,
  })
  addressLine2: string;

  @property({
    type: 'date',
    required: false,
    default: new Date()
  })
  createdDate: string;


  @property({
    type: 'date',
    required: false,
    default:  new Date()
  })
  lastModifiedDate: string;



  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
