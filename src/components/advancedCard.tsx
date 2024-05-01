import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonIcon, IonItem, IonLabel, IonList, IonTabButton, IonThumbnail } from "@ionic/react";
import { personAddOutline, removeCircleOutline } from 'ionicons/icons';

export const AdvancedCard = ({ item = {}, onClick, selected = {}, disableSave }: any) => {
  return (<IonCard color={selected._id === item._id ? "" : ""} onClick={onClick}>
    <IonCardHeader style={{ paddingBottom: 0 }}>
      <IonCardTitle style={{ fontSize: 16 }}>{item.productType}</IonCardTitle>
    </IonCardHeader>
    <IonList>
      <IonItem lines="none">
        <IonThumbnail slot="start">
          <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/thumbnail.svg" />
        </IonThumbnail>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {Boolean(item.productSubType) && <IonLabel>{item.productSubType || '-'}</IonLabel>}
          {Boolean(item.quantity) && <IonLabel>{item.quantity || '-'}</IonLabel>}
          {Boolean(item.price) && <IonLabel>{item.price || '-'}</IonLabel>}
          {Boolean(item.date) && <IonLabel>{item.date || '-'}</IonLabel>}
        </div>
      </IonItem>
    </IonList>
  </IonCard>
  );
}
