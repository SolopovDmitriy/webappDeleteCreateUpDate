import React, { Component } from 'react';
import axios from 'axios';
import './createEvent.css';

class CreateEvent extends Component {
  constructor(props) {
    super(props);

    this.state = {
        title: '',
        slogan: '',
        // imgsrc: '',
        content:''
    };
  }


  clickHandler(e){ // обработчик события нажатия на кнопку
    e.preventDefault();//останавливает стандартную отправку, т.е. js - oм
    axios({//библиотека для запроса к серверу
      method: 'post',
      url: 'http://localhost:3000/event' ,
      data: {
        title: this.state.title,
        slogan: this.state.slogan,
        content: this.state.content
      }
    }).then(() => console.log('event Created'))
        .catch(err => {
          console.error(err);
        });
  }


  handleInputChange(e) { // обработчик события изменения input
    this.setState({//метод предназначен для измения полей classa title, slogan и контент
      [e.target.name]: e.target.value,
    });
  };

  //   var key = 'title';
  //   var d = {
  //      [key]: 'hello',
  //   };
  //   d[key] = 'hello';






  render() {
    return (
      <div>
        <br />
        <div className="container">
          <form>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="title"
                placeholder="title"
                onChange={this.handleInputChange.bind(this)}
              />
            </div>
            <br />
            <div  className="form-group">
              <input
                type="text"
                className="form-control"
                name="slogan"
                placeholder="slogan"
                onChange={this.handleInputChange.bind(this)}
              />
            </div>
            <br />
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="content"
                placeholder="content"
                onChange={this.handleInputChange.bind(this)}
              />
            </div>
            <br />
            <div >
              <input type="button" value="Create" onClick={this.clickHandler.bind(this)}/>
            </div>
          </form>

        </div>
      </div>
    );
  }
}

export default CreateEvent;