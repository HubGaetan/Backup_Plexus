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
  Crisis,
} from '../models';
import {CrisisunitRepository} from '../repositories';

export class CrisisunitCrisisController {
  constructor(
    @repository(CrisisunitRepository)
    public crisisunitRepository: CrisisunitRepository,
  ) { }

  @get('/crisisunits/{id}/crisis', {
    responses: {
      '200': {
        description: 'Crisis belonging to Crisisunit',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Crisis),
          },
        },
      },
    },
  })
  async getCrisis(
    @param.path.number('id') id: typeof Crisisunit.prototype.crisisunit_id,
  ): Promise<Crisis> {
    return this.crisisunitRepository.crisis(id);
  }
}
