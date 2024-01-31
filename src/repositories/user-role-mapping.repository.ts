import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {LocalDataSource} from '../datasources';
import {UserRoleMapping, UserRoleMappingRelations} from '../models';

export class UserRoleMappingRepository extends DefaultCrudRepository<
  UserRoleMapping,
  typeof UserRoleMapping.prototype.id,
  UserRoleMappingRelations
> {
  constructor(
    @inject('datasources.local') dataSource: LocalDataSource,
  ) {
    super(UserRoleMapping, dataSource);
  }
}
