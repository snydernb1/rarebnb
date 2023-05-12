import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";

import Spots from './components/Spots/AllSpots/index'
import GetSingleSpot from "./components/Spots/SingleSpot";
import CreateSpot from "./components/Spots/CreateSpot";
import ManageSpots from "./components/Spots/ManageSpots";
import EditSpot from "./components/Spots/EditSpot";
import FourOhFour from "./components/FourOhFour";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>

          <Route exact path='/'>
            <Spots />
          </Route>

          <Route path='/new'>
            <CreateSpot />
          </Route>

          <Route path='/users/:userId'>
            <ManageSpots />
          </Route>

          <Route path='/spot/:spotId/edit'>
            <EditSpot />
          </Route>

          <Route path='/spot/:spotId'>
            <GetSingleSpot />
          </Route>

          <Route>
            <FourOhFour />
          </Route>

        </Switch>
      )}
    </>
  );
}

export default App;
