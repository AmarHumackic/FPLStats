import AsyncStorage from '@react-native-async-storage/async-storage';
import {isNumberRegex} from '@utils/regex';

const SESSION_TEAM_ID = '@SESSION_TEAM_ID';

export const getSessionStorage = async () => {
  try {
    const data = await AsyncStorage.getItem(SESSION_TEAM_ID);

    if (data && isNumberRegex.test(data)) {
      const teamId = parseInt(data, 10);
      return teamId;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

export const setSessionStorage = async (teamId: number) => {
  try {
    await AsyncStorage.setItem(SESSION_TEAM_ID, teamId.toString());
    return true;
  } catch (error) {
    return false;
  }
};

export const removeSessionStorage = async () => {
  try {
    await AsyncStorage.removeItem(SESSION_TEAM_ID);
    return true;
  } catch (error) {
    return false;
  }
};
