import _ from 'lodash';
import moment from 'moment';
import { t } from '../utils/Translate';

export const LAN_ADDRESS = 'http://10.159.244.194';
// export const LAN_ADDRESS = 'http://172.20.10.2';

export const USER_TOKEN = 'userToken';

export const PORT = '19000';

export const PHOTOS_DIR = 'shelty';

export const SEX = Object.freeze({
  MALE: {
    CODE: 'MALE',
    text: t('male')
  },
  FEMALE: {
    CODE: 'FEMALE',
    text: t('female')
  }
});

export const BOTTOM_NAV_TABS = [
  {
    key: 'home',
    icon: 'home',
    label: 'Anasayfa',
    barColor: '#f9f9f9',
    pressColor: '#f9f9f9',
    labelStyle: {
      color: '#504746'
    }
  },
  {
    key: 'shelters',
    icon: 'barcode',
    label: 'Barınaklar',
    barColor: '#f9f9f9',
    pressColor: '#f9f9f9',
    labelStyle: {
      color: '#504746'
    }
  },
  {
    key: 'add',
    icon: 'add',
    label: '',
    barColor: '#d6402c',
    pressColor: '#f9f9f9',
    labelStyle: {
      color: '#504746'
    }
  },
  {
    key: 'blog',
    icon: 'paper',
    label: 'Blog',
    barColor: '#f9f9f9',
    pressColor: '#f9f9f9',
    labelStyle: {
      color: '#504746'
    }
  },
  {
    key: 'profile',
    icon: 'person',
    label: 'Profil',
    barColor: '#f9f9f9',
    pressColor: '#f9f9f9',
    labelStyle: {
      color: '#504746'
    }
  }
];

export const STORIES = [
  {
    image: 'https://placedog.net/100/100',
    text: _.uniqueId('user_')
  },
  {
    image: 'https://placedog.net/100/100',
    text: _.uniqueId('user_')
  },
  {
    image: 'https://placedog.net/100/100',
    text: _.uniqueId('user_')
  },
  {
    image: 'https://placedog.net/100/100',
    text: _.uniqueId('user_')
  },
  {
    image: 'https://placedog.net/100/100',
    text: _.uniqueId('user_')
  },
  {
    image: 'https://placedog.net/100/100',
    text: _.uniqueId('user_')
  },
  {
    image: 'https://placedog.net/100/100',
    text: _.uniqueId('user_')
  },
  {
    image: 'https://placedog.net/100/100',
    text: _.uniqueId('user_')
  },
  {
    image: 'https://placedog.net/100/100',
    text: _.uniqueId('user_')
  },
  {
    image: 'https://placedog.net/100/100',
    text: _.uniqueId('user_')
  },
  {
    image: 'https://placedog.net/100/100',
    text: _.uniqueId('user_')
  },
  {
    image: 'https://placedog.net/100/100',
    text: _.uniqueId('user_')
  },
  {
    image: 'https://placedog.net/100/100',
    text: _.uniqueId('user_')
  }
];

export const MENU_ITEMS = [
  {
    id: 0,
    icon: 'search'
  },
  {
    id: 1,
    icon: 'wallet'
  },
  {
    id: 2,
    icon: 'information-circle-outline'
  }
];

export const CAROUSEL_ITEMS = [
  {
    id: _.uniqueId('carousel_'),
    thumbnail: 'https://placedog.net/400/150',
    title: _.uniqueId('carousel_')
  },
  {
    id: _.uniqueId('carousel_'),
    thumbnail: 'https://placedog.net/400/150',
    title: _.uniqueId('carousel_')
  },
  {
    id: _.uniqueId('carousel_'),
    thumbnail: 'https://placedog.net/400/150',
    title: _.uniqueId('carousel_')
  },
  {
    id: _.uniqueId('carousel_'),
    thumbnail: 'https://placedog.net/400/150',
    title: _.uniqueId('carousel_')
  },
  {
    id: _.uniqueId('carousel_'),
    thumbnail: 'https://placedog.net/400/150',
    title: _.uniqueId('carousel_')
  },
  {
    id: _.uniqueId('carousel_'),
    thumbnail: 'https://placedog.net/400/150',
    title: _.uniqueId('carousel_')
  }
];

