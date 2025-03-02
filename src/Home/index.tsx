import { Route } from 'react-router-dom';
import {
  IonTabs,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonTabBar,
  IonRouterOutlet,
  IonFabButton,
} from '@ionic/react';
import { person, addOutline, helpCircle, menu, home } from 'ionicons/icons';
import savedSamples from 'models/savedSamples';
import PendingSurveysBadge from 'common/Components/PendingSurveysBadge';
import appModel from 'models/app';
import userModel from 'models/user';
import { Trans as T } from 'react-i18next';
import Species from './Species';
import Help from './Help';
import UserRecords from './Records';
import Menu from './Menu';
import './styles.scss';

const SpeciesWrap = () => (
  <Species
    appModel={appModel}
    savedSamples={savedSamples}
    userModel={userModel}
  />
);

const MenuWrap = () => <Menu userModel={userModel} appModel={appModel} />;

const HomeComponent = () => (
  <IonTabs>
    <IonRouterOutlet>
      <Route path="/home/species" component={SpeciesWrap} exact />
      <Route path="/home/help" component={Help} exact />
      <Route path="/home/user-records" component={UserRecords} exact />
      <Route path="/home/menu" component={MenuWrap} exact />
    </IonRouterOutlet>

    <IonTabBar slot="bottom">
      <IonTabButton tab="home/species" href="/home/species">
        <IonIcon icon={home} />
        <IonLabel>
          <T>Home</T>
        </IonLabel>
      </IonTabButton>
      <IonTabButton tab="/home/user-records" href="/home/user-records">
        <IonIcon icon={person} />
        <IonLabel>
          <T>Records</T>
        </IonLabel>
        <PendingSurveysBadge savedSamples={savedSamples} />
      </IonTabButton>
      <IonTabButton>
        <IonFabButton className="fab-button" routerLink="/record/main">
          <IonIcon src={addOutline} />
        </IonFabButton>
      </IonTabButton>
      <IonTabButton tab="help" href="/home/help">
        <IonIcon icon={helpCircle} />
        <IonLabel>
          <T>Help</T>
        </IonLabel>
      </IonTabButton>
      <IonTabButton tab="/home/menu" href="/home/menu">
        <IonIcon icon={menu} />
        <IonLabel>
          <T>Menu</T>
        </IonLabel>
      </IonTabButton>
    </IonTabBar>
  </IonTabs>
);

export default HomeComponent;
