import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {LocalDataSource} from '../datasources';
import {AgentPolicyHolderMapping, AgentPolicyHolderMappingRelations, User} from '../models';
import {UserRepository} from './user.repository';

export class AgentPolicyHolderMappingRepository extends DefaultCrudRepository<
  AgentPolicyHolderMapping,
  typeof AgentPolicyHolderMapping.prototype.id,
  AgentPolicyHolderMappingRelations
> {
  public readonly agent: BelongsToAccessor<User, typeof AgentPolicyHolderMapping.prototype.id>;
  public readonly policyHolder: BelongsToAccessor<User, typeof AgentPolicyHolderMapping.prototype.id>;
  constructor(
    @inject('datasources.local') dataSource: LocalDataSource,
    @repository.getter('UserRepository') agentRepositoryGetter: Getter<UserRepository>,
    @repository.getter('UserRepository') policyHolderRepositoryGetter: Getter<UserRepository>
  ) {
    super(AgentPolicyHolderMapping, dataSource);

    this.agent = this.createBelongsToAccessorFor('agent', agentRepositoryGetter);
    this.policyHolder = this.createBelongsToAccessorFor('policyHolder', policyHolderRepositoryGetter);

    this.registerInclusionResolver('agent', this.agent.inclusionResolver);
    this.registerInclusionResolver('policyHolder', this.policyHolder.inclusionResolver);
  }
}
