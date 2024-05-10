import { Entity, model, property, hasMany } from '@loopback/repository';
import { Crisisunit } from './crisisunit.model';
import {Incidentbook} from './incidentbook.model';

@model()
export class Members extends Entity {
  @property({
    type: 'string',
  })
  name?: string;

  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  member_id?: number;

  @property({
    type: 'string',
  })
  firstname?: string;

  @property({
    type: 'string',
  })
  speciality?: string;

  @property({
    type: 'string',
  })
  role?: string;

  @hasMany(() => Crisisunit)
  crisisunits: Crisisunit[];

  @hasMany(() => Incidentbook)
  incidentbooks: Incidentbook[];

  constructor(data?: Partial<Members>) {
    super(data);
  }
}

export interface MembersRelations {
  // describe navigational properties here
}

export type MembersWithRelations = Members & MembersRelations;