export const SHELTERS = [
  {
    id: _.uniqueId('shelters_'),
    image: 'https://placedog.net/400/150',
    shelterName: _.uniqueId('shelterName_'),
    address: _.uniqueId('address_'),
    workingTime: _.uniqueId('workingTime_'),
    phone: '5384583454'
  },
  {
    id: _.uniqueId('shelters_'),
    image: 'https://placedog.net/400/150',
    shelterName: _.uniqueId('shelterName_'),
    address: _.uniqueId('address_'),
    workingTime: _.uniqueId('workingTime_'),
    phone: '5384583454'
  },
  {
    id: _.uniqueId('shelters_'),
    image: 'https://placedog.net/400/150',
    shelterName: _.uniqueId('shelterName_'),
    address: _.uniqueId('address_'),
    workingTime: _.uniqueId('workingTime_'),
    phone: '5384583454'
  },
  {
    id: _.uniqueId('shelters_'),
    image: 'https://placedog.net/400/150',
    shelterName: _.uniqueId('shelterName_'),
    address: _.uniqueId('address_'),
    workingTime: _.uniqueId('workingTime_'),
    phone: '5384583454'
  },
  {
    id: _.uniqueId('shelters_'),
    shelterName: _.uniqueId('shelterName_'),
    image: 'https://placedog.net/400/150',
    address: _.uniqueId('address_'),
    workingTime: _.uniqueId('workingTime_'),
    phone: '5384583454'
  }
];

export const ANIMALS = [
  {
    id: _.uniqueId('animal_'),
    thumbnail: 'https://placedog.net/400/150',
    name: _.uniqueId('name_'),
    breed: _.uniqueId('breed_'),
    age: _.random(0, 20),
    shelter: _.uniqueId('shelter_'),
    sex: SEX.MALE.text
  },
  {
    id: _.uniqueId('animal_'),
    thumbnail: 'https://placedog.net/400/150',
    name: _.uniqueId('name_'),
    breed: _.uniqueId('breed_'),
    age: _.random(0, 20),
    shelter: _.uniqueId('shelter_'),
    sex: SEX.MALE.text
  },
  {
    id: _.uniqueId('animal_'),
    thumbnail: 'https://placedog.net/400/150',
    name: _.uniqueId('name_'),
    breed: _.uniqueId('breed_'),
    age: _.random(0, 20),
    shelter: _.uniqueId('shelter_'),
    sex: SEX.FEMALE.text
  },
  {
    id: _.uniqueId('animal_'),
    thumbnail: 'https://placedog.net/400/150',
    name: _.uniqueId('name_'),
    breed: _.uniqueId('breed_'),
    age: _.random(0, 20),
    shelter: _.uniqueId('shelter_'),
    sex: SEX.FEMALE.text
  },
  {
    id: _.uniqueId('animal_'),
    thumbnail: 'https://placedog.net/400/150',
    name: _.uniqueId('name_'),
    breed: _.uniqueId('breed_'),
    age: _.random(0, 20),
    shelter: _.uniqueId('shelter_'),
    sex: SEX.MALE.text
  },
  {
    id: _.uniqueId('animal_'),
    thumbnail: 'https://placedog.net/400/150',
    name: _.uniqueId('name_'),
    breed: _.uniqueId('breed_'),
    age: _.random(0, 20),
    shelter: _.uniqueId('shelter_'),
    sex: SEX.MALE.text
  },
  {
    id: _.uniqueId('animal_'),
    thumbnail: 'https://placedog.net/400/150',
    name: _.uniqueId('name_'),
    breed: _.uniqueId('breed_'),
    age: _.random(0, 20),
    shelter: _.uniqueId('shelter_'),
    sex: SEX.FEMALE.text
  }
];

