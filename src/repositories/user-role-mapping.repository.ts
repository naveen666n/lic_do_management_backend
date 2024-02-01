import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {LocalDataSource} from '../datasources';
import {Role, User, UserRoleMapping, UserRoleMappingRelations} from '../models';
import {RoleRepository} from './role.repository';
import {UserRepository} from './user.repository';

export class UserRoleMappingRepository extends DefaultCrudRepository<
  UserRoleMapping,
  typeof UserRoleMapping.prototype.id,
  UserRoleMappingRelations
> {

  public readonly appUser: BelongsToAccessor<User, typeof UserRoleMapping.prototype.id>;
  public readonly appRole: BelongsToAccessor<Role, typeof UserRoleMapping.prototype.id>;
  constructor(
    @inject('datasources.local') dataSource: LocalDataSource,
    @repository.getter('UserRepository') appUserRepositoryGetter: Getter<UserRepository>,
    @repository.getter('RoleRepository') appRoleRepositoryGetter: Getter<RoleRepository>
  ) {
    super(UserRoleMapping, dataSource);

    this.appUser = this.createBelongsToAccessorFor('appUser', appUserRepositoryGetter);
    this.appRole = this.createBelongsToAccessorFor('appRole', appRoleRepositoryGetter);

    this.registerInclusionResolver('appUser', this.appUser.inclusionResolver);
    this.registerInclusionResolver('appRole', this.appRole.inclusionResolver);

  }
}
