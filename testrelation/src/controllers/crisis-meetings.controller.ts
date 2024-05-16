import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Crisis,
  Meetings,
} from '../models';
import {CrisisRepository} from '../repositories';

export class CrisisMeetingsController {
  constructor(
    @repository(CrisisRepository) protected crisisRepository: CrisisRepository,
  ) { }

  @get('/crises/{id}/meetings', {
    responses: {
      '200': {
        description: 'Array of Crisis has many Meetings',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Meetings)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Meetings>,
  ): Promise<Meetings[]> {
    return this.crisisRepository.meetings(id).find(filter);
  }

  @post('/crises/{id}/meetings', {
    responses: {
      '200': {
        description: 'Crisis model instance',
        content: {'application/json': {schema: getModelSchemaRef(Meetings)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Crisis.prototype.crisis_id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Meetings, {
            title: 'NewMeetingsInCrisis',
            exclude: ['id'],
            optional: ['crisisId']
          }),
        },
      },
    }) meetings: Omit<Meetings, 'id'>,
  ): Promise<Meetings> {
    return this.crisisRepository.meetings(id).create(meetings);
  }

  @patch('/crises/{id}/meetings', {
    responses: {
      '200': {
        description: 'Crisis.Meetings PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Meetings, {partial: true}),
        },
      },
    })
    meetings: Partial<Meetings>,
    @param.query.object('where', getWhereSchemaFor(Meetings)) where?: Where<Meetings>,
  ): Promise<Count> {
    return this.crisisRepository.meetings(id).patch(meetings, where);
  }

  @del('/crises/{id}/meetings', {
    responses: {
      '200': {
        description: 'Crisis.Meetings DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Meetings)) where?: Where<Meetings>,
  ): Promise<Count> {
    return this.crisisRepository.meetings(id).delete(where);
  }
}
