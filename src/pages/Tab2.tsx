import { IonButton, IonCol, IonContent, IonInfiniteScroll, IonInfiniteScrollContent, IonRow, IonSearchbar } from '@ionic/react';
import './Tab1.css';
import { useEffect, useMemo, useState } from 'react';
import Data from "../sources/list.json"
import { AdvancedCard } from '../components/advancedCard';
import { useAppContext } from '../provider/appProvider';
import DisplayDetails from '../components/displayDetails';

const Tab2: React.FC = () => {
  const [searchResults, setSearchResults] = useState<any>("");
  const [page, setPage] = useState(1);
  const [selectedTab, setSelectedTab] = useState(1);
  const { renderNoData, displayModel, modelDetails, apiService, userData } = useAppContext();
  const [dataProvider, setDataProvider] = useState<any>([]);
  const [selected, setSelected] = useState<any>({});
  const filteredData = useMemo(() => {

    return dataProvider.filter((obj: any) => ((obj?.status === "Pending" || !obj?.status) && String(obj?.product_type)?.includes(searchResults) || String(obj?.product_sub_type)?.includes(searchResults) || String(obj?.quantity)?.includes(searchResults) || String(obj?.email)?.includes(searchResults)));
  }, [searchResults, dataProvider]);
  const renderData: any = [
    { label: "Product Type", dataField: "product_type", value: "", disabled: true },
    { label: "Product SubType", dataField: "product_sub_type", value: "", disabled: true },
    { label: "Quantity", dataField: "quantity", value: "", disabled: true },
    { label: "Price", dataField: "price", value: "", disabled: true },
    { label: "Email", dataField: "email", value: "", disabled: true },
  ];

  const handleChange = (event: any) => {
    const newTerm = event.target.value;

    setSearchResults(newTerm);
    if (newTerm !== searchResults) {
      setPage(1);
    }
  };

  const renderDetails = () => {
    return (<DisplayDetails disableBuy renderData={renderData} dataProvider={selected} />);
  }

  const handleOpenDetails = (title: any) => {
    displayModel && displayModel({ isOpen: true, modelTitle: title, bodyRender: renderDetails });
  }

  useEffect(() => {
    if (selected && selected.product_type && selectedTab === 2)
      handleOpenDetails(selected.product_type);
  }, [selected])

  useEffect(() => {
    if (selectedTab === 1)
      apiService("get", {}, `getProductByCust/${userData.id}`, (res: any) => {
        setDataProvider(res?.data || []);
      })
    else
      apiService("get", {}, `getRequestedList/${userData.id}`, (res: any) => {
        setDataProvider(res?.products || []);
      })
  }, [selectedTab, modelDetails])

  return (
    <div className='back-Contain'>
      <IonRow className="ion-align-items-center">
        {/* <IonCol size="12">
          <IonSearchbar animated debounce={2000} value={searchResults} onIonInput={handleChange} />
        </IonCol> */}
        <IonCol><IonButton color={selectedTab === 1 ? 'primary' : 'light'} onClick={() => setSelectedTab(1)}>Your List</IonButton><IonButton color={selectedTab === 2 ? 'primary' : 'light'} onClick={() => setSelectedTab(2)}>Requested List</IonButton></IonCol>
      </IonRow>
      <IonContent className='main-scroll-contain'>
        {Boolean(filteredData.length) ? filteredData.map((item: any) => <AdvancedCard item={selectedTab === 1 ? item : { ...item, ...item?.customer_detail, ...item?.product_detail }} selected={selected} onClick={() => { setSelected({ ...item, ...item?.customer_detail, ...item?.product_detail }) }} />) : renderNoData()}
        <IonInfiniteScroll
          onIonInfinite={(ev) => {
            ev.target.complete()
          }}
        >
          <IonInfiniteScrollContent></IonInfiniteScrollContent>
        </IonInfiniteScroll>
      </IonContent>
    </div>
  );
};

export default Tab2;
