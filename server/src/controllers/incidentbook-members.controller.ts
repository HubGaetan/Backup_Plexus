import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Incidentbook,
  Members,
} from '../models';
import {IncidentbookRepository} from '../repositories';

export class IncidentbookMembersController {
  constructor(
    @repository(IncidentbookRepository)
    public incidentbookRepository: IncidentbookRepository,
  ) { }

  @get('/incidentbooks/{id}/members', {
    responses: {
      '200': {
        description: 'Members belonging to Incidentbook',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Members),
          },
        },
      },
    },
  })
  async getMembers(
    @param.path.number('id') id: typeof Incidentbook.prototype.id,
  ): Promise<Members> {
    return this.incidentbookRepository.members(id);
  }
}
