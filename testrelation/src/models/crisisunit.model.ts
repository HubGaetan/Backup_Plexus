import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Members} from './members.model';
import {Crisis} from './crisis.model';

@model()
export class Crisisunit extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  crisisunit_id?: number;

  @property({
    type: 'boolean',
  })
  isreferent?: boolean;

  @belongsTo(() => Members)
  membersId: number;

  @belongsTo(() => Crisis)
  crisisId: number;

  constructor(data?: Partial<Crisisunit>) {
    super(data);
  }
}

export interface CrisisunitRelations {
  // describe navigational properties here
}

export type CrisisunitWithRelations = Crisisunit & CrisisunitRelations;
