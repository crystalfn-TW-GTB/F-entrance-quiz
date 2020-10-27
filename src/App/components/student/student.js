import React, { Component } from 'react';
import './student.scss';

class Student extends Component {
  render() {
    const { id, name } = this.props;
    return (
      <div className="student">
        <span>
          {id}.{name}
        </span>
      </div>
    );
  }
}

export default Student;
