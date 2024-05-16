import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {TestrelationDataSource} from '../datasources';
import {Incidentbook, IncidentbookRelations, Members, Crisis} from '../models';
import {MembersRepository} from './members.repository';
import {CrisisRepository} from './crisis.repository';

export class IncidentbookRepository extends DefaultCrudRepository<
  Incidentbook,
  typeof Incidentbook.prototype.id,
  IncidentbookRelations
> {

  public readonly members: BelongsToAccessor<Members, typeof Incidentbook.prototype.id>;

  public readonly crisis: BelongsToAccessor<Crisis, typeof Incidentbook.prototype.id>;

  constructor(
    @inject('datasources.testrelation') dataSource: TestrelationDataSource, @repository.getter('MembersRepository') protected membersRepositoryGetter: Getter<MembersRepository>, @repository.getter('CrisisRepository') protected crisisRepositoryGetter: Getter<CrisisRepository>,
  ) {
    super(Incidentbook, dataSource);
    this.crisis = this.createBelongsToAccessorFor('crisis', crisisRepositoryGetter,);
    this.registerInclusionResolver('crisis', this.crisis.inclusionResolver);
    this.members = this.createBelongsToAccessorFor('members', membersRepositoryGetter,);
    this.registerInclusionResolver('members', this.members.inclusionResolver);
  }
}
