import { ArrayUniqueSlaveValidation, SchemaFieldArrayTemplate } from '../../../types';

export const arrayUniqueSlave = <SFT extends SchemaFieldArrayTemplate>(
  items: any[],
  validationInfo: ArrayUniqueSlaveValidation<SFT>
) => {
  if (!items?.length) {
    return true;
  }

  if (items.length === new Set(items.map(item => item[validationInfo.masterProp])).size) {
    return true;
  }

  const masterPropGroups = items.reduce((masterPropGroups, item) => {
    const masterPropValue = item[validationInfo.masterProp];

    if (Array.isArray(masterPropValue)) {
      throw new Error('master props must not to be array');
    }

    if (!masterPropGroups[masterPropValue]) {
      masterPropGroups[masterPropValue] = [item];
    } else {
      masterPropGroups[masterPropValue].push(item);
    }

    return masterPropGroups;
  }, {});

  return Object.values(masterPropGroups).every((group: any) => {
    const isArray = Array.isArray(group[0][validationInfo.slaveProp]);

    if (!isArray) {
      return (
        group.length === new Set(group.map((item: any) => item[validationInfo.slaveProp])).size
      );
    }

    return (
      [
        ...group.map((item: any) =>
          item[validationInfo.slaveProp].map((itemProperty: any) =>
            validationInfo.slavePropMapper
              ? itemProperty[validationInfo.slavePropMapper]
              : itemProperty
          )
        )
      ].flat().length ===
      new Set(
        [
          ...group.map((item: any) =>
            item[validationInfo.slaveProp].map((itemProperty: any) =>
              validationInfo.slavePropMapper
                ? itemProperty[validationInfo.slavePropMapper]
                : itemProperty
            )
          )
        ].flat()
      ).size
    );
  });
};
