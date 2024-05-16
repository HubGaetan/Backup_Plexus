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
  Crisis,
} from '../models';
import {IncidentbookRepository} from '../repositories';

export class IncidentbookCrisisController {
  constructor(
    @repository(IncidentbookRepository)
    public incidentbookRepository: IncidentbookRepository,
  ) { }

  @get('/incidentbooks/{id}/crisis', {
    responses: {
      '200': {
        description: 'Crisis belonging to Incidentbook',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Crisis),
          },
        },
      },
    },
  })
  async getCrisis(
    @param.path.number('id') id: typeof Incidentbook.prototype.id,
  ): Promise<Crisis> {
    return this.incidentbookRepository.crisis(id);
  }
}
