import {Text, Button} from 'react-native';
import React from 'react';
import {useSessionContext} from '@services/sessionContext';
import {SafeAreaView} from 'react-native-safe-area-context';

type Props = {};

const Profile = ({}: Props) => {
  const {removeSessionHandler} = useSessionContext();

  return (
    <SafeAreaView>
      <Text>Profile</Text>

      <Button title="Remove Session" onPress={removeSessionHandler} />
    </SafeAreaView>
  );
};

export default Profile;
