import {Entity, belongsTo, model, property} from '@loopback/repository';
import {User} from './user.model';
@model({settings: {strict: true}})
export class AgentPolicyHolderMapping extends Entity {
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
    default: new Date(),
  })
  createdDate: string;

  @property({
    type: 'date',
    required: false,
    default: new Date(),
  })
  lastModifiedDate: string;

  @belongsTo(() => User, {
    name: 'agent',
    keyFrom: 'agentId',
    keyTo: 'id',
  })
  agentId: number;

  @belongsTo(() => User, {
    name: 'policyHolder',
    keyFrom: 'policyHolderId',
    keyTo: 'id',
  })
  policyHolderId: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<AgentPolicyHolderMapping>) {
    super(data);
  }
}

export interface AgentPolicyHolderMappingRelations {
  // describe navigational properties here
}

export type AgentPolicyHolderMappingWithRelations = AgentPolicyHolderMapping &
  AgentPolicyHolderMappingRelations;
