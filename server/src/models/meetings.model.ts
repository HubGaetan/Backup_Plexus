import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Crisis} from './crisis.model';

@model()
export class Meetings extends Entity {
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
  meetingdate?: string;

  @property({
    type: 'string',
  })
  starttime?: string;

  @property({
    type: 'string',
  })
  endtime?: string;

  @belongsTo(() => Crisis)
  crisisId: number;

  constructor(data?: Partial<Meetings>) {
    super(data);
  }
}

export interface MeetingsRelations {
  // describe navigational properties here
}

export type MeetingsWithRelations = Meetings & MeetingsRelations;
