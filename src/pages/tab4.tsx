import { IonButton, IonButtons, IonContent, IonIcon, IonToolbar } from '@ionic/react';
import './Tab1.css';
import { useEffect, useState } from 'react';
import MemberData from "../sources/memberList.json"
import { useAppContext } from '../provider/appProvider';
import DisplayDetails from '../components/displayDetails';
import { logOutOutline, saveOutline } from 'ionicons/icons';
import { useHistory } from 'react-router';

const Tab4: React.FC = () => {
  const [formDirty, setFormDirty] = useState(false);
  const history = useHistory();
  const { apiService, userData, setUserData, displayToast } = useAppContext();
  const [dataProvider, setDataProvider] = useState<any>({});
  const renderData: any = [
    { label: "Name", dataField: "name", value: "" },
    { label: "Phone Number", dataField: "phone", value: "" },
    { label: "Address", dataField: "address", value: "" },
    { label: "Email", dataField: "email", value: "" },
  ];

  const handleOnChange = (dataField: string, value: any) => {
    const newData = { ...dataProvider, [dataField]: value };

    setDataProvider(newData);
    setFormDirty(true);
  }

  const handleSubmit = () => {
    apiService("post", dataProvider, `updateProfile/${userData.id}`, (res: any) => {
      setFormDirty(false);
      displayToast({ type: "success", msg: "Profile Updated Successfully" });
    })
  }

  const handleLogout = () => {
    setUserData("")
    localStorage.setItem("userData", "");
    history.push('/');
  }

  useEffect(() => {
    apiService("get", {}, `getProfile/${userData.id}`, (res: any) => {
      setDataProvider(res?.data || []);
    })
  }, [])

  return (
    <div className='back-Contain'>
      <IonToolbar style={{ paddingLeft: '10px' }}>
        <IonButton disabled={!formDirty} color="primary" onClick={() => handleSubmit()}><IonIcon style={{ width: '25px', height: '25px' }} icon={saveOutline}></IonIcon></IonButton>
        <IonButtons slot="end">
          <IonButton id="logout-alert" onClick={handleLogout}><IonIcon style={{ width: '30px', height: '30px' }} icon={logOutOutline}></IonIcon></IonButton>
        </IonButtons>
      </IonToolbar>
      <IonContent className='main-scroll-contain'>
        <DisplayDetails disableBuy disableApprove renderData={renderData} dataProvider={dataProvider} handleChange={handleOnChange} />
      </IonContent>
    </div>
  );
};

export default Tab4;
