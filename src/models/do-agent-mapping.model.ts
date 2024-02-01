import {Entity, belongsTo, model, property} from '@loopback/repository';
import {User} from './user.model';
@model({settings: {strict: true}})
export class DoAgentMappings extends Entity {

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

  @belongsTo(
    () => User,
    {
      name: 'do',
      keyFrom: 'doId',
      keyTo: 'id'
    }
  )
  doId: number;

  @belongsTo(
    () => User,
    {
      name: 'agent',
      keyFrom: 'agentId',
      keyTo: 'id'
    }
  )
  agentId: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<DoAgentMappings>) {
    super(data);
  }
}

export interface DoAgentMappingsRelations {
  // describe navigational properties here
}

export type DoAgentMappingsWithRelations = DoAgentMappings & DoAgentMappingsRelations;
