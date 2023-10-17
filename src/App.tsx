import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import BottomTab from '@navigation/BottomTab';
import Auth from '@screens/Auth';
import FlashMessage from 'react-native-flash-message';
import {useSessionContext} from '@services/sessionContext';

const App = () => {
  const {teamId, loadingSession, checkSessionHandler} = useSessionContext();

  useEffect(() => {
    checkSessionHandler();
  }, [checkSessionHandler]);

  if (loadingSession) {
    return null;
  }

  return (
    <NavigationContainer>
      {teamId ? <BottomTab /> : <Auth />}
      <FlashMessage position="top" />
    </NavigationContainer>
  );
};

export default App;
