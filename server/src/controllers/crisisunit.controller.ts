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
import {Crisisunit} from '../models';
import {CrisisunitRepository} from '../repositories';

export class CrisisunitController {
  constructor(
    @repository(CrisisunitRepository)
    public crisisunitRepository : CrisisunitRepository,
  ) {}

  @post('/crisisunits')
  @response(200, {
    description: 'Crisisunit model instance',
    content: {'application/json': {schema: getModelSchemaRef(Crisisunit)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Crisisunit, {
            title: 'NewCrisisunit',
            exclude: ['crisisunit_id'],
          }),
        },
      },
    })
    crisisunit: Omit<Crisisunit, 'crisisunit_id'>,
  ): Promise<Crisisunit> {
    return this.crisisunitRepository.create(crisisunit);
  }

  @get('/crisisunits/count')
  @response(200, {
    description: 'Crisisunit model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Crisisunit) where?: Where<Crisisunit>,
  ): Promise<Count> {
    return this.crisisunitRepository.count(where);
  }

  @get('/crisisunits')
  @response(200, {
    description: 'Array of Crisisunit model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Crisisunit, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Crisisunit) filter?: Filter<Crisisunit>,
  ): Promise<Crisisunit[]> {
    return this.crisisunitRepository.find(filter);
  }

  @patch('/crisisunits')
  @response(200, {
    description: 'Crisisunit PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Crisisunit, {partial: true}),
        },
      },
    })
    crisisunit: Crisisunit,
    @param.where(Crisisunit) where?: Where<Crisisunit>,
  ): Promise<Count> {
    return this.crisisunitRepository.updateAll(crisisunit, where);
  }

  @get('/crisisunits/{id}')
  @response(200, {
    description: 'Crisisunit model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Crisisunit, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Crisisunit, {exclude: 'where'}) filter?: FilterExcludingWhere<Crisisunit>
  ): Promise<Crisisunit> {
    return this.crisisunitRepository.findById(id, filter);
  }

  @patch('/crisisunits/{id}')
  @response(204, {
    description: 'Crisisunit PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Crisisunit, {partial: true}),
        },
      },
    })
    crisisunit: Crisisunit,
  ): Promise<void> {
    await this.crisisunitRepository.updateById(id, crisisunit);
  }

  @put('/crisisunits/{id}')
  @response(204, {
    description: 'Crisisunit PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() crisisunit: Crisisunit,
  ): Promise<void> {
    await this.crisisunitRepository.replaceById(id, crisisunit);
  }

  @del('/crisisunits/{id}')
  @response(204, {
    description: 'Crisisunit DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.crisisunitRepository.deleteById(id);
  }
}
