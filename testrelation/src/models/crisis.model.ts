import { Entity, model, property, hasMany } from '@loopback/repository';
import { Crisisunit } from './crisisunit.model';
import {Incidentbook} from './incidentbook.model';

@model()
export class Crisis extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  crisis_id?: number;

  @property({
    type: 'string',
  })
  title?: string;

  @property({
    type: 'string',
  })
  pathToImage?: string;

  @property({
    type: 'string',
  })
  objective?: string;

  @property({
    type: 'string',
  })
  description?: string;

  @property({
    type: 'date',
    jsonSchema: {
      format: 'date'
    }
  })
  startdate?: string;

  @property({
    type: 'date',
    jsonSchema: {
      format: 'date'
    }
  })
  enddate?: string;


  @property({
    type: 'string',
  })
  status?: string;

  @property({
    type: 'array',
    itemType: 'string',
  })
  localisation?: string[];

  @property({
    type: 'array',
    itemType: 'string',
  })
  pathToFiles?: string[];


  @hasMany(() => Crisisunit)
  crisisunits: Crisisunit[];

  @hasMany(() => Incidentbook)
  incidentbooks: Incidentbook[];

  constructor(data?: Partial<Crisis>) {
    super(data);
  }
}

export interface CrisisRelations {
  // describe navigational properties here
}

export type CrisisWithRelations = Crisis & CrisisRelations;
