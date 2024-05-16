import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Meetings,
  Crisis,
} from '../models';
import {MeetingsRepository} from '../repositories';

export class MeetingsCrisisController {
  constructor(
    @repository(MeetingsRepository)
    public meetingsRepository: MeetingsRepository,
  ) { }

  @get('/meetings/{id}/crisis', {
    responses: {
      '200': {
        description: 'Crisis belonging to Meetings',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Crisis),
          },
        },
      },
    },
  })
  async getCrisis(
    @param.path.number('id') id: typeof Meetings.prototype.id,
  ): Promise<Crisis> {
    return this.meetingsRepository.crisis(id);
  }
}
