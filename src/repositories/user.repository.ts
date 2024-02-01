import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasOneRepositoryFactory, repository} from '@loopback/repository';
import {LocalDataSource} from '../datasources';
import {User, UserRelations, UserRoleMapping} from '../models';
import {UserRoleMappingRepository} from './user-role-mapping.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {

  public readonly roleDetails: HasOneRepositoryFactory<UserRoleMapping, typeof UserRoleMapping.prototype.id>;

  constructor(
    @inject('datasources.local') dataSource: LocalDataSource,
    @repository.getter('UserRoleMappingRepository') roleRepositoryGetter: Getter<UserRoleMappingRepository>,
  ) {
    super(User, dataSource);

    this.roleDetails = this.createHasOneRepositoryFactoryFor('roleDetails', roleRepositoryGetter);

    this.registerInclusionResolver('roleDetails', this.roleDetails.inclusionResolver);

  }
}
