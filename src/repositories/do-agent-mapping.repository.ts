import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {LocalDataSource} from '../datasources';
import {DoAgentMappings, DoAgentMappingsRelations, User} from '../models';
// import {RoleRepository} from './role.repository';
import {UserRepository} from './user.repository';

export class DoAgentMappingRepository extends DefaultCrudRepository<
  DoAgentMappings,
  typeof DoAgentMappings.prototype.id,
  DoAgentMappingsRelations
> {

  public readonly agent: BelongsToAccessor<User, typeof DoAgentMappings.prototype.id>;
  public readonly do: BelongsToAccessor<User, typeof DoAgentMappings.prototype.id>;
  constructor(
    @inject('datasources.local') dataSource: LocalDataSource,
    @repository.getter('UserRepository') agentRepositoryGetter: Getter<UserRepository>,
    @repository.getter('UserRepository') doRepositoryGetter: Getter<UserRepository>
  ) {
    super(DoAgentMappings, dataSource);

    this.agent = this.createBelongsToAccessorFor('agent', agentRepositoryGetter);
    this.do = this.createBelongsToAccessorFor('do', doRepositoryGetter);

    this.registerInclusionResolver('agent', this.agent.inclusionResolver);
    this.registerInclusionResolver('do', this.do.inclusionResolver);
  }
}
