import React from 'react';
import {NavLink} from "react-router-dom";
import axios from "axios";
import './Event.css';

export default class Event extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            currentEvent: null
        }
        this.uploadEventData = this.uploadEventData.bind(this);
        console.log(this.props.location.pathname);
    }

    uploadEventData() {
        axios({
            method: 'get',
            url: this.props.location.pathname,
            responseType: 'json'
        }).then(response => {
            console.dir(response);
            this.setState({
                isLoaded: true,
                currentEvent: response.data[0]
            })
        }).catch(error => {
            this.setState({
                error: error
            });
            console.log(error);
        })
    }

    componentDidMount() {
        this.uploadEventData();
    }

    render() {
        const {error, isLoaded, currentEvent} = this.state;
        if (error) {
            return <div className="alert alert-danger" role="alert">
                {error.message}
            </div>
        } else if (!isLoaded) {
            return <div className="alert alert-warning" role="alert">
                Данные загружаются.........
            </div>
        } else {
            return (
                <main>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-3"></div>
                            <div className="col-md-6">
                                <h1 className="text-center">Текущее событие</h1>
                                <div className="Home-body">
                                    <h1>{currentEvent.title}</h1>
                                    <p>{currentEvent.slogan}</p>
                                    <img src={currentEvent.imgsrc} alt={currentEvent.title}/>
                                    <textarea defaultValue={currentEvent.content} />
                                </div>
                            </div>
                            <div className="col-md-3"></div>
                        </div>
                    </div>
                </main>
            )
        }
    }
}