export const LAST_ITEMS = [
  {
    id: _.uniqueId('shelter_'),
    thumbnail: 'https://placedog.net/400/150',
    title: _.uniqueId('shelter_')
  },
  {
    id: _.uniqueId('shelter_'),
    thumbnail: 'https://placedog.net/400/150',
    title: _.uniqueId('shelter_')
  },
  {
    id: _.uniqueId('shelter_'),
    thumbnail: 'https://placedog.net/400/150',
    title: _.uniqueId('shelter_')
  },
  {
    id: _.uniqueId('shelter_'),
    thumbnail: 'https://placedog.net/400/150',
    title: _.uniqueId('shelter_')
  },
  {
    id: _.uniqueId('shelter_'),
    thumbnail: 'https://placedog.net/400/150',
    title: _.uniqueId('shelter_')
  },
  {
    id: _.uniqueId('shelter_'),
    thumbnail: 'https://placedog.net/400/150',
    title: _.uniqueId('shelter_')
  },
  {
    id: _.uniqueId('shelter_'),
    thumbnail: 'https://placedog.net/400/150',
    title: _.uniqueId('shelter_')
  },
  {
    id: _.uniqueId('shelter_'),
    thumbnail: 'https://placedog.net/400/150',
    title: _.uniqueId('shelter_')
  },
  {
    id: _.uniqueId('shelter_'),
    thumbnail: 'https://placedog.net/400/150',
    title: _.uniqueId('shelter_')
  },
  {
    id: _.uniqueId('shelter_'),
    thumbnail: 'https://placedog.net/400/150',
    title: _.uniqueId('shelter_')
  },
  {
    id: _.uniqueId('shelter_'),
    thumbnail: 'https://placedog.net/400/150',
    title: _.uniqueId('shelter_')
  },
  {
    id: _.uniqueId('shelter_'),
    thumbnail: 'https://placedog.net/400/150',
    title: _.uniqueId('shelter_')
  }
];

export const SHARED_PHOTOS = [
  {
    id: _.uniqueId('sharedPhoto_'),
    source: 'https://placedog.net/400/400',
    title: _.uniqueId('sharedPhoto_')
  },
  {
    id: _.uniqueId('sharedPhoto_'),
    source: 'https://placedog.net/400/400',
    title: _.uniqueId('sharedPhoto_')
  },
  {
    id: _.uniqueId('sharedPhoto_'),
    source: 'https://placedog.net/400/400',
    title: _.uniqueId('sharedPhoto_')
  },
  {
    id: _.uniqueId('sharedPhoto_'),
    source: 'https://placedog.net/400/400',
    title: _.uniqueId('sharedPhoto_')
  },
  {
    id: _.uniqueId('sharedPhoto_'),
    source: 'https://placedog.net/400/400',
    title: _.uniqueId('sharedPhoto_')
  },
  {
    id: _.uniqueId('sharedPhoto_'),
    source: 'https://placedog.net/400/400',
    title: _.uniqueId('sharedPhoto_')
  },
  {
    id: _.uniqueId('sharedPhoto_'),
    source: 'https://placedog.net/400/400',
    title: _.uniqueId('sharedPhoto_')
  },
  {
    id: _.uniqueId('sharedPhoto_'),
    source: 'https://placedog.net/400/400',
    title: _.uniqueId('sharedPhoto_')
  },
  {
    id: _.uniqueId('sharedPhoto_'),
    source: 'https://placedog.net/400/400',
    title: _.uniqueId('sharedPhoto_')
  },
  {
    id: _.uniqueId('sharedPhoto_'),
    source: 'https://placedog.net/400/400',
    title: _.uniqueId('sharedPhoto_')
  },
  {
    id: _.uniqueId('sharedPhoto_'),
    source: 'https://placedog.net/400/400',
    title: _.uniqueId('sharedPhoto_')
  }
];

