import AsyncStorage from '@react-native-async-storage/async-storage';

const savePreference = async (key: string, value: string) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.error("Error saving preference", error);
    }
  };

  const getPreference = async (key: string) => {
    try {
      return await AsyncStorage.getItem(key);
    } catch (error) {
      console.error("Error getting preference", error);
    }
  };

  const removePreference = async (key: string) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing preference", error);
    }
  };

  export { getPreference, removePreference, savePreference };
