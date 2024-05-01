import { IonButton, IonButtons, IonCol, IonContent, IonIcon, IonInfiniteScroll, IonInfiniteScrollContent, IonRow, IonSearchbar, IonToolbar } from '@ionic/react';
import './Tab1.css';
import { useEffect, useMemo, useState } from 'react';
import Data from "../sources/list.json"
import MemberData from "../sources/memberList.json"
import { AdvancedCard } from '../components/advancedCard';
import { useAppContext } from '../provider/appProvider';
import DisplayDetails from '../components/displayDetails';
import { logOutOutline, pencilOutline, saveOutline } from 'ionicons/icons';

const Tab4: React.FC = () => {
  const [formDirty, setFormDirty] = useState(false);
  const { renderNoData, displayModel } = useAppContext();
  const renderData: any = [
    { label: "Name", dataField: "name", value: "" },
    { label: "Phone Number", dataField: "phoneNo", value: "" },
    { label: "Place", dataField: "place", value: "" },
    { label: "Email", dataField: "email", value: "" },
  ];


  return (
    <div className='back-Contain'>
      <IonToolbar style={{ paddingLeft: '10px' }}>
        <IonButton disabled={!formDirty} color="primary" onClick={() => { }}><IonIcon style={{ width: '25px', height: '25px' }} icon={saveOutline}></IonIcon></IonButton>
        <IonButtons slot="end">
          <IonButton id="logout-alert"><IonIcon style={{ width: '30px', height: '30px' }} icon={logOutOutline}></IonIcon></IonButton>
        </IonButtons>
      </IonToolbar>
      <IonContent className='main-scroll-contain'>
        <DisplayDetails renderData={renderData} dataProvider={MemberData[0]} />
      </IonContent>
    </div>
  );
};

export default Tab4;
