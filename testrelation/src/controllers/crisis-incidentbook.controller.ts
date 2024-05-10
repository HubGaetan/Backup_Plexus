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
  Incidentbook,
} from '../models';
import {CrisisRepository} from '../repositories';

export class CrisisIncidentbookController {
  constructor(
    @repository(CrisisRepository) protected crisisRepository: CrisisRepository,
  ) { }

  @get('/crises/{id}/incidentbooks', {
    responses: {
      '200': {
        description: 'Array of Crisis has many Incidentbook',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Incidentbook)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Incidentbook>,
  ): Promise<Incidentbook[]> {
    return this.crisisRepository.incidentbooks(id).find(filter);
  }

  @post('/crises/{id}/incidentbooks', {
    responses: {
      '200': {
        description: 'Crisis model instance',
        content: {'application/json': {schema: getModelSchemaRef(Incidentbook)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Crisis.prototype.crisis_id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Incidentbook, {
            title: 'NewIncidentbookInCrisis',
            exclude: ['id'],
            optional: ['crisisId']
          }),
        },
      },
    }) incidentbook: Omit<Incidentbook, 'id'>,
  ): Promise<Incidentbook> {
    return this.crisisRepository.incidentbooks(id).create(incidentbook);
  }

  @patch('/crises/{id}/incidentbooks', {
    responses: {
      '200': {
        description: 'Crisis.Incidentbook PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Incidentbook, {partial: true}),
        },
      },
    })
    incidentbook: Partial<Incidentbook>,
    @param.query.object('where', getWhereSchemaFor(Incidentbook)) where?: Where<Incidentbook>,
  ): Promise<Count> {
    return this.crisisRepository.incidentbooks(id).patch(incidentbook, where);
  }

  @del('/crises/{id}/incidentbooks', {
    responses: {
      '200': {
        description: 'Crisis.Incidentbook DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Incidentbook)) where?: Where<Incidentbook>,
  ): Promise<Count> {
    return this.crisisRepository.incidentbooks(id).delete(where);
  }
}
