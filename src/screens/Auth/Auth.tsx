import {Text, TextInput} from 'react-native';
import React, {useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import {fetchManager, searchByTeamName} from '@services/api';
import styles from './Auth.styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {isNumberRegex} from '@utils/regex';
import {isNullOrEmpty} from '@utils/isNullOrEmpty';
import {colors, sizes} from '@constants/';
import {AxiosError} from 'axios';
import {SearchByNameResult} from 'src/types/auth';
import NameResultsModal from '@components/Auth/NameResultsModal';
import Button from '@components/common/Button';
import {showMessage} from 'react-native-flash-message';
import {useSessionContext} from '@services/sessionContext';

type Props = {};

const Auth = ({}: Props) => {
  const [input, setInput] = useState('');
  const [isTeamIdSearch, setIsTeamIdSearch] = useState(true);
  const [isSubmit, setIsSubmit] = useState(false);
  const [nameResults, setNameResults] = useState<SearchByNameResult[]>([]); // search by name modal

  const {setSessionHandler} = useSessionContext();

  const {isFetching: idFetching} = useQuery(
    ['manager', input],
    () => fetchManager(parseInt(input, 10)),
    {
      enabled: isTeamIdSearch && isSubmit,
      onSuccess: data => setSessionHandler(data.id),
      onError: (error: AxiosError) =>
        showMessage({
          type: 'warning',
          message: error?.message,
        }),
      onSettled: () => setIsSubmit(false),
    },
  );

  const {isFetching: nameFetching} = useQuery(
    ['searchByTeamName', input],
    () => searchByTeamName(input),
    {
      enabled: !isTeamIdSearch && isSubmit,
      onSuccess: data => {
        if (data.EntryBaseDatas.length === 0) {
          showMessage({
            type: 'info',
            message: 'Unable to find manager',
          });
        } else if (data.EntryBaseDatas.length === 1) {
          const teamId = data.EntryBaseDatas[0].EntryId;
          setSessionHandler(teamId);
        } else {
          setNameResults(data.EntryBaseDatas);
        }
      },
      onError: (error: AxiosError) =>
        showMessage({
          type: 'warning',
          message: error?.message,
        }),
      onSettled: () => setIsSubmit(false),
    },
  );

  const changeInputHandler = (value: string) => {
    setInput(value);
    setIsTeamIdSearch(isNumberRegex.test(value) || isNullOrEmpty(value));
  };

  const submitHandler = () => {
    if (isNullOrEmpty(input)) {
      showMessage({
        type: 'info',
        message: 'Enter your Team ID or Team Name',
      });
    } else {
      setIsSubmit(true);
    }
  };

  const selectTeamNameHandler = (teamId: number) => {
    setInput(teamId.toString());
    setIsTeamIdSearch(true);
    setIsSubmit(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.label}>Enter your Team ID or Team Name</Text>
      <TextInput
        value={input}
        onChangeText={changeInputHandler}
        style={styles.input}
      />

      <Button
        title={isTeamIdSearch ? 'Submit' : 'Search'}
        backgroundColor={colors.primary}
        textColor={colors.text}
        textSize={sizes.ml}
        width={'60%'}
        height={40}
        marginTop={24}
        loading={idFetching || nameFetching}
        onPress={submitHandler}
      />

      <NameResultsModal
        nameResults={nameResults}
        onSelect={selectTeamNameHandler}
        onClose={() => setNameResults([])}
      />
    </SafeAreaView>
  );
};

export default Auth;
