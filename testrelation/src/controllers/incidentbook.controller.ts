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
import {Incidentbook} from '../models';
import {IncidentbookRepository} from '../repositories';

export class IncidentbookController {
  constructor(
    @repository(IncidentbookRepository)
    public incidentbookRepository : IncidentbookRepository,
  ) {}

  @post('/incidentbooks')
  @response(200, {
    description: 'Incidentbook model instance',
    content: {'application/json': {schema: getModelSchemaRef(Incidentbook)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Incidentbook, {
            title: 'NewIncidentbook',
            exclude: ['id'],
          }),
        },
      },
    })
    incidentbook: Omit<Incidentbook, 'id'>,
  ): Promise<Incidentbook> {
    return this.incidentbookRepository.create(incidentbook);
  }

  @get('/incidentbooks/count')
  @response(200, {
    description: 'Incidentbook model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Incidentbook) where?: Where<Incidentbook>,
  ): Promise<Count> {
    return this.incidentbookRepository.count(where);
  }

  @get('/incidentbooks')
  @response(200, {
    description: 'Array of Incidentbook model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Incidentbook, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Incidentbook) filter?: Filter<Incidentbook>,
  ): Promise<Incidentbook[]> {
    return this.incidentbookRepository.find(filter);
  }

  @patch('/incidentbooks')
  @response(200, {
    description: 'Incidentbook PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Incidentbook, {partial: true}),
        },
      },
    })
    incidentbook: Incidentbook,
    @param.where(Incidentbook) where?: Where<Incidentbook>,
  ): Promise<Count> {
    return this.incidentbookRepository.updateAll(incidentbook, where);
  }

  @get('/incidentbooks/{id}')
  @response(200, {
    description: 'Incidentbook model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Incidentbook, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Incidentbook, {exclude: 'where'}) filter?: FilterExcludingWhere<Incidentbook>
  ): Promise<Incidentbook> {
    return this.incidentbookRepository.findById(id, filter);
  }

  @patch('/incidentbooks/{id}')
  @response(204, {
    description: 'Incidentbook PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Incidentbook, {partial: true}),
        },
      },
    })
    incidentbook: Incidentbook,
  ): Promise<void> {
    await this.incidentbookRepository.updateById(id, incidentbook);
  }

  @put('/incidentbooks/{id}')
  @response(204, {
    description: 'Incidentbook PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() incidentbook: Incidentbook,
  ): Promise<void> {
    await this.incidentbookRepository.replaceById(id, incidentbook);
  }

  @del('/incidentbooks/{id}')
  @response(204, {
    description: 'Incidentbook DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.incidentbookRepository.deleteById(id);
  }
}
