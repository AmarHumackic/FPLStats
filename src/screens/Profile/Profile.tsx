import {View, Text, Button} from 'react-native';
import React from 'react';
import {removeSession} from '@services/session';
import {useQueryClient} from '@tanstack/react-query';

type Props = {};

const Profile = ({}: Props) => {
  const queryClient = useQueryClient();

  const removeSessionHandler = async () => {
    const isSuccess = await removeSession();

    if (isSuccess) {
      // remove session from global cache
      queryClient.removeQueries({
        queryKey: ['teamId'],
        exact: true,
      });
    }
  };

  return (
    <View>
      <Text>Profile</Text>

      <Button title="Remove Session" onPress={removeSessionHandler} />
    </View>
  );
};

export default Profile;
