import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {TestrelationDataSource} from '../datasources';
import {Crisis, CrisisRelations, Crisisunit, Incidentbook, Meetings} from '../models';
import {CrisisunitRepository} from './crisisunit.repository';
import {IncidentbookRepository} from './incidentbook.repository';
import {MeetingsRepository} from './meetings.repository';

export class CrisisRepository extends DefaultCrudRepository<
  Crisis,
  typeof Crisis.prototype.crisis_id,
  CrisisRelations
> {

  public readonly crisisunits: HasManyRepositoryFactory<Crisisunit, typeof Crisis.prototype.crisis_id>;

  public readonly incidentbooks: HasManyRepositoryFactory<Incidentbook, typeof Crisis.prototype.crisis_id>;

  public readonly meetings: HasManyRepositoryFactory<Meetings, typeof Crisis.prototype.crisis_id>;

  constructor(
    @inject('datasources.testrelation') dataSource: TestrelationDataSource, @repository.getter('CrisisunitRepository') protected crisisunitRepositoryGetter: Getter<CrisisunitRepository>, @repository.getter('IncidentbookRepository') protected incidentbookRepositoryGetter: Getter<IncidentbookRepository>, @repository.getter('MeetingsRepository') protected meetingsRepositoryGetter: Getter<MeetingsRepository>,
  ) {
    super(Crisis, dataSource);
    this.meetings = this.createHasManyRepositoryFactoryFor('meetings', meetingsRepositoryGetter,);
    this.registerInclusionResolver('meetings', this.meetings.inclusionResolver);
    this.incidentbooks = this.createHasManyRepositoryFactoryFor('incidentbooks', incidentbookRepositoryGetter,);
    this.registerInclusionResolver('incidentbooks', this.incidentbooks.inclusionResolver);
    this.crisisunits = this.createHasManyRepositoryFactoryFor('crisisunits', crisisunitRepositoryGetter,);
    this.registerInclusionResolver('crisisunits', this.crisisunits.inclusionResolver);
  }
}
