/* eslint-disable */
import React, { Component } from 'react';
import './App.scss';
import Student from './components/student/student';
import Group from './components/group/group';

class App extends Component {
  state = {
    studentList: [],
    groupList: [],
    isAddStudent: false,
    studentName: '',
  };

  getAllStudents = () => {
    const url = 'http://localhost:8080/students';
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          studentList: data,
        });
      });
  };

  componentDidMount() {
    this.getAllStudents();
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

  handleAddStudent = () => {
    this.setState({
      isAddStudent: true,
    });
  };

  handleNameChange = (event) => {
    this.setState({
      studentName: event.target.value,
    });
  };

  addNewStudent = (event) => {
    if (event.keyCode === 13) {
      const url = 'http://localhost:8080/student';
      fetch(url, {
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        method: 'POST',
        body: this.state.studentName,
      }).then((response) => {
        if (response.status === 201) {
          this.getAllStudents();
          alert('添加学员成功！');
        }
      });

      this.setState({
        isAddStudent: false,
        studentName: '',
      });
    }
  };

  render() {
    const { studentList, groupList, isAddStudent, studentName } = this.state;
    return (
      <div data-testid="app" className="App">
        <section className="student-group">
          <header className="student-list-header">
            <h1>分组列表</h1>
            <button type="button" onClick={this.handleGroup}>
              分组学员
            </button>
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
            {isAddStudent ? (
              <input
                type="text"
                value={studentName}
                onChange={this.handleNameChange}
                onKeyUp={this.addNewStudent}
              />
            ) : (
              <button type="button" onClick={this.handleAddStudent}>
                +添加学员
              </button>
            )}
          </section>
        </section>
      </div>
    );
  }
}

export default App;
