// TODO GTB-4: - 不建议整个disable eslint，需解决eslint的error
/* eslint-disable */
import React, { Component } from 'react';
import './App.scss';
import Student from './components/student/student';
import Group from './components/group/group';

// TODO GTB-1: * 页面样式还原度标高
// TODO GTB-1: * 基本完成所有需求，但刷新页面后未显示之前已分好的组；分组，列表，添加等都是通过接口请求数据完成
// TODO GTB-2: * 没有测试
// TODO GTB-3: * 有划分分组列表和学员item，可以进一步划分组件，现在App组件太长了
// TODO GTB-3: * 语义化标签使用不错
// TODO GTB-3: * 使用了Flex布局，scss及其部分特性
// TODO GTB-3: * 运用了ES6+语法及fetch
// TODO GTB-3: * 运用React相关知识点
// TODO GTB-4: * 小步提交做的不错
// TODO GTB-4: * scss有地方嵌套过深
// TODO GTB-4: * 没有抽出Api请求层
// TODO GTB-4: * 有一定层度等组件拆分与复用，但可以加强，避免长组件/方法
class App extends Component {
  // TODO GTB-4: - 组件拆分不够，导致state堆砌在App中
  state = {
    studentList: [],
    groupList: [],
    isAddStudent: false,
    // TODO GTB-4: - 这个state可以不需要，不一定要做双向绑定
    studentName: '',
  };

  // TODO GTB-4: - 可以抽取API请求层
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

  // TODO GTB-4: - 冗余方法，不需要双向绑定
  handleNameChange = (event) => {
    this.setState({
      studentName: event.target.value,
    });
  };

  // TODO GTB-3: - 下面event中可以拿到value
  addNewStudent = (event) => {
    if (event.keyCode === 13) {
      const url = 'http://localhost:8080/student';
      // TODO GTB-4: - 抽取API层，且配置可以抽取到utils/config下
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
      // TODO GTB-3: + 语义化标签使用不错
      // TODO GTB-4: - 内容过长，思考进一步进行组件拆分
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
