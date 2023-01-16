import { SchemaUI } from './ui';
import { SchemaConditions } from './conditions';
import { SchemaFieldName, SchemaFields, SchemaFieldsTemplate } from './fields';
import { NamesWithNestedPaths } from '../utils';

export * from './ui';
export * from './fields';
export * from './conditions';

export type Schema<SFT extends SchemaFieldsTemplate> = {
  fields: SchemaFields<SFT>;
  conditions?: SchemaConditions<SFT, Extract<keyof NamesWithNestedPaths<SFT>, SchemaFieldName>>;
  ui?: SchemaUI;
};
