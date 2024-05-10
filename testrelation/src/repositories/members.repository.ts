import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {TestrelationDataSource} from '../datasources';
import {Members, MembersRelations, Crisisunit, Incidentbook} from '../models';
import {CrisisunitRepository} from './crisisunit.repository';
import {IncidentbookRepository} from './incidentbook.repository';

export class MembersRepository extends DefaultCrudRepository<
  Members,
  typeof Members.prototype.member_id,
  MembersRelations
> {

  public readonly crisisunits: HasManyRepositoryFactory<Crisisunit, typeof Members.prototype.member_id>;

  public readonly incidentbooks: HasManyRepositoryFactory<Incidentbook, typeof Members.prototype.member_id>;

  constructor(
    @inject('datasources.testrelation') dataSource: TestrelationDataSource, @repository.getter('CrisisunitRepository') protected crisisunitRepositoryGetter: Getter<CrisisunitRepository>, @repository.getter('IncidentbookRepository') protected incidentbookRepositoryGetter: Getter<IncidentbookRepository>,
  ) {
    super(Members, dataSource);
    this.incidentbooks = this.createHasManyRepositoryFactoryFor('incidentbooks', incidentbookRepositoryGetter,);
    this.registerInclusionResolver('incidentbooks', this.incidentbooks.inclusionResolver);
    this.crisisunits = this.createHasManyRepositoryFactoryFor('crisisunits', crisisunitRepositoryGetter,);
    this.registerInclusionResolver('crisisunits', this.crisisunits.inclusionResolver);
  }
}
