import React, { Component } from 'react';
import './student.scss';

// TODO GTB-3: - UI组件可以写成函数组件形式
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
