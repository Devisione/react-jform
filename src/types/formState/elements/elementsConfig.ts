import { ROOT_ID } from '../../../constants';
import { FormStateElements } from './shared';

export type FormStateElementsConfig = {
  [ROOT_ID.id]: {
    elements: FormStateElements;
  };
};
