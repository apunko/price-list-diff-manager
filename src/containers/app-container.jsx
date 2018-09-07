import React from 'react';
import OpenDialog from '../components/open-dialog';

class AppContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      oldFilePath: null,
      newFilePath: null,
      outputDirectoryPath: null,
    };

    this.updatePath = this.updatePath.bind(this);
  }

  updatePath(name, path) {
    this.setState({ [name]: path });
  }

  render() {
    return (
      <>
        <OpenDialog label="Select old file" name="oldFilePath" updatePath={this.updatePath} />
        <OpenDialog label="Select new file" name="newFilePath" updatePath={this.updatePath} />
        <OpenDialog label="Select output directory" name="outputDirectoryPath" updatePath={this.updatePath} type="openDirectory" />
        {this.state.oldFilePath}
        {this.state.newFilePath}
        {this.state.outputDirectoryPath}
      </>
    );
  }
}

export default AppContainer;
