import React from 'react';
import { Provider } from 'react-redux';

import { store } from './src/redux/store';

const App = () => {
  return (
    <Provider store={store}>
      {/* Navigation will come here */}
    </Provider>
  );
};

export default App;