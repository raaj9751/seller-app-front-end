import { IonCol, IonContent, IonIcon, IonInfiniteScroll, IonInfiniteScrollContent, IonRow, IonSearchbar } from '@ionic/react';
import './Tab1.css';
import { useEffect, useMemo, useState } from 'react';
import ItemsList from "../sources/itemsList.json";
import { AdvancedCard } from '../components/advancedCard';
import { useAppContext } from '../provider/appProvider';
import DisplayDetails from '../components/displayDetails';
import { addCircleOutline } from 'ionicons/icons';
import AddItemView from './view/addItem';

const Tab1: React.FC = () => {
  const [searchResults, setSearchResults] = useState<any>("");
  const [page, setPage] = useState(1);
  const { renderNoData, displayModel, apiService, userData } = useAppContext();
  const [selected, setSelected] = useState<any>({});
  const [dataProvider, setDataProvider] = useState<any>([]);

  const filteredData = useMemo(() => {
    return dataProvider.filter((obj: any) => (obj?.cus_id !== String(userData?.id) && (String(obj.product_type).includes(searchResults) || obj.product_sub_type.includes(searchResults) || obj.quantity.includes(searchResults))));
  }, [searchResults, dataProvider]);
  const renderData: any = [
    { label: "Product Type", dataField: "product_type", value: "", disabled: true },
    { label: "Product SubType", dataField: "product_sub_type", value: "", disabled: true },
    { label: "Quantity", dataField: "quantity", value: "", disabled: true },
    { label: "Price", dataField: "price", value: "", disabled: true },
    { label: "Phone", dataField: "phone", value: "", disabled: true },
    { label: "Address", dataField: "address", value: "", disabled: true },
    { label: "Email", dataField: "email", value: "", disabled: true },
  ];

  const handleChange = (event: any) => {
    const newTerm = event.target.value;

    setSearchResults(newTerm);
    if (newTerm !== searchResults) {
      setPage(1);
    }
  };

  const renderAdd = () => {
    return (<AddItemView options={ItemsList} />);
  }

  const handleOpenDetails = (title: any) => {
    apiService("get", {}, `getProduct/${selected?.id}`, (res: any) => {
      displayModel && displayModel({
        isOpen: true, modelTitle: title, bodyRender: () => {
          return (<DisplayDetails disableApprove renderData={renderData} dataProvider={res?.data} />);
        }
      });
    })
  }

  const handleAdd = () => {
    displayModel && displayModel({ isOpen: true, modelTitle: "Add Item", bodyRender: renderAdd });
  }

  useEffect(() => {
    if (selected && selected["product_type"])
      handleOpenDetails(selected["product_type"]);
  }, [selected])

  useEffect(() => {
    apiService("get", {}, "getAllProducts/sell", (res: any) => {
      setDataProvider(res?.products || []);
    })
  }, [])

  return (
    <div className='back-Contain'>
      <IonRow className="ion-align-items-center">
        <IonCol size="10" style={{ padding: 0 }}>
          <IonSearchbar animated debounce={2000} value={searchResults} onIonInput={handleChange} />
        </IonCol>
        <IonCol size="2" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <IonIcon lazy size='large' icon={addCircleOutline} onClick={() => { handleAdd() }} />
        </IonCol>
      </IonRow>
      <IonContent className='main-scroll-contain'>
        {Boolean(filteredData.length) ? filteredData.map((item: any) => <AdvancedCard item={item} disableFollow={true} selected={selected} key={item._id} onClick={() => { setSelected({ ...item }) }} />) : renderNoData()}
        {/* <IonInfiniteScroll
          onIonInfinite={(ev) => {
            if (searchResults.length === page * 20) setPage(page + 1);
            setTimeout(() => ev.target.complete(), 500);
          }}
        >
          <IonInfiniteScrollContent></IonInfiniteScrollContent>
        </IonInfiniteScroll> */}
      </IonContent>
    </div>
  );
};

export default Tab1;
