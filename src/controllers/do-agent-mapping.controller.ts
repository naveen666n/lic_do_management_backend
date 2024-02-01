import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {DoAgentMappings} from '../models';
import {DoAgentMappingRepository} from '../repositories';

export class DoAgentMappingController {
  constructor(
    @repository(DoAgentMappingRepository)
    public doAgentMappingRepository : DoAgentMappingRepository,
  ) {}

  @post('/do-agent-mappings')
  @response(200, {
    description: 'DoAgentMapping model instance',
    content: {'application/json': {schema: getModelSchemaRef(DoAgentMappings)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DoAgentMappings, {
            title: 'NewDoAgentMapping',
            exclude: ['id'],
          }),
        },
      },
    })
    doAgentMapping: Omit<DoAgentMappings, 'id'>,
  ): Promise<DoAgentMappings> {
    return this.doAgentMappingRepository.create(doAgentMapping);
  }

  @get('/do-agent-mappings/count')
  @response(200, {
    description: 'DoAgentMapping model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(DoAgentMappings) where?: Where<DoAgentMappings>,
  ): Promise<Count> {
    return this.doAgentMappingRepository.count(where);
  }

  @get('/do-agent-mappings')
  @response(200, {
    description: 'Array of DoAgentMapping model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(DoAgentMappings, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(DoAgentMappings) filter?: Filter<DoAgentMappings>,
  ): Promise<DoAgentMappings[]> {
    return this.doAgentMappingRepository.find(filter);
  }

  @patch('/do-agent-mappings')
  @response(200, {
    description: 'DoAgentMapping PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DoAgentMappings, {partial: true}),
        },
      },
    })
    doAgentMapping: DoAgentMappings,
    @param.where(DoAgentMappings) where?: Where<DoAgentMappings>,
  ): Promise<Count> {
    return this.doAgentMappingRepository.updateAll(doAgentMapping, where);
  }

  @get('/do-agent-mappings/{id}')
  @response(200, {
    description: 'DoAgentMapping model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(DoAgentMappings, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(DoAgentMappings, {exclude: 'where'}) filter?: FilterExcludingWhere<DoAgentMappings>
  ): Promise<DoAgentMappings> {
    return this.doAgentMappingRepository.findById(id, filter);
  }

  @patch('/do-agent-mappings/{id}')
  @response(204, {
    description: 'DoAgentMapping PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DoAgentMappings, {partial: true}),
        },
      },
    })
    doAgentMapping: DoAgentMappings,
  ): Promise<void> {
    await this.doAgentMappingRepository.updateById(id, doAgentMapping);
  }

  @put('/do-agent-mappings/{id}')
  @response(204, {
    description: 'DoAgentMapping PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() doAgentMapping: DoAgentMappings,
  ): Promise<void> {
    await this.doAgentMappingRepository.replaceById(id, doAgentMapping);
  }

  @del('/do-agent-mappings/{id}')
  @response(204, {
    description: 'DoAgentMapping DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.doAgentMappingRepository.deleteById(id);
  }
}
