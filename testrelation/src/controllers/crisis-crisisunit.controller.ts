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
  Crisisunit,
} from '../models';
import {CrisisRepository} from '../repositories';

export class CrisisCrisisunitController {
  constructor(
    @repository(CrisisRepository) protected crisisRepository: CrisisRepository,
  ) { }

  @get('/crises/{id}/crisisunits', {
    responses: {
      '200': {
        description: 'Array of Crisis has many Crisisunit',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Crisisunit)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Crisisunit>,
  ): Promise<Crisisunit[]> {
    return this.crisisRepository.crisisunits(id).find(filter);
  }

  @post('/crises/{id}/crisisunits', {
    responses: {
      '200': {
        description: 'Crisis model instance',
        content: {'application/json': {schema: getModelSchemaRef(Crisisunit)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Crisis.prototype.crisis_id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Crisisunit, {
            title: 'NewCrisisunitInCrisis',
            exclude: ['crisisunit_id'],
            optional: ['crisisId']
          }),
        },
      },
    }) crisisunit: Omit<Crisisunit, 'crisisunit_id'>,
  ): Promise<Crisisunit> {
    return this.crisisRepository.crisisunits(id).create(crisisunit);
  }

  @patch('/crises/{id}/crisisunits', {
    responses: {
      '200': {
        description: 'Crisis.Crisisunit PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Crisisunit, {partial: true}),
        },
      },
    })
    crisisunit: Partial<Crisisunit>,
    @param.query.object('where', getWhereSchemaFor(Crisisunit)) where?: Where<Crisisunit>,
  ): Promise<Count> {
    return this.crisisRepository.crisisunits(id).patch(crisisunit, where);
  }

  @del('/crises/{id}/crisisunits', {
    responses: {
      '200': {
        description: 'Crisis.Crisisunit DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Crisisunit)) where?: Where<Crisisunit>,
  ): Promise<Count> {
    return this.crisisRepository.crisisunits(id).delete(where);
  }
}
