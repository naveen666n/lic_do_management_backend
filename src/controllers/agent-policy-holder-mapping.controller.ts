import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {AgentPolicyHolderMapping} from '../models';
import {AgentPolicyHolderMappingRepository} from '../repositories';

export class AgentPolicyHolderMappingController {
  constructor(
    @repository(AgentPolicyHolderMappingRepository)
    public agentPolicyHolderMappingRepository : AgentPolicyHolderMappingRepository,
  ) {}

  @post('/agent-policy-holder-mappings')
  @response(200, {
    description: 'AgentPolicyHolderMapping model instance',
    content: {'application/json': {schema: getModelSchemaRef(AgentPolicyHolderMapping)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AgentPolicyHolderMapping, {
            title: 'NewAgentPolicyHolderMapping',
            exclude: ['id'],
          }),
        },
      },
    })
    agentPolicyHolderMapping: Omit<AgentPolicyHolderMapping, 'id'>,
  ): Promise<AgentPolicyHolderMapping> {
    return this.agentPolicyHolderMappingRepository.create(agentPolicyHolderMapping);
  }

  @get('/agent-policy-holder-mappings/count')
  @response(200, {
    description: 'AgentPolicyHolderMapping model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(AgentPolicyHolderMapping) where?: Where<AgentPolicyHolderMapping>,
  ): Promise<Count> {
    return this.agentPolicyHolderMappingRepository.count(where);
  }

  @get('/agent-policy-holder-mappings')
  @response(200, {
    description: 'Array of AgentPolicyHolderMapping model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(AgentPolicyHolderMapping, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(AgentPolicyHolderMapping) filter?: Filter<AgentPolicyHolderMapping>,
  ): Promise<AgentPolicyHolderMapping[]> {
    return this.agentPolicyHolderMappingRepository.find(filter);
  }

  @patch('/agent-policy-holder-mappings')
  @response(200, {
    description: 'AgentPolicyHolderMapping PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AgentPolicyHolderMapping, {partial: true}),
        },
      },
    })
    agentPolicyHolderMapping: AgentPolicyHolderMapping,
    @param.where(AgentPolicyHolderMapping) where?: Where<AgentPolicyHolderMapping>,
  ): Promise<Count> {
    return this.agentPolicyHolderMappingRepository.updateAll(agentPolicyHolderMapping, where);
  }

  @get('/agent-policy-holder-mappings/{id}')
  @response(200, {
    description: 'AgentPolicyHolderMapping model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(AgentPolicyHolderMapping, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(AgentPolicyHolderMapping, {exclude: 'where'}) filter?: FilterExcludingWhere<AgentPolicyHolderMapping>
  ): Promise<AgentPolicyHolderMapping> {
    return this.agentPolicyHolderMappingRepository.findById(id, filter);
  }

  @patch('/agent-policy-holder-mappings/{id}')
  @response(204, {
    description: 'AgentPolicyHolderMapping PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AgentPolicyHolderMapping, {partial: true}),
        },
      },
    })
    agentPolicyHolderMapping: AgentPolicyHolderMapping,
  ): Promise<void> {
    await this.agentPolicyHolderMappingRepository.updateById(id, agentPolicyHolderMapping);
  }

  @put('/agent-policy-holder-mappings/{id}')
  @response(204, {
    description: 'AgentPolicyHolderMapping PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() agentPolicyHolderMapping: AgentPolicyHolderMapping,
  ): Promise<void> {
    await this.agentPolicyHolderMappingRepository.replaceById(id, agentPolicyHolderMapping);
  }

  @del('/agent-policy-holder-mappings/{id}')
  @response(204, {
    description: 'AgentPolicyHolderMapping DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.agentPolicyHolderMappingRepository.deleteById(id);
  }
}
