import React from 'react';
import OpenDialog from '../components/open-dialog';

class AppContainer extends React.Component {
  render() {
    return (
      <>
        <OpenDialog label="Select old file" />
        <OpenDialog label="Select new file" />
        <OpenDialog label="Select output directory" type="openDirectory" />
      </>
    );
  }
}

export default AppContainer;
