import _ from 'lodash';
import Chance from 'chance';

const chance = new Chance();

export const fieldGenerator = field => {
  if (_.isEqual(field, 'email')) {
    return generateEmail();
  } else if (_.isEqual(field, 'username')) {
    return generateUsername();
  } else if (_.isEqual(field, 'phone')) {
    return generatePhone();
  } else if (_.isEqual(field, 'name')) {
    return generateName();
  }
  return null;
};

export const unmaskPhone = (phone) => {
  let unmasked = phone;
  // remove 0 if it starts with 0
  if (unmasked.startsWith("0")) {
    unmasked = unmasked.substring(1);
  }
  // remove spaces between numbers
  unmasked = unmasked.replace(/\s+/g, '');
  return unmasked;
}

const PHONE_PREFIX = [
  '551',
  '552',
  '553',
  '554',
  '555',
  '531',
  '532',
  '533',
  '534',
  '535',
  '541',
  '542',
  '543',
  '544',
  '545'
];

const generateEmail = () => {
  const prefix = 'c_';
  const email = chance.email({ domain: 'shelty.com' });
  return prefix + email;
};

const generateUsername = () => {
  const prefix = 'shelty_';
  const username = chance.string({ length: 8, alpha: true });

  return prefix + username;
};

const generatePhone = () => {
  const prefix = PHONE_PREFIX[_.random(0, PHONE_PREFIX.length - 1)];
  const phone = chance.phone({ formatted: false });

  return prefix + phone.substring(3);
};

const generateName = () => {
  return chance.name();
};
