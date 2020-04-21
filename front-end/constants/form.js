import { t } from "../utils/Translate";
import _ from 'lodash';

export const GENDERS = [
  {
    value: 'MALE',
    text: t('male'),
  },
  {
    value: 'FEMALE',
    text: t('female'),
  }
];

export const AGE_INTERVALS = [
  {
    key: _.uniqueId('age_'),
    value: 'ZERO_SIX',
    text: t('ageInterval.firstInterval')
  },
  {
    key: _.uniqueId('age_'),
    value: 'SIX_TWELVE',
    text: t('ageInterval.secondInterval')
  },
  {
    key: _.uniqueId('age_'),
    value: 'TWELVE_TWOFOUR',
    text: t('ageInterval.thirdInterval')
  },
  {
    key: _.uniqueId('age_'),
    value: 'TWOFOUR_MORE',
    text: t('ageInterval.lastInterval')
  }
];

export const BREEDS = [
  {
    key: _.uniqueId('breed_'),
    value: 'BREED_1',
    text: 'Breed 1'
  },
  {
    key: _.uniqueId('breed_'),
    value: 'BREED_2',
    text: 'Breed 2'
  },
  {
    key: _.uniqueId('breed_'),
    value: 'BREED_3',
    text: 'Breed 3'
  },
  {
    key: _.uniqueId('breed_'),
    value: 'BREED_4',
    text: 'Breed 4'
  },
  { 
    key: _.uniqueId('breed_'),
    value: 'BREED_5',
    text: 'Breed 5'
  }
];

export const CHARACTERISTICS = [
  {
    value: 'CHAR_1',
    text: 'First'
  },
  {
    value: 'CHAR_2',
    text: 'Second'
  },
  {
    value: 'CHAR_3',
    text: 'Third'
  },
  {
    value: 'CHAR_4',
    text: 'Forth'
  },
  {
    value: 'CHAR_5',
    text: 'Fifth'
  },
]