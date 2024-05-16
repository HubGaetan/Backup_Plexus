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
  Members,
  Incidentbook,
} from '../models';
import {MembersRepository} from '../repositories';

export class MembersIncidentbookController {
  constructor(
    @repository(MembersRepository) protected membersRepository: MembersRepository,
  ) { }

  @get('/members/{id}/incidentbooks', {
    responses: {
      '200': {
        description: 'Array of Members has many Incidentbook',
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
    return this.membersRepository.incidentbooks(id).find(filter);
  }

  @post('/members/{id}/incidentbooks', {
    responses: {
      '200': {
        description: 'Members model instance',
        content: {'application/json': {schema: getModelSchemaRef(Incidentbook)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Members.prototype.member_id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Incidentbook, {
            title: 'NewIncidentbookInMembers',
            exclude: ['id'],
            optional: ['membersId']
          }),
        },
      },
    }) incidentbook: Omit<Incidentbook, 'id'>,
  ): Promise<Incidentbook> {
    return this.membersRepository.incidentbooks(id).create(incidentbook);
  }

  @patch('/members/{id}/incidentbooks', {
    responses: {
      '200': {
        description: 'Members.Incidentbook PATCH success count',
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
    return this.membersRepository.incidentbooks(id).patch(incidentbook, where);
  }

  @del('/members/{id}/incidentbooks', {
    responses: {
      '200': {
        description: 'Members.Incidentbook DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Incidentbook)) where?: Where<Incidentbook>,
  ): Promise<Count> {
    return this.membersRepository.incidentbooks(id).delete(where);
  }
}
