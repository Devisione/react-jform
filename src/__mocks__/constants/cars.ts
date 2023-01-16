export const bmwBrand = 'bmw';
export const bmwModels = ['1series', '2series', '3series', '4series', '5series'] as const;
export const bmwModelsTitles = bmwModels.reduce<Record<keyof typeof bmwModels, string>>(
  (modelsTitles, model) => {
    modelsTitles[model as keyof typeof bmwModels] = `${model[0]} ${model.slice(1)}`;

    return modelsTitles;
  },
  {} as Record<keyof typeof bmwModels, string>
);

export const audiBrand = 'audi';
export const audiModels = ['a3', 'a4', 'a5', 'a6', 'a7'];
export const audiModelsTitles = audiModels.reduce<Record<keyof typeof audiModels, string>>(
  (modelsTitles, model) => {
    modelsTitles[model as keyof typeof audiModels] = `${model[0].toUpperCase()}${model.slice(1)}`;

    return modelsTitles;
  },
  {} as Record<keyof typeof audiModels, string>
);

export const toyotaBrand = 'toyota';
export const toyotaModels = ['gt86', 'supra'];
export const toyotaModelsTitles = {
  gt86: 'GT86',
  supra: 'Supra'
};

export const fordBrand = 'ford';
export const fordModels = ['mustang', 'mondeo', 'kuga'];
export const formModelsTitles = fordModels.reduce<Record<keyof typeof fordModels, string>>(
  (modelsTitles, model) => {
    modelsTitles[model as keyof typeof fordModels] = `${model[0].toUpperCase()}${model.slice(1)}`;

    return modelsTitles;
  },
  {} as Record<keyof typeof fordModels, string>
);

export const brands = [bmwBrand, toyotaBrand, audiBrand, fordBrand] as const;
export const brandsToModels = {
  [bmwBrand]: bmwModels,
  [audiBrand]: audiModels,
  [toyotaBrand]: toyotaModels,
  [fordBrand]: fordModels
};
export const brandsToModelsTitles = {
  [bmwBrand]: bmwModelsTitles,
  [audiBrand]: audiModelsTitles,
  [toyotaBrand]: toyotaModelsTitles,
  [fordBrand]: formModelsTitles
};
export const brandsTitles = {
  [bmwBrand]: 'BMW',
  [audiBrand]: 'Audi',
  [toyotaBrand]: 'Toyota',
  [fordBrand]: 'Ford'
} as const;

export const brandsFromGermany = [bmwBrand, audiBrand] as const;
