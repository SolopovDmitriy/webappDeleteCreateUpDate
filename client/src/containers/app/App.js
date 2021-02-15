import './App.css';
import {HashRouter, Route, Switch} from  'react-router-dom';
import TemplatePage from  "../../components/TemplatePage/TemplatePage";

/*                                                   start*/
import HomeRoute from '../../components/pages/Home/Home';
import WhoopsRoute from '../../components/pages/Whoops/Whoops';
import EventsRoute from '../../components/pages/Events/Events';
import OneEventRoute from '../../components/pages/OneEvent/OneEvent';
import CreateEventRoute from '../../components/pages/CreateEvent/createEvent';
import DeleteEventRoute from '../../components/pages/DeleteEvent/DeleteEvent';
import UpdateEventRoute from '../../components/pages/UpdateEvent/updateEvent';
import EventRoute from '../../components/pages/Event/Event';
/*                                                   end*/

//

function App() {
  return (
      <HashRouter>
          <div className="container-fluid">
            <TemplatePage>
                <Switch>
                    <Route exact path='/' component={HomeRoute}/>
                    <Route exact path='/events' component={EventsRoute}/>
                    <Route exact path='/create_event' component={CreateEventRoute}/>
                    <Route exact path='/delete_event/:id' component={DeleteEventRoute}/>
                    <Route exact path='/event/:id' component={OneEventRoute}/>
                    <Route exact path='/update_event/:id' component={UpdateEventRoute}/>
                    <Route  path='/event/' component={EventRoute}/>
                    <Route component={WhoopsRoute}/>
                </Switch>
            </TemplatePage>
          </div>
      </HashRouter>
  );
}

export default App;
