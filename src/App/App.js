/* eslint-disable */
import React, { Component } from 'react';
import './App.scss';
import Student from './components/student/student';

class App extends Component {
  state = {
    studentList: [],
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

  render() {
    const { studentList } = this.state;
    return (
      <div data-testid="app" className="App">
        <section className="student-group">
          <header>
            <h1>分组列表</h1>
            <button>分组学员</button>
          </header>
        </section>
        <section className="student-list">
          <header>
            <h1>学员列表</h1>
            <section>
              {studentList.map((student) => (
                <Student key={student.id} id={student.id} name={student.name} />
              ))}
            </section>
          </header>
        </section>
      </div>
    );
  }
}

export default App;
