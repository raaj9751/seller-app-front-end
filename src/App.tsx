import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonPage,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTitle,
  IonToolbar,
  setupIonicReact,
  IonTabs,
  IonProgressBar
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import LoginPage from './pages/login';
import { cart, list, person, trendingUp } from 'ionicons/icons';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';
import { useAppContext } from './provider/appProvider';
import Tab4 from './pages/tab4';

setupIonicReact({
  rippleEffect: true,
  mode: 'md',
});

const App: React.FC = () => {
  const { userData, apiOnline } = useAppContext();

  return (
    <IonApp>
      <IonPage>
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle style={{ fontSize: 20 }}>CW MART</IonTitle>
            {apiOnline && <IonProgressBar color="light"></IonProgressBar>}
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonReactRouter>
            <IonTabs>
              <IonRouterOutlet>
                <Route exact path="/login"><LoginPage /></Route>
                <Route exact path="/list"><Tab1 /></Route>
                <Route exact path="/sales"><Tab2 /></Route>
                <Route exact path="/purchase"><Tab3 /></Route>
                <Route exact path="/profile"><Tab4 /></Route>
                <Route exact path="/">
                  <Redirect to={userData ? "/list" : '/login'} />
                </Route>
              </IonRouterOutlet>
              <IonTabBar style={{ display: userData ? "" : "none" }} slot="bottom">
                <IonTabButton tab="list" href="/list">
                  <IonIcon icon={list} />
                  {/* <IonLabel>Listen now</IonLabel> */}
                </IonTabButton>

                <IonTabButton tab="sales" href="/sales">
                  <IonIcon icon={trendingUp} />
                  {/* <IonLabel>Radio</IonLabel> */}
                </IonTabButton>

                <IonTabButton tab="purchase" href="/purchase">
                  <IonIcon icon={cart} />
                  {/* <IonLabel>Library</IonLabel> */}
                </IonTabButton>

                <IonTabButton tab="profile" href="/profile">
                  <IonIcon icon={person} />
                  {/* <IonLabel>Search</IonLabel> */}
                </IonTabButton>
              </IonTabBar>
            </IonTabs>
          </IonReactRouter>
        </IonContent>
      </IonPage>
    </IonApp>
  )
}

export default App;
