import {BindingScope, injectable} from '@loopback/core';
import {
  repository
} from '@loopback/repository';
import {UserRepository} from '../repositories';


export type AgentInfo={
  name: string,
  address: {

  }
}
@injectable({scope: BindingScope.APPLICATION})
export class UserFacade {
  constructor(
    @repository(UserRepository)
    public userRepository : UserRepository,
  ) {}

  // async createUser({}): Promise<object>{
  //   // console.log('create agent logic follows...');
  //   // return {success: true};

  //   return {};

  // }
}