export const POSTS = [
  {
    id: _.uniqueId('posts_'),
    title: _.uniqueId('posts_'),
    description:
      'Shoob what a nice floof wrinkler fluffer many pats smol, maximum borkdrive long water shoob many pats. Pupper wrinkler long water shoob puggorino doing me a frighten blep, borkf you are doin me a concern boofers.',
    content:
      'Shoob what a nice floof wrinkler fluffer many pats smol, maximum borkdrive long water shoob many pats. Pupper wrinkler long water shoob puggorino doing me a frighten blep, borkf you are doin me a concern boofers. Ur givin me a spook heckin angery woofer puggo boof heck, borking doggo borkf borkdrive. Adorable doggo most angery pupper I have ever seen maximum borkdrive doing me a frighten pupper, extremely cuuuuuute pats fluffer sub woofer super chub, adorable doggo lotsa pats long bois.',
    featuredImage: 'https://placedog.net/200/250',
    fullName: 'John Doe',
    comments: [
      {
        content:
          'Shoob what a nice floof wrinkler fluffer many pats smol, maximum borkdrive long water shoob many pats. Pupper wrinkler long water shoob puggorino doing me a frighten blep, borkf you are doin me a concern boofers.'
      },
      {
        content:
          'Shoob what a nice floof wrinkler fluffer many pats smol, maximum borkdrive long water shoob many pats. Pupper wrinkler long water shoob puggorino doing me a frighten blep, borkf you are doin me a concern boofers.'
      },
      {
        content:
          'Shoob what a nice floof wrinkler fluffer many pats smol, maximum borkdrive long water shoob many pats. Pupper wrinkler long water shoob puggorino doing me a frighten blep, borkf you are doin me a concern boofers.'
      }
    ],
    createdAt: moment()
  },
  {
    id: _.uniqueId('posts_'),
    title: _.uniqueId('posts_'),
    description:
      'Shoob what a nice floof wrinkler fluffer many pats smol, maximum borkdrive long water shoob many pats. Pupper wrinkler long water shoob puggorino doing me a frighten blep, borkf you are doin me a concern boofers.',
    content:
      'Shoob what a nice floof wrinkler fluffer many pats smol, maximum borkdrive long water shoob many pats. Pupper wrinkler long water shoob puggorino doing me a frighten blep, borkf you are doin me a concern boofers. Ur givin me a spook heckin angery woofer puggo boof heck, borking doggo borkf borkdrive. Adorable doggo most angery pupper I have ever seen maximum borkdrive doing me a frighten pupper, extremely cuuuuuute pats fluffer sub woofer super chub, adorable doggo lotsa pats long bois.',
    featuredImage: 'https://placedog.net/200/250',
    fullName: 'John Doe',
    comments: [
      {
        content:
          'Shoob what a nice floof wrinkler fluffer many pats smol, maximum borkdrive long water shoob many pats. Pupper wrinkler long water shoob puggorino doing me a frighten blep, borkf you are doin me a concern boofers.'
      },
      {
        content:
          'Shoob what a nice floof wrinkler fluffer many pats smol, maximum borkdrive long water shoob many pats. Pupper wrinkler long water shoob puggorino doing me a frighten blep, borkf you are doin me a concern boofers.'
      },
      {
        content:
          'Shoob what a nice floof wrinkler fluffer many pats smol, maximum borkdrive long water shoob many pats. Pupper wrinkler long water shoob puggorino doing me a frighten blep, borkf you are doin me a concern boofers.'
      }
    ],
    createdAt: moment()
  },
  {
    id: _.uniqueId('posts_'),
    title: _.uniqueId('posts_'),
    description:
      'Shoob what a nice floof wrinkler fluffer many pats smol, maximum borkdrive long water shoob many pats. Pupper wrinkler long water shoob puggorino doing me a frighten blep, borkf you are doin me a concern boofers.',
    content:
      'Shoob what a nice floof wrinkler fluffer many pats smol, maximum borkdrive long water shoob many pats. Pupper wrinkler long water shoob puggorino doing me a frighten blep, borkf you are doin me a concern boofers. Ur givin me a spook heckin angery woofer puggo boof heck, borking doggo borkf borkdrive. Adorable doggo most angery pupper I have ever seen maximum borkdrive doing me a frighten pupper, extremely cuuuuuute pats fluffer sub woofer super chub, adorable doggo lotsa pats long bois.',
    featuredImage: 'https://placedog.net/200/250',
    fullName: 'John Doe',
    comments: [
      {
        content:
          'Shoob what a nice floof wrinkler fluffer many pats smol, maximum borkdrive long water shoob many pats. Pupper wrinkler long water shoob puggorino doing me a frighten blep, borkf you are doin me a concern boofers.'
      },
      {
        content:
          'Shoob what a nice floof wrinkler fluffer many pats smol, maximum borkdrive long water shoob many pats. Pupper wrinkler long water shoob puggorino doing me a frighten blep, borkf you are doin me a concern boofers.'
      },
      {
        content:
          'Shoob what a nice floof wrinkler fluffer many pats smol, maximum borkdrive long water shoob many pats. Pupper wrinkler long water shoob puggorino doing me a frighten blep, borkf you are doin me a concern boofers.'
      }
    ],
    createdAt: moment()
  },
  {
    id: _.uniqueId('posts_'),
    title: _.uniqueId('posts_'),
    description:
      'Shoob what a nice floof wrinkler fluffer many pats smol, maximum borkdrive long water shoob many pats. Pupper wrinkler long water shoob puggorino doing me a frighten blep, borkf you are doin me a concern boofers.',
    content:
      'Shoob what a nice floof wrinkler fluffer many pats smol, maximum borkdrive long water shoob many pats. Pupper wrinkler long water shoob puggorino doing me a frighten blep, borkf you are doin me a concern boofers. Ur givin me a spook heckin angery woofer puggo boof heck, borking doggo borkf borkdrive. Adorable doggo most angery pupper I have ever seen maximum borkdrive doing me a frighten pupper, extremely cuuuuuute pats fluffer sub woofer super chub, adorable doggo lotsa pats long bois.',
    featuredImage: 'https://placedog.net/200/250',
    fullName: 'John Doe',
    comments: [
      {
        content:
          'Shoob what a nice floof wrinkler fluffer many pats smol, maximum borkdrive long water shoob many pats. Pupper wrinkler long water shoob puggorino doing me a frighten blep, borkf you are doin me a concern boofers.'
      },
      {
        content:
          'Shoob what a nice floof wrinkler fluffer many pats smol, maximum borkdrive long water shoob many pats. Pupper wrinkler long water shoob puggorino doing me a frighten blep, borkf you are doin me a concern boofers.'
      },
      {
        content:
          'Shoob what a nice floof wrinkler fluffer many pats smol, maximum borkdrive long water shoob many pats. Pupper wrinkler long water shoob puggorino doing me a frighten blep, borkf you are doin me a concern boofers.'
      }
    ],
    createdAt: moment()
  },
  {
    id: _.uniqueId('posts_'),
    title: _.uniqueId('posts_'),
    description:
      'Shoob what a nice floof wrinkler fluffer many pats smol, maximum borkdrive long water shoob many pats. Pupper wrinkler long water shoob puggorino doing me a frighten blep, borkf you are doin me a concern boofers.',
    content:
      'Shoob what a nice floof wrinkler fluffer many pats smol, maximum borkdrive long water shoob many pats. Pupper wrinkler long water shoob puggorino doing me a frighten blep, borkf you are doin me a concern boofers. Ur givin me a spook heckin angery woofer puggo boof heck, borking doggo borkf borkdrive. Adorable doggo most angery pupper I have ever seen maximum borkdrive doing me a frighten pupper, extremely cuuuuuute pats fluffer sub woofer super chub, adorable doggo lotsa pats long bois.',
    featuredImage: 'https://placedog.net/200/250',
    fullName: 'John Doe',
    comments: [
      {
        content:
          'Shoob what a nice floof wrinkler fluffer many pats smol, maximum borkdrive long water shoob many pats. Pupper wrinkler long water shoob puggorino doing me a frighten blep, borkf you are doin me a concern boofers.'
      },
      {
        content:
          'Shoob what a nice floof wrinkler fluffer many pats smol, maximum borkdrive long water shoob many pats. Pupper wrinkler long water shoob puggorino doing me a frighten blep, borkf you are doin me a concern boofers.'
      },
      {
        content:
          'Shoob what a nice floof wrinkler fluffer many pats smol, maximum borkdrive long water shoob many pats. Pupper wrinkler long water shoob puggorino doing me a frighten blep, borkf you are doin me a concern boofers.'
      }
    ],
    createdAt: moment()
  },
  {
    id: _.uniqueId('posts_'),
    title: _.uniqueId('posts_'),
    description:
      'Shoob what a nice floof wrinkler fluffer many pats smol, maximum borkdrive long water shoob many pats. Pupper wrinkler long water shoob puggorino doing me a frighten blep, borkf you are doin me a concern boofers.',
    content:
      'Shoob what a nice floof wrinkler fluffer many pats smol, maximum borkdrive long water shoob many pats. Pupper wrinkler long water shoob puggorino doing me a frighten blep, borkf you are doin me a concern boofers. Ur givin me a spook heckin angery woofer puggo boof heck, borking doggo borkf borkdrive. Adorable doggo most angery pupper I have ever seen maximum borkdrive doing me a frighten pupper, extremely cuuuuuute pats fluffer sub woofer super chub, adorable doggo lotsa pats long bois.',
    featuredImage: 'https://placedog.net/200/250',
    fullName: 'John Doe',
    comments: [
      {
        content:
          'Shoob what a nice floof wrinkler fluffer many pats smol, maximum borkdrive long water shoob many pats. Pupper wrinkler long water shoob puggorino doing me a frighten blep, borkf you are doin me a concern boofers.'
      },
      {
        content:
          'Shoob what a nice floof wrinkler fluffer many pats smol, maximum borkdrive long water shoob many pats. Pupper wrinkler long water shoob puggorino doing me a frighten blep, borkf you are doin me a concern boofers.'
      },
      {
        content:
          'Shoob what a nice floof wrinkler fluffer many pats smol, maximum borkdrive long water shoob many pats. Pupper wrinkler long water shoob puggorino doing me a frighten blep, borkf you are doin me a concern boofers.'
      }
    ],
    createdAt: moment()
  }
];

export const DOG_BREEDS = [
  {
    id: _.uniqueId('breed_'),
    breed: 'Afador'
  },
  {
    id: _.uniqueId('breed_'),
    breed: 'Bulldog'
  },
  {
    id: _.uniqueId('breed_'),
    breed: 'Basset Retriever'
  },
  {
    id: _.uniqueId('breed_'),
    breed: 'Beagle'
  },
  {
    id: _.uniqueId('breed_'),
    breed: 'Chihuahua'
  },
  {
    id: _.uniqueId('breed_'),
    breed: 'Dalmatian'
  },
  {
    id: _.uniqueId('breed_'),
    breed: 'Fox Terrier'
  },
  {
    id: _.uniqueId('breed_'),
    breed: 'Golden Retriever'
  },
  {
    id: _.uniqueId('breed_'),
    breed: 'Jack Chi'
  },
  {
    id: _.uniqueId('breed_'),
    breed: 'Labrador Retriever'
  }
];

export const CAT_BREEDS = [
  {
    id: _.uniqueId('breed_'),
    breed: 'Cat1'
  },
  {
    id: _.uniqueId('breed_'),
    breed: 'Cat2'
  },
  {
    id: _.uniqueId('breed_'),
    breed: 'Cat3'
  }
];
