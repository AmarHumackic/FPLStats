import {jest} from '@jest/globals';

global.jest = jest;

jest.mock('react-native-modal', () => 'react-native-modal');
jest.mock('react-native-modal', () => 'react-native-modal');
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);
