import {View, Text, Button} from 'react-native';
import React from 'react';
import {useSessionContext} from '@services/sessionContext';

type Props = {};

const Profile = ({}: Props) => {
  const {removeSessionHandler} = useSessionContext();

  return (
    <View>
      <Text>Profile</Text>

      <Button title="Remove Session" onPress={removeSessionHandler} />
    </View>
  );
};

export default Profile;
