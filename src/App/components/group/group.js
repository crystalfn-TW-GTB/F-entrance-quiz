import React, { Component } from 'react';
import Student from '../student/student';
import './group.scss';

class Group extends Component {
  render() {
    const { name, studentDtoList } = this.props;
    return (
      <div className="group">
        <header className="group-header">
          <span>{name}</span>
        </header>
        <section>
          {studentDtoList.map((student) => (
            <Student key={student.id} id={student.id} name={student.name} />
          ))}
        </section>
      </div>
    );
  }
}

export default Group;
