import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import BottomTab from '@navigation/BottomTab';
import Auth from '@screens/Auth';
import FlashMessage from 'react-native-flash-message';
import {useSessionContext} from '@services/sessionContext';
import FocusAwareStatusBar from '@components/common/FocusAwareStatusBar';
import {colors} from './constants';
import BootSplash from 'react-native-bootsplash';

const App = () => {
  const {teamId, loadingSession, checkSessionHandler} = useSessionContext();

  useEffect(() => {
    checkSessionHandler();
  }, [checkSessionHandler]);

  useEffect(() => {
    if (!loadingSession) {
      BootSplash.hide({fade: true});
    }
  }, [loadingSession]);

  return (
    <NavigationContainer>
      <FocusAwareStatusBar
        barStyle={'dark-content'}
        backgroundColor={colors.backgroundPrimary}
      />
      {teamId ? <BottomTab /> : <Auth />}
      <FlashMessage position="top" />
    </NavigationContainer>
  );
};

export default App;
