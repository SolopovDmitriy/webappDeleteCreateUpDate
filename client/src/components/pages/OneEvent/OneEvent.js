import React from 'react';
import axios from "axios";
import './OneEvent.css';
import { withRouter } from "react-router";
import {NavLink} from "react-router-dom";


class OneEvent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            item : null
        }         
        this.uploadEventData = this.uploadEventData.bind(this);
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

    componentDidMount() {
        this.uploadEventData();
    }

    render() {
        const {error, isLoaded, item} = this.state;
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
                        <h1 className="text-center"> One Item</h1>                     
                               
                        <div className="card-body">
                            <h5 className="card-title">{item.title}</h5>
                            <p className="card-slogan">{item.slogan}</p>
                            <p className="card-content">{item.content}</p>
                        </div>
                        <NavLink className="nav-link" to={'/delete_event/' + item._id}>
                            Удалить событие
                        </NavLink>
                        <NavLink className="nav-link" to={'/update_event/' + item._id}>
                            Редактировать событие
                        </NavLink>
                    </div>
                </main>
            )
        }
    }
}


export default withRouter(OneEvent);