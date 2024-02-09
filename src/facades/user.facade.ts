import {BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import _ from 'underscore';
import {User} from '../models/user.model';
import {
  AgentPolicyHolderMappingRepository,
  DoAgentMappingRepository,
  UserRepository,
  UserRoleMappingRepository,
} from '../repositories';
import {RestError} from '../utils/rest-error';
export type UserObject = {
  toBeCreatedUserRoleId: number;
  doUserId?: number;
  agentId?: number;
  userInfo: User;
};

export enum RoleIdMapper {
  do = 1,
  agent = 2,
  policyHolder = 3,
}

@injectable({scope: BindingScope.APPLICATION})
export class UserFacade {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
    @repository(UserRoleMappingRepository)
    public userRoleMappingRepository: UserRoleMappingRepository,
    @repository(DoAgentMappingRepository)
    public doAgentMappingRepository: DoAgentMappingRepository,
    @repository(AgentPolicyHolderMappingRepository)
    public agentPolicyHolderMappingRepository: AgentPolicyHolderMappingRepository,
  ) {}

  async createUser(userObject: UserObject): Promise<any> {
    // console.log('create agent logic follows...');
    // return {success: true};
    try {
      const doUserId = userObject.doUserId ?? 1;

      const toBeCreatedUserRoleId = userObject.toBeCreatedUserRoleId;

      if (!toBeCreatedUserRoleId) {
        // throw new Error('Invalid RoleId');
        return new RestError(491, 'Role id is required');
      }

      if (toBeCreatedUserRoleId === RoleIdMapper.do) {
        // throw new Error('Invalid RoleId');
        return new RestError(491, "You can't add DO");
      }

      if (toBeCreatedUserRoleId === RoleIdMapper.policyHolder) {
        if (!userObject.agentId) {
          return new RestError(491, 'Agent can\t be empty for policyHolder');
        }
      }

      const doDetails = await this.userRepository.findById(doUserId, {
        include: [{relation: 'roleDetails'}],
      });

      const user: User = await this.userRepository.create(userObject.userInfo);

      if (toBeCreatedUserRoleId === RoleIdMapper.agent) {
        await this.userRoleMappingRepository.create({
          appUserId: user.id,
          appRoleId: RoleIdMapper.agent,
        });
        await this.doAgentMappingRepository.create({
          agentId: user.id,
          doId: doUserId,
        });
      }

      if (toBeCreatedUserRoleId === RoleIdMapper.policyHolder) {
        await this.userRoleMappingRepository.create({
          appUserId: user.id,
          appRoleId: RoleIdMapper.policyHolder,
        });
        await this.agentPolicyHolderMappingRepository.create({
          agentId: userObject.agentId,
          policyHolderId: user.id,
        });
      }

      return {success: true};
    } catch (error) {
      console.log(error, '::error');
      throw new Error(error);
    }
  }

  async convertProspectToConfirmed(userId: number): Promise<any> {
    // console.log('create agent logic follows...');
    // return {success: true};
    try {
      const user = await this.userRepository.findById(userId);
      if (!user) {
        return new RestError(491, 'user not found');
      }

      await this.userRepository.updateById(userId, {isProspect: false});
      return {success: true};
    } catch (error) {
      console.log(error, '::error');
      throw new Error(error);
    }
  }

  async getDataForDo(userId: number, contextFilter: any = {}): Promise<any> {
    // console.log('create agent logic follows...');
    // return {success: true};
    try {
      // const user = await this.userRepository.findById(userId);

      if (!userId) {
        return new RestError(491, 'user not found');
      }
      const userDetails = await this.userRepository.findById(userId, {
        include: [{relation: 'roleDetails'}],
      });
      contextFilter.orderByColumn = contextFilter.orderByColumn ?? 'id';
      contextFilter.isProspect = contextFilter.isProspect ?? true;
      contextFilter.skip = contextFilter.skip ?? 0;
      contextFilter.limit = contextFilter.limit ?? 10;
      contextFilter.sort = contextFilter.sort ?? 'DESC';

      contextFilter.isAgentList = contextFilter.isAgentList ?? true;

      const order = [`${contextFilter.orderByColumn} ${contextFilter.sort}`];
      contextFilter.order = order;

      if (
        userDetails.roleDetails &&
        userDetails.roleDetails.appRoleId === RoleIdMapper.do
      ) {
        if (contextFilter.isAgentList) {
          return await this.fetchAgentsForDo(userId, contextFilter);
        } else {
          const agentsInfo = await this.fetchAgentsForDo(userId, contextFilter);

          const agentIds = _.pluck(agentsInfo, 'id');

          const agentPolicyHolderMappings =
            await this.agentPolicyHolderMappingRepository.find({
              where: {
                agentid: {inq: agentIds},
                isProspect: contextFilter.isProspect,
              },
              include: [
                {
                  relation: 'policyHolder',
                  scope: {
                    where: {
                      isProspect: contextFilter.isProspect,
                    },
                    limit: contextFilter.limit,
                    skip: contextFilter.skip,
                    order,
                  },
                },
              ],
            });
          const policyHoldersInfo = _.filter(
            _.pluck(agentPolicyHolderMappings, 'policyHolder'),
            item => {
              // if (typeof item === 'object') {
              if (item) {
                return item;
              }
            },
          );
          return policyHoldersInfo;
        }
      }

      // await this.userRepository.updateById(userId, {isProspect: false});
      return new RestError(491, 'Invalid Role');
    } catch (error) {
      console.log(error, '::error');
      throw new Error(error);
    }
  }
  async fetchAgentsForDo(
    userId: number,
    contextFilter: any = {},
  ): Promise<any> {
    try {
      const doAgentMappings = await this.doAgentMappingRepository.find({
        where: {doId: userId, isProspect: contextFilter.isProspect},
        include: [
          {
            relation: 'agent',
            scope: {
              where: {
                isProspect: contextFilter.isProspect,
              },
              limit: contextFilter.limit,
              skip: contextFilter.skip,
              order: contextFilter.order,
            },
          },
        ],
      });
      const agentInfo = _.filter(_.pluck(doAgentMappings, 'agent'), item => {
        // if (typeof item === 'object') {
        if (item) {
          return item;
        }
      });
      return agentInfo;
    } catch (error) {
      console.log(error, '::error');
      throw new Error(error);
    }
  }
}
