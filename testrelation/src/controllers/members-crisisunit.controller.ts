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
  Crisisunit,
} from '../models';
import {MembersRepository} from '../repositories';

export class MembersCrisisunitController {
  constructor(
    @repository(MembersRepository) protected membersRepository: MembersRepository,
  ) { }

  @get('/members/{id}/crisisunits', {
    responses: {
      '200': {
        description: 'Array of Members has many Crisisunit',
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
    return this.membersRepository.crisisunits(id).find(filter);
  }

  @post('/members/{id}/crisisunits', {
    responses: {
      '200': {
        description: 'Members model instance',
        content: {'application/json': {schema: getModelSchemaRef(Crisisunit)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Members.prototype.member_id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Crisisunit, {
            title: 'NewCrisisunitInMembers',
            exclude: ['crisisunit_id'],
            optional: ['membersId']
          }),
        },
      },
    }) crisisunit: Omit<Crisisunit, 'crisisunit_id'>,
  ): Promise<Crisisunit> {
    return this.membersRepository.crisisunits(id).create(crisisunit);
  }

  @patch('/members/{id}/crisisunits', {
    responses: {
      '200': {
        description: 'Members.Crisisunit PATCH success count',
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
    return this.membersRepository.crisisunits(id).patch(crisisunit, where);
  }

  @del('/members/{id}/crisisunits', {
    responses: {
      '200': {
        description: 'Members.Crisisunit DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Crisisunit)) where?: Where<Crisisunit>,
  ): Promise<Count> {
    return this.membersRepository.crisisunits(id).delete(where);
  }
}
