import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Meetings} from '../models';
import {MeetingsRepository} from '../repositories';

export class MeetingsController {
  constructor(
    @repository(MeetingsRepository)
    public meetingsRepository : MeetingsRepository,
  ) {}

  @post('/meetings')
  @response(200, {
    description: 'Meetings model instance',
    content: {'application/json': {schema: getModelSchemaRef(Meetings)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Meetings, {
            title: 'NewMeetings',
            exclude: ['id'],
          }),
        },
      },
    })
    meetings: Omit<Meetings, 'id'>,
  ): Promise<Meetings> {
    return this.meetingsRepository.create(meetings);
  }

  @get('/meetings/count')
  @response(200, {
    description: 'Meetings model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Meetings) where?: Where<Meetings>,
  ): Promise<Count> {
    return this.meetingsRepository.count(where);
  }

  @get('/meetings')
  @response(200, {
    description: 'Array of Meetings model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Meetings, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Meetings) filter?: Filter<Meetings>,
  ): Promise<Meetings[]> {
    return this.meetingsRepository.find(filter);
  }

  @patch('/meetings')
  @response(200, {
    description: 'Meetings PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Meetings, {partial: true}),
        },
      },
    })
    meetings: Meetings,
    @param.where(Meetings) where?: Where<Meetings>,
  ): Promise<Count> {
    return this.meetingsRepository.updateAll(meetings, where);
  }

  @get('/meetings/{id}')
  @response(200, {
    description: 'Meetings model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Meetings, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Meetings, {exclude: 'where'}) filter?: FilterExcludingWhere<Meetings>
  ): Promise<Meetings> {
    return this.meetingsRepository.findById(id, filter);
  }

  @patch('/meetings/{id}')
  @response(204, {
    description: 'Meetings PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Meetings, {partial: true}),
        },
      },
    })
    meetings: Meetings,
  ): Promise<void> {
    await this.meetingsRepository.updateById(id, meetings);
  }

  @put('/meetings/{id}')
  @response(204, {
    description: 'Meetings PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() meetings: Meetings,
  ): Promise<void> {
    await this.meetingsRepository.replaceById(id, meetings);
  }

  @del('/meetings/{id}')
  @response(204, {
    description: 'Meetings DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.meetingsRepository.deleteById(id);
  }
}
