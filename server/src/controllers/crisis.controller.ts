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
import {Crisis} from '../models';
import {CrisisRepository} from '../repositories';

export class CrisisController {
  constructor(
    @repository(CrisisRepository)
    public crisisRepository : CrisisRepository,
  ) {}

  @post('/crises')
  @response(200, {
    description: 'Crisis model instance',
    content: {'application/json': {schema: getModelSchemaRef(Crisis)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Crisis, {
            title: 'NewCrisis',
            exclude: ['crisis_id'],
          }),
        },
      },
    })
    crisis: Omit<Crisis, 'crisis_id'>,
  ): Promise<Crisis> {
    return this.crisisRepository.create(crisis);
  }

  @get('/crises/count')
  @response(200, {
    description: 'Crisis model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Crisis) where?: Where<Crisis>,
  ): Promise<Count> {
    return this.crisisRepository.count(where);
  }

  @get('/crises')
  @response(200, {
    description: 'Array of Crisis model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Crisis, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Crisis) filter?: Filter<Crisis>,
  ): Promise<Crisis[]> {
    return this.crisisRepository.find(filter);
  }

  @patch('/crises')
  @response(200, {
    description: 'Crisis PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Crisis, {partial: true}),
        },
      },
    })
    crisis: Crisis,
    @param.where(Crisis) where?: Where<Crisis>,
  ): Promise<Count> {
    return this.crisisRepository.updateAll(crisis, where);
  }

  @get('/crises/{id}')
  @response(200, {
    description: 'Crisis model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Crisis, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Crisis, {exclude: 'where'}) filter?: FilterExcludingWhere<Crisis>
  ): Promise<Crisis> {
    return this.crisisRepository.findById(id, filter);
  }

  @patch('/crises/{id}')
  @response(204, {
    description: 'Crisis PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Crisis, {partial: true}),
        },
      },
    })
    crisis: Crisis,
  ): Promise<void> {
    await this.crisisRepository.updateById(id, crisis);
  }

  @put('/crises/{id}')
  @response(204, {
    description: 'Crisis PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() crisis: Crisis,
  ): Promise<void> {
    await this.crisisRepository.replaceById(id, crisis);
  }

  @del('/crises/{id}')
  @response(204, {
    description: 'Crisis DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.crisisRepository.deleteById(id);
  }
}
