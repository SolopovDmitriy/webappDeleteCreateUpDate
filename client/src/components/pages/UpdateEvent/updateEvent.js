import React, { Component } from 'react';
import axios from 'axios';
import './updateEvent.css';
import { withRouter } from "react-router";
import {NavLink} from "react-router-dom";
class UpdateEvent extends Component {
  constructor(props) {
    super(props);

    this.state = {
        title: '',
        slogan: '',
        // imgsrc: '',
        content:'',
      error: null,
      isLoaded: false,
      item : null
    };
    this.uploadEventData = this.uploadEventData.bind(this);
  }

  componentDidMount() {
    this.uploadEventData();
  }


  uploadEventData() {
    console.log('/event/' + this.props.match.params.id);
    axios({
      method: 'get',
      url: '/event/' + this.props.match.params.id,
      responseType: 'json'
    }).then(response => {
      console.dir(response);
      this.setState({
        isLoaded:true,
        item:response.data
      })
    }).catch(error => {
      this.setState({
        error:error
      });
      console.log(error);
    })
  }

  clickHandler(e){ // обработчик события нажатия на кнопку
    e.preventDefault();//останавливает стандартную отправку, т.е. js - oм
    console.log('http://localhost:3000/event/'+ this.props.match.params.id);
    axios
        .put(
            'http://localhost:3000/event/'+ this.props.match.params.id ,
            {
              title: this.state.title,
              slogan: this.state.slogan,
              content: this.state.content
            },
            {headers: {"Content-Type": "application/json"}}
        )
        .then(r => console.log(r.status))
        .catch(e => console.log(e));



    // axios({
    //   method: 'put',
    //   url: 'http://localhost:3000/event/'+ this.props.match.params.id ,
    //   data: {
    //     title: this.state.title,
    //     slogan: this.state.slogan,
    //     content: this.state.content
    //   }
    // }).then(() => console.log('event updated'))
    //     .catch(err => {
    //       console.error(err);
    //     });
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



    var error = this.state.error;
    var isLoaded = this.state.isLoaded;
    var item = this.state.item;



    if (error) {
      return <div className="alert alert-danger" role="alert">
        {error.message}
      </div>
    } else if (!isLoaded) {
      return <div className="alert alert-warning" role="alert">
        Данные загружаются.........
      </div>
    } else {
      this.props.title1 = item.title;
      return (
          <div>
            <br />
            <div className="container">
              <h1 > update</h1>
              <form>
                <div className="form-group">
                  <input
                      type="text"
                      className="form-control"
                      name="title"
                      onChange={this.handleInputChange.bind(this)}
                  />
                </div>
                <br />
                <div  className="form-group">
                  <input
                      type="text"
                      className="form-control"
                      name="slogan"
                      value = {item.slogan}
                      onChange={this.handleInputChange.bind(this)}
                  />
                </div>
                <br />
                <div className="form-group">
                  <input
                      type="text"
                      className="form-control"
                      name="content"
                      value = {item.content}
                      onChange={this.handleInputChange.bind(this)}
                  />
                </div>
                <br />
                <div >
                  <input type="button" value="Update" onClick={this.clickHandler.bind(this)}/>
                </div>
              </form>

            </div>
          </div>
      );
    }


  }




}


export default withRouter(UpdateEvent);