import {
  SchemaFieldName,
  SchemaFieldNestedTemplate,
  SchemaFields,
  SchemaFieldsTemplate
} from '../schema';

type Join<
  L extends SchemaFieldName | undefined,
  R extends SchemaFieldName | undefined
> = L extends SchemaFieldName
  ? R extends SchemaFieldName
    ? `${L}.${R}`
    : L
  : R extends SchemaFieldName
  ? R
  : undefined;

type Union<L extends unknown | undefined, R extends unknown | undefined> = L extends undefined
  ? R extends undefined
    ? undefined
    : R
  : R extends undefined
  ? L
  : L | R;

export type NestedPaths<
  SFT extends SchemaFieldsTemplate,
  Prev extends SchemaFieldName | undefined = undefined,
  Path extends SchemaFieldName | undefined = undefined
> = {
  [K in Extract<keyof SFT, SchemaFieldName>]: SFT[K] extends SchemaFieldNestedTemplate
    ? NestedPaths<SFT[K]['fields'], Union<Prev, Path>, Join<Path, K>>
    : Union<Union<Prev, Path>, Join<Path, K>>;
}[Extract<keyof SFT, SchemaFieldName>];

export type NamesWithNestedPaths<
  SFT extends SchemaFieldsTemplate,
  Prev extends SchemaFieldName | undefined = undefined,
  Path extends SchemaFieldName | undefined = undefined
> = {
  [K in Extract<keyof SFT, SchemaFieldName>]: Union<Union<Prev, Path>, Join<Path, K>>;
} & {
  [K in Extract<keyof SFT, SchemaFieldName> as SFT[K] extends SchemaFieldNestedTemplate
    ? Extract<keyof SFT[K]['fields'], SchemaFieldName>
    : never]: SFT[K] extends SchemaFieldNestedTemplate
    ? NamesWithNestedPaths<SFT[K]['fields'], Union<Prev, Path>, Join<Path, K>>[Extract<
        keyof SFT[K]['fields'],
        SchemaFieldName
      >]
    : never;
};

export type SchemaFieldFromPath<
  SFT extends SchemaFieldsTemplate,
  SF extends SchemaFields<SFT>,
  Path extends string
> = {
  [K in Path]: K extends keyof SFT
    ? SF[K]
    : K extends `${infer P}.${infer S}`
    ? SFT[P] extends SchemaFieldNestedTemplate
      ? SchemaFieldFromPath<SFT[P]['fields'], SchemaFields<SFT[P]['fields']>, S>
      : never
    : never;
}[Path];
