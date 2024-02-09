import {service} from '@loopback/core';
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
import {UserFacade, UserObject} from '../facades';
import {User} from '../models';
import {UserRepository} from '../repositories';

export class UserController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
    @service(UserFacade)
    public userFacade: UserFacade,
  ) {}

  @post('/users')
  @response(200, {
    description: 'User model instance',
    content: {'application/json': {schema: getModelSchemaRef(User)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {
            title: 'NewUser',
            exclude: ['id'],
          }),
        },
      },
    })
    user: Omit<User, 'id'>,
  ): Promise<User> {
    return this.userRepository.create(user);
  }

  @get('/users/count')
  @response(200, {
    description: 'User model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(User) where?: Where<User>): Promise<Count> {
    return this.userRepository.count(where);
  }

  @get('/users')
  @response(200, {
    description: 'Array of User model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(User, {includeRelations: true}),
        },
      },
    },
  })
  async find(@param.filter(User) filter?: Filter<User>): Promise<User[]> {
    return this.userRepository.find(filter);
  }

  @patch('/users')
  @response(200, {
    description: 'User PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {partial: true}),
        },
      },
    })
    user: User,
    @param.where(User) where?: Where<User>,
  ): Promise<Count> {
    // Use 'where' if needed or remove it if unnecessary.
    return this.userRepository.updateAll(user, where);
  }

  @get('/users/{id}')
  @response(200, {
    description: 'User model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(User, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(User, {exclude: 'where'}) filter?: FilterExcludingWhere<User>,
  ): Promise<User> {
    return this.userRepository.findById(id, filter);
  }

  @patch('/users/{id}')
  @response(204, {
    description: 'User PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {partial: true}),
        },
      },
    })
    user: User,
  ): Promise<void> {
    await this.userRepository.updateById(id, user);
  }

  @put('/users/{id}')
  @response(204, {
    description: 'User PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() user: User,
  ): Promise<void> {
    await this.userRepository.replaceById(id, user);
  }

  @del('/users/{id}')
  @response(204, {
    description: 'User DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.userRepository.deleteById(id);
  }

  @post('/createUser')
  @response(200, {
    description: 'User model instance',
    // content: {'application/json': {schema: getModelSchemaRef(User)}},
  })
  async createAgent(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              toBeCreatedUserRoleId: {
                type: 'number',
              },
              doUserId: {
                type: 'number',
              },
              agentId: {
                type: 'number',
              },
              userInfo: {
                type: 'object',
                properties: {
                  name: {
                    type: 'string',
                  },
                  mobileNumber: {
                    type: 'string',
                  },
                  email: {
                    type: 'string',
                  },
                  addressLine1: {
                    type: 'string',
                  },
                  addressLine2: {
                    type: 'string',
                  },
                  pinCode: {
                    type: 'string',
                  },
                  isProspect: {
                    type: 'boolean',
                  },
                  comments: {
                    type: 'string',
                  },
                },
              },
            },
          },
        },
      },
    })
    user: UserObject,
  ): Promise<object> {
    return this.userFacade.createUser(user);
  }

  @get('/users/{id}/convertProspectToConfirmed')
  @response(200, {
    description: 'User model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(User, {includeRelations: true}),
      },
    },
  })
  async convertProspectToConfirmed(
    @param.path.number('id') id: number,
  ): Promise<object> {
    return this.userFacade.convertProspectToConfirmed(id);
  }

  // @get('/users/{id}/getDataForDo')
  // @response(200, {
  //   description: 'User model instance',
  //   content: {
  //     'application/json': {
  //       schema: getModelSchemaRef(User, {includeRelations: true}),
  //     },
  //   },
  // })
  // async getDataForDo(@param.path.number('id') id: number): Promise<User> {
  //   return this.userFacade.getDataForDo(id);
  // }

  @get('//users/{id}/getDataForDo')
  @response(200, {
    description: 'Array of User model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(User, {includeRelations: true}),
        },
      },
    },
  })
  async(
    @param.path.number('id') id: number,
    @param.query.object('contextFilter') contextFilter?: object,
  ): Promise<User[]> {
    return this.userFacade.getDataForDo(id, contextFilter);
  }
}
