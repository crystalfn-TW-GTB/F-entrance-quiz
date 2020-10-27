/* eslint-disable */
import React, { Component } from 'react';
import './App.scss';
import Student from './components/student/student';
import Group from './components/group/group';

class App extends Component {
  state = {
    studentList: [],
    groupList: [],
  };

  componentDidMount() {
    const url = 'http://localhost:8080/students';
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          studentList: data,
        });
      });
  }

  handleGroup = () => {
    const url = 'http://localhost:8080/groups';
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.setState({
          groupList: data,
        });
      });
  };

  render() {
    const { studentList, groupList } = this.state;
    return (
      <div data-testid="app" className="App">
        <section className="student-group">
          <header className="student-list-header">
            <h1>分组列表</h1>
            <button onClick={this.handleGroup}>分组学员</button>
          </header>
          <section>
            {groupList.map((group, index) => (
              <Group key={index} name={group.name} studentDtoList={group.studentDtoList} />
            ))}
          </section>
        </section>
        <section className="student-list">
          <header>
            <h1>学员列表</h1>
          </header>
          <section>
            {studentList.map((student) => (
              <Student key={student.id} id={student.id} name={student.name} />
            ))}
            <button>+添加学员</button>
          </section>
        </section>
      </div>
    );
  }
}

export default App;
