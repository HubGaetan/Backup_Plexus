import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {TestrelationDataSource} from '../datasources';
import {Crisisunit, CrisisunitRelations, Members, Crisis} from '../models';
import {MembersRepository} from './members.repository';
import {CrisisRepository} from './crisis.repository';

export class CrisisunitRepository extends DefaultCrudRepository<
  Crisisunit,
  typeof Crisisunit.prototype.crisisunit_id,
  CrisisunitRelations
> {

  public readonly members: BelongsToAccessor<Members, typeof Crisisunit.prototype.crisisunit_id>;

  public readonly crisis: BelongsToAccessor<Crisis, typeof Crisisunit.prototype.crisisunit_id>;

  constructor(
    @inject('datasources.testrelation') dataSource: TestrelationDataSource, @repository.getter('MembersRepository') protected membersRepositoryGetter: Getter<MembersRepository>, @repository.getter('CrisisRepository') protected crisisRepositoryGetter: Getter<CrisisRepository>,
  ) {
    super(Crisisunit, dataSource);
    this.crisis = this.createBelongsToAccessorFor('crisis', crisisRepositoryGetter,);
    this.registerInclusionResolver('crisis', this.crisis.inclusionResolver);
    this.members = this.createBelongsToAccessorFor('members', membersRepositoryGetter,);
    this.registerInclusionResolver('members', this.members.inclusionResolver);
  }
}
