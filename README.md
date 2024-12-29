# Expo useAsyncStorage Bug with Large Data

This repository demonstrates a bug encountered when using Expo's `useAsyncStorage` hook with large datasets. The hook inconsistently updates the state, leading to stale data. This is likely due to limitations in handling large asynchronous operations in AsyncStorage.

## Bug Reproduction

1. Clone this repository.
2. Run `npm install`.
3. Run `expo start`.
4. Observe the inconsistent state updates when interacting with the large data stored in AsyncStorage.

## Solution

The provided solution involves chunking the large data before storing and retrieving it. This avoids exceeding the limits of AsyncStorage. Refer to `bugSolution.js` for the implementation details.

## Note

This solution is a workaround. A more robust approach from the Expo team to improve AsyncStorage handling of large data would be ideal.  Consider alternatives like MMKV for significantly large data.
