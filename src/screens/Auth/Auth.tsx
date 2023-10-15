import {Text, TextInput} from 'react-native';
import React, {useState} from 'react';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {fetchManager, searchByTeamName} from '@services/api';
import styles from './Auth.styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {isNumberRegex} from '@utils/regex';
import {isNullOrEmpty} from '@utils/isNullOrEmpty';
import {setSession} from '@services/session';
import {colors, sizes} from '@constants/';
import Toast from 'react-native-toast-message';
import {AxiosError} from 'axios';
import {SearchByNameResult} from 'src/types/auth';
import NameResultsModal from '@components/Auth/NameResultsModal';
import Button from '@components/common/Button';

type Props = {};

const Auth = ({}: Props) => {
  const [input, setInput] = useState('');
  const [isTeamIdSearch, setIsTeamIdSearch] = useState(true);
  const [isSubmit, setIsSubmit] = useState(false);
  const [nameResults, setNameResults] = useState<SearchByNameResult[]>([]); // search by name modal

  const queryClient = useQueryClient();

  const {isFetching: idFetching} = useQuery(
    ['manager', input],
    () => fetchManager(parseInt(input, 10)),
    {
      enabled: isTeamIdSearch && isSubmit,
      onSuccess: data => {
        setSession(data.id);
        queryClient.setQueryData(['teamId'], data.id); // store session in a cache to have it globally available
      },
      onError: (error: AxiosError) =>
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: error?.message,
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
          Toast.show({
            type: 'info',
            text1: 'Info',
            text2: 'Unable to find manager',
          });
        } else if (data.EntryBaseDatas.length === 1) {
          const teamId = data.EntryBaseDatas[0].EntryId;
          setSession(teamId);
          queryClient.setQueryData(['teamId'], teamId); // store session in a cache to have it globally available
        } else {
          setNameResults(data.EntryBaseDatas);
        }
      },
      onError: (error: AxiosError) =>
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: error?.message,
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
      Toast.show({
        type: 'info',
        text1: 'Info',
        text2: 'Enter your Team ID or Team Name',
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
