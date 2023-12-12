import React, {useState as useStateMock} from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import NameResultsModal from './NameResultsModal';

jest.mock('react-native-modal', () => 'react-native-modal');
jest.mock('react-native-modal', () => 'react-native-modal');
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);
// Mocking useState
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));
const nameResultsData = [
  {
    EntryId: -1,
    Name: 'testEntryName',
    PlayerName: 'testPlayerName',
  },
];
const onSelectMock = jest.fn();
const onCloseMock = jest.fn();

test('verify modal will show up in case nameResults.length > 0', () => {
  // Mock the initial state and the setState function
  (useStateMock as jest.Mock).mockReturnValue([0, jest.fn()]);

  const {getByTestId} = render(
    <NameResultsModal
      nameResults={nameResultsData}
      onSelect={onSelectMock}
      onClose={onCloseMock}
    />,
  );

  const modal = getByTestId('authNameResultsModal');
  expect(modal?.props?.isVisible).toBeTruthy();
});

test('verify modal will not show up in case nameResults.length === 0', () => {
  // Mock the initial state and the setState function
  (useStateMock as jest.Mock).mockReturnValue([0, jest.fn()]);

  const {getByTestId} = render(
    <NameResultsModal
      nameResults={[]}
      onSelect={onSelectMock}
      onClose={onCloseMock}
    />,
  );

  const modal = getByTestId('authNameResultsModal');
  expect(modal?.props?.isVisible).toBeFalsy();
});

test('verify modal will be submitted in case the team is selected', () => {
  // Mock the initial state and the setState function
  (useStateMock as jest.Mock).mockReturnValue([
    nameResultsData[0].EntryId,
    jest.fn(),
  ]);

  const {getByText} = render(
    <NameResultsModal
      nameResults={nameResultsData}
      onSelect={onSelectMock}
      onClose={onCloseMock}
    />,
  );

  const submitBtn = getByText('Submit');
  fireEvent.press(submitBtn);

  expect(onSelectMock).toHaveBeenCalledWith(nameResultsData[0].EntryId);
});

test('verify selectedTeam will become undefined after the modal is closed', () => {
  // Mock the initial state and the setState function
  const setStateFn = jest.fn();
  (useStateMock as jest.Mock).mockReturnValue([
    nameResultsData[0].EntryId,
    setStateFn,
  ]);

  const {getByTestId} = render(
    <NameResultsModal
      nameResults={nameResultsData}
      onSelect={onSelectMock}
      onClose={onCloseMock}
    />,
  );

  // fire backdropPress event on modal
  const modal = getByTestId('authNameResultsModal');
  modal.props.onBackdropPress();

  // expect useState value is set to undefined
  expect(setStateFn).toHaveBeenCalledWith(undefined);
});
