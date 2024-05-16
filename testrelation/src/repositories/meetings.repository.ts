import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {TestrelationDataSource} from '../datasources';
import {Meetings, MeetingsRelations, Crisis} from '../models';
import {CrisisRepository} from './crisis.repository';

export class MeetingsRepository extends DefaultCrudRepository<
  Meetings,
  typeof Meetings.prototype.id,
  MeetingsRelations
> {

  public readonly crisis: BelongsToAccessor<Crisis, typeof Meetings.prototype.id>;

  constructor(
    @inject('datasources.testrelation') dataSource: TestrelationDataSource, @repository.getter('CrisisRepository') protected crisisRepositoryGetter: Getter<CrisisRepository>,
  ) {
    super(Meetings, dataSource);
    this.crisis = this.createBelongsToAccessorFor('crisis', crisisRepositoryGetter,);
    this.registerInclusionResolver('crisis', this.crisis.inclusionResolver);
  }
}
