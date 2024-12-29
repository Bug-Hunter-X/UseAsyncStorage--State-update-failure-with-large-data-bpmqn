import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MAX_CHUNK_SIZE = 1000; // Adjust as needed

const useAsyncStorageLargeData = (key) => {
  const [value, setValue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const chunks = [];
        let chunkKey;
        let i = 0;
        do {
          chunkKey = `${key}_${i++}`;
          const chunk = await AsyncStorage.getItem(chunkKey);
          if (chunk) chunks.push(chunk);
        } while (chunkKey);
        setValue(chunks.join(''));
      } catch (e) {
        setError(e);
      }
      finally {
        setLoading(false);
      }
    };
    loadData();
  }, [key]);

  const setValueAsync = async (newValue) => {
    try {
      setLoading(true);
      setError(null);
      await AsyncStorage.multiRemove(Array.from({ length: 1000 }, (_, i) => `${key}_${i}`));
      let i = 0;
      for (let j = 0; j < newValue.length; j += MAX_CHUNK_SIZE) {
        const chunk = newValue.substring(j, j + MAX_CHUNK_SIZE);
        await AsyncStorage.setItem(`${key}_${i++}`, chunk);
      }
      setValue(newValue);
    } catch (e) {
      setError(e);
    }
    finally {
      setLoading(false);
    }
  };

  return { value, loading, error, setValue: setValueAsync };
};
export default useAsyncStorageLargeData;