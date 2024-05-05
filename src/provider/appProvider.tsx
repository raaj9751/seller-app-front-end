import { IonButtons, IonContent, IonHeader, IonIcon, IonImg, IonModal, IonProgressBar, IonText, IonTitle, IonToolbar, useIonToast } from '@ionic/react';
import { checkmark, clipboard, close, closeCircleOutline } from 'ionicons/icons';
import { createContext, useContext, useState } from 'react';
import APPLogo from '../assets/logo.png';
import { APP_DATA } from '../constants';
import { AxiosCall } from '../service/apiCall';

interface ModelProps {
  isOpen: any,
  modelTitle: any,
  bodyRender: any,
}

const AppContext: any = createContext({});

export function useAppContext() {
  return useContext(AppContext) as any;
}

export function AppContextProvider({ children }: any) {
  const [displayModel, setDisplayModel] = useState<ModelProps>({ isOpen: false, modelTitle: APP_DATA.APP_NAME, bodyRender: null });
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem("userData") || "null") || null);
  const [apiOnline, setApiOnline] = useState(false);
  const [present] = useIonToast();
  const appImage = (() => <IonImg
    style={{ width: "60%" }}
    src={APPLogo}
    alt="login-page"
  ></IonImg>)();

  const displayToast = (toastObj: any) => {
    const icons: any = { "success": checkmark, "primary": checkmark, "dark": close, "secondary": clipboard };

    present({
      message: toastObj.msg,
      duration: 1500,
      position: "top",
      color: toastObj.type,
      icon: icons[toastObj.type] || ''
    });
  }

  const apiService = (type: any, data: {} | undefined, api: any, resultHandler?: any, faultHandler?: any) => {
    setApiOnline(true);
    AxiosCall(type, data, api, (res: any) => {
      setApiOnline(false);
      resultHandler && resultHandler(res);
    }, (err: any) => {
      setApiOnline(false);
      faultHandler && faultHandler(err);
    });
  }

  const renderNoData = () => {
    return (<IonContent>
      <div className="ion-text-center">
        <IonText color="medium">
          <p>No data available.</p>
        </IonText>
      </div>
    </IonContent>);
  }

  const renderModel = ({ isOpen, modelTitle, bodyRender }: ModelProps) => {
    return (<IonModal isOpen={Boolean(isOpen)} backdropDismiss={false}>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>{modelTitle}</IonTitle>
          <IonButtons style={{ paddingRight: 10, cursor: "pointer" }} slot="end" onClick={() => { setDisplayModel((data: any) => ({ ...data, isOpen: false, bodyRender: null })) }}>
            <IonIcon style={{ width: 30, height: 30 }} icon={closeCircleOutline}></IonIcon>
          </IonButtons>
          {apiOnline && <IonProgressBar type="indeterminate"></IonProgressBar>}
        </IonToolbar>
      </IonHeader>
      {isOpen && bodyRender && bodyRender()}
    </IonModal>);
  }

  return (
    <AppContext.Provider value={{ displayToast, displayModel: setDisplayModel, modelDetails: displayModel, renderNoData, appImage, setUserData, userData, apiService, apiOnline }}>
      {children}
      {renderModel(displayModel)}
    </AppContext.Provider>
  );
}
