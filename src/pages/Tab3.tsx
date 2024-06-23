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

    return dataProvider.filter((obj: any) => (String(obj?.product_detail?.product_type)?.includes(searchResults.toLocaleLowerCase()) || String(obj?.product_detail?.product_sub_type)?.includes(searchResults.toLocaleLowerCase()) || String(obj?.product_detail.quantity)?.includes(searchResults.toLocaleLowerCase()) || String(obj?.product_detail.email)?.includes(searchResults.toLocaleLowerCase()) || String(obj?.product_detail.price)?.includes(searchResults.toLocaleLowerCase())));
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
    return (<DisplayDetails renderData={renderData} dataProvider={selected} />);
  }

  const handleOpenDetails = (title: any) => {
    displayModel && displayModel({ isOpen: true, modelTitle: title, bodyRender: renderDetails });
  }

  useEffect(() => {
    if (selected && selected.product_type)
      handleOpenDetails(selected.product_type);
  }, [selected])

  useEffect(() => {
    apiService("get", {}, `getPurchasedListbyCustomer/${userData.id}`, (res: any) => {
      setDataProvider(res?.products || []);
    })
  }, [])

  return (
    <div className='back-Contain'>
      <IonRow className="ion-align-items-center">
        <IonCol size="12">
          <IonSearchbar animated value={searchResults} onIonInput={handleChange} />
        </IonCol>
      </IonRow>
      <IonContent className='main-scroll-contain'>
        {Boolean(filteredData.length) ? filteredData.map((item: any) => <AdvancedCard item={{ ...item?.product_detail, status: item.status }} disableFollow={true} selected={selected} key={item._id} onClick={() => { setSelected({ ...item }) }} />) : renderNoData()}
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

export default Tab3;
