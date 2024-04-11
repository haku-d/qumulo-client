import _flushPromises from 'flush-promises';
import { act } from 'react-dom/test-utils';

export const flushPromises = async () => {
  await act(async () => {
    await _flushPromises();
  });
};
