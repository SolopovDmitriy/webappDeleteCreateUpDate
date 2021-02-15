import React from 'react';
import {NavLink} from "react-router-dom";
import axios from "axios";
import './Events.css';
export default class Events extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            eventsData: [] //инициализировать данными ответа сервера
        }
        this.uploadEventsData = this.uploadEventsData.bind(this);
    }
    uploadEventsData() {
        axios({
            method: 'get',
            url: '/event',
            responseType: 'json'
        }).then(response => {
            console.dir(response);
            this.setState({
                isLoaded:true,
                eventsData:response.data
            })
        }).catch(error => {
            this.setState({
                error:error
            });
            console.log(error);
        })
    }

    componentDidMount() {
        this.uploadEventsData();
    }

    render() {
        const {error, isLoaded, eventsData} = this.state;
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
                    <div className="Home">
                        <h1 className="text-center">Главная</h1>
                        <NavLink className="nav-link" to='/create_event'>
                            Создать событие
                        </NavLink>

                        <div className="Home-body">
                            <div className="NavigationMaps">
                                {
                                    eventsData.map((item, index) =>
                                        <NavLink className="navbar-brand" to={'/event/' + item._id} key={index}>
                                            <div className="card" style={{width: '18rem'}}>
                                                <div className="card-body">
                                                    <h5 className="card-title">{item.title}</h5>
                                                    <p className="card-title">{item.slogan}</p>
                                                </div>
                                            </div>
                                        </NavLink>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </main>
            )
        }
    }
}
