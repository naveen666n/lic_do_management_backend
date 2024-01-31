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
import {UserRoleMapping} from '../models';
import {UserRoleMappingRepository} from '../repositories';

export class UserRoleMappingController {
  constructor(
    @repository(UserRoleMappingRepository)
    public userRoleMappingRepository : UserRoleMappingRepository,
  ) {}

  @post('/user-role-mappings')
  @response(200, {
    description: 'UserRoleMapping model instance',
    content: {'application/json': {schema: getModelSchemaRef(UserRoleMapping)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserRoleMapping, {
            title: 'NewUserRoleMapping',
            exclude: ['id'],
          }),
        },
      },
    })
    userRoleMapping: Omit<UserRoleMapping, 'id'>,
  ): Promise<UserRoleMapping> {
    return this.userRoleMappingRepository.create(userRoleMapping);
  }

  @get('/user-role-mappings/count')
  @response(200, {
    description: 'UserRoleMapping model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(UserRoleMapping) where?: Where<UserRoleMapping>,
  ): Promise<Count> {
    return this.userRoleMappingRepository.count(where);
  }

  @get('/user-role-mappings')
  @response(200, {
    description: 'Array of UserRoleMapping model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(UserRoleMapping, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(UserRoleMapping) filter?: Filter<UserRoleMapping>,
  ): Promise<UserRoleMapping[]> {
    return this.userRoleMappingRepository.find(filter);
  }

  @patch('/user-role-mappings')
  @response(200, {
    description: 'UserRoleMapping PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserRoleMapping, {partial: true}),
        },
      },
    })
    userRoleMapping: UserRoleMapping,
    @param.where(UserRoleMapping) where?: Where<UserRoleMapping>,
  ): Promise<Count> {
    return this.userRoleMappingRepository.updateAll(userRoleMapping, where);
  }

  @get('/user-role-mappings/{id}')
  @response(200, {
    description: 'UserRoleMapping model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(UserRoleMapping, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(UserRoleMapping, {exclude: 'where'}) filter?: FilterExcludingWhere<UserRoleMapping>
  ): Promise<UserRoleMapping> {
    return this.userRoleMappingRepository.findById(id, filter);
  }

  @patch('/user-role-mappings/{id}')
  @response(204, {
    description: 'UserRoleMapping PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserRoleMapping, {partial: true}),
        },
      },
    })
    userRoleMapping: UserRoleMapping,
  ): Promise<void> {
    await this.userRoleMappingRepository.updateById(id, userRoleMapping);
  }

  @put('/user-role-mappings/{id}')
  @response(204, {
    description: 'UserRoleMapping PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() userRoleMapping: UserRoleMapping,
  ): Promise<void> {
    await this.userRoleMappingRepository.replaceById(id, userRoleMapping);
  }

  @del('/user-role-mappings/{id}')
  @response(204, {
    description: 'UserRoleMapping DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.userRoleMappingRepository.deleteById(id);
  }
}
