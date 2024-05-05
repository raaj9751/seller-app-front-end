import { IonButton, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonIcon, IonItem, IonLabel, IonList, IonTabButton, IonThumbnail } from "@ionic/react";

export const AdvancedCard = ({ item = {}, onClick, selected = {}, disableSave }: any) => {
  return (<IonCard color={selected._id === item._id ? "" : ""} onClick={onClick}>
    <IonCardHeader style={{ paddingBottom: 0 }}>
      {Boolean(item.product_type) && <IonCardTitle style={{ fontSize: 16 }}>{item.product_type}</IonCardTitle>}
    </IonCardHeader>
    <IonList>
      <IonItem lines="none">
        {Boolean(item.image_url) && <IonThumbnail slot="start">
          <img alt="Silhouette of mountains" src={item.image_url} />
        </IonThumbnail>}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {Boolean(item.product_sub_type) && <IonLabel>{item.product_sub_type || '-'}</IonLabel>}
          {Boolean(item.quantity) && <IonLabel>{item.quantity || '-'}</IonLabel>}
          {Boolean(item.price) && <IonLabel>{item.price || '-'}</IonLabel>}
          {Boolean(item.createdAt) && <IonLabel>{new Date(item.createdAt).toDateString() || '-'}</IonLabel>}
        </div>
      </IonItem>
    </IonList>
  </IonCard>
  );
}
