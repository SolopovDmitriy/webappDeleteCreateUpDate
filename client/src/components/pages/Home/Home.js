import React from 'react';
import {NavLink} from "react-router-dom";
import axios from "axios";
import  './Home.css';
 export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            navigationMaps: [] //инициализировать данными ответа сервера
        }
        this.uploadNavigationMaps = this.uploadNavigationMaps.bind(this);
    }

    uploadNavigationMaps() {
        axios({
            method: 'get',
            url: '/navigationmaps',
            responseType: 'json'
        }).then(response => {
            console.dir(response);
            this.setState({
                isLoaded:true,
                navigationMaps:response.data
            })
        }).catch(error => {
            this.setState({
                error:error
            });
            console.log(error);
        })
    }

    componentDidMount() {
        this.uploadNavigationMaps();
    }

    render() {
        const {error, isLoaded, navigationMaps} = this.state;
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
                        <div className="Home-body">
                            <div className="NavigationMaps">
                                {
                                    navigationMaps.map((item, index) =>
                                        <NavLink className="navbar-brand" to={item.href} key={index}>
                                            <div className="card" style={{width: '18rem'}}>
                                                <div className="card-body">
                                                    <h5 className="card-title">{item.title}</h5>
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
