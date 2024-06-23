import { IonButton, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonIcon, IonItem, IonLabel, IonList, IonTabButton, IonThumbnail } from "@ionic/react";
import types from "../sources/productTypes.json";

export const AdvancedCard = ({ item = {}, onClick, selected = {}, disableSave }: any) => {
  const fields: any = types;

  return (<IonCard color={selected._id === item._id ? "" : ""} onClick={onClick}>
    <IonCardHeader style={{ paddingBottom: 0 }}>
      {Boolean(item.product_type) && <IonCardTitle style={{ fontSize: 16, fontWeight: "600", textTransform: "uppercase" }}>{item.product_type}</IonCardTitle>}
    </IonCardHeader>
    <IonList>
      <IonItem lines="none">
        {Boolean(item.image_url) && <IonThumbnail slot="start">
          <img style={{ borderRadius: 5 }} alt="Silhouette of mountains" src={item.image_url} />
        </IonThumbnail>}
        <div style={{ display: 'flex', flexDirection: 'column', fontSize: '14px' }}>
          {Boolean(item.product_sub_type) && <IonLabel>{item.product_sub_type || '-'}</IonLabel>}
          {Boolean(item.quantity) && <IonLabel>{item.quantity} {fields[item.product_type] || "items"}</IonLabel>}
          {Boolean(item.price) && <IonLabel>₹ {item.price || '0'}</IonLabel>}
          {Boolean(item.createdAt || "") && <IonLabel>{new Date(item.createdAt || "").toLocaleDateString() || '-'}</IonLabel>}
          {Boolean(item.status) && <IonLabel style={{ textTransform: "uppercase" }}>{item.status}</IonLabel>}
        </div>
      </IonItem>
    </IonList>
    {Boolean(item.name) && <IonList>
      <IonItem lines="none">
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <IonCardTitle style={{ fontSize: 16, fontWeight: "600" }}>Requested By</IonCardTitle>
          {Boolean(item.name) && <IonLabel>Name: {item.name}</IonLabel>}
          {Boolean(item.phone) && <IonLabel>Phone No: {item.phone}</IonLabel>}
          {Boolean(item.email) && <IonLabel>Email: {item.email}</IonLabel>}
        </div>
      </IonItem>
    </IonList>}
  </IonCard>
  );
}
