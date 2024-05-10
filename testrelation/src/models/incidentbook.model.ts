import { Entity, model, property, belongsTo } from '@loopback/repository';
import { Members } from './members.model';
import { Crisis } from './crisis.model';

@model()
export class Incidentbook extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
  })
  title?: string;

  @property({
    type: 'string',
  })
  content?: string;

  @property({
    type: 'date',
  })
  messagedate?: string;

  @property({
    type: 'boolean',
  })
  isevent?: boolean;

  @belongsTo(() => Members)
  membersId: number;

  @belongsTo(() => Crisis)
  crisisId: number;

  constructor(data?: Partial<Incidentbook>) {
    super(data);
  }
}

export interface IncidentbookRelations {
  // describe navigational properties here
}

export type IncidentbookWithRelations = Incidentbook & IncidentbookRelations;
