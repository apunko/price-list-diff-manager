import React from 'react';

class FormContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      title: 'new',
    };
  }

  render() {
    return (
      <div>{this.state.title}</div>
    );
  }
}

export default FormContainer;
