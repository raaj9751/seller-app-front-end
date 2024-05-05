import { IonCol, IonContent, IonInfiniteScroll, IonInfiniteScrollContent, IonRow, IonSearchbar } from '@ionic/react';
import './Tab1.css';
import { useEffect, useMemo, useState } from 'react';
import { AdvancedCard } from '../components/advancedCard';
import { useAppContext } from '../provider/appProvider';
import DisplayDetails from '../components/displayDetails';

const Tab3: React.FC = () => {
  const [searchResults, setSearchResults] = useState<any>("");
  const [page, setPage] = useState(1);
  const { renderNoData, displayModel, apiService, userData } = useAppContext();
  const [dataProvider, setDataProvider] = useState<any>([]);
  const [selected, setSelected] = useState<any>({});
  const filteredData = useMemo(() => {

    return dataProvider.filter((obj: any) => (obj.status !== "Pending" && String(obj.productType).includes(searchResults) || obj.productSubType.includes(searchResults) || obj.quantity.includes(searchResults)));
  }, [searchResults, dataProvider]);
  const renderData: any = [
    { label: "Product Type", dataField: "productType", value: "", disabled: true },
    { label: "Product SubType", dataField: "productSubType", value: "", disabled: true },
    { label: "Quantity", dataField: "quantity", value: "", disabled: true },
    { label: "Price", dataField: "price", value: "", disabled: true },
    { label: "Place", dataField: "place", value: "", disabled: true },
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
    return (<DisplayDetails renderData={renderData} dataProvider={selected} />);
  }

  const handleOpenDetails = (title: any) => {
    displayModel && displayModel({ isOpen: true, modelTitle: title, bodyRender: renderDetails });
  }

  useEffect(() => {
    if (selected && selected.productType)
      handleOpenDetails(selected.productType);
  }, [selected])

  useEffect(() => {
    apiService("get", {}, `getPurchasedListbyCustomer/${userData.id}`, (res: any) => {
      setDataProvider(res?.data || []);
    })
  }, [])

  return (
    <div className='back-Contain'>
      <IonRow className="ion-align-items-center">
        <IonCol size="12">
          <IonSearchbar animated debounce={2000} value={searchResults} onIonInput={handleChange} />
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

export default Tab3;
