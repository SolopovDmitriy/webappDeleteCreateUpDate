import React, { Component } from 'react';
import axios from 'axios';
import './DeleteEvent.css';
import { withRouter } from "react-router";

class DeleteEvent extends Component {
    constructor(props) {
        super(props);
    }

    clickHandler(e){ // обработчик события нажатия на кнопку
        e.preventDefault();//останавливает стандартную отправку, т.е. js - oм
        axios({//библиотека для запроса к серверу
            method: 'delete',
            url: '/event/' + this.props.match.params.id
        }).then(() => console.log('event Created'))
            .catch(err => {
                console.error(err);
            });
    }

    render() {
        return (
                <div className="container">
                    <form>
                        <div>
                            <input type="button" value="Delete" onClick={this.clickHandler.bind(this)}/>
                        </div>
                    </form>
                </div>
        );
    }
}

export default withRouter(DeleteEvent);
