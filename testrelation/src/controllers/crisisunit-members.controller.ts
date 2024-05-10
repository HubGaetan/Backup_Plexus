import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Crisisunit,
  Members,
} from '../models';
import {CrisisunitRepository} from '../repositories';

export class CrisisunitMembersController {
  constructor(
    @repository(CrisisunitRepository)
    public crisisunitRepository: CrisisunitRepository,
  ) { }

  @get('/crisisunits/{id}/members', {
    responses: {
      '200': {
        description: 'Members belonging to Crisisunit',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Members),
          },
        },
      },
    },
  })
  async getMembers(
    @param.path.number('id') id: typeof Crisisunit.prototype.crisisunit_id,
  ): Promise<Members> {
    return this.crisisunitRepository.members(id);
  }
}
