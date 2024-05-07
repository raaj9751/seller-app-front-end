import React, { useState } from 'react';
import { IonButton, IonContent, IonIcon, IonToolbar } from '@ionic/react';
import DropDown from '../../components/dropDown';
import { FilePicker } from '../../components/filePicker';
import CustomTextInput from '../../components/textbox';
import { cart } from 'ionicons/icons';
import { useAppContext } from '../../provider/appProvider';
import ProductTypes from "../../sources/productTypes.json"

const AddItemView = ({ options }: any) => {
  const [selected1, setSelected1] = useState<any>({});
  const [selected2, setSelected2] = useState<any>({});
  const [quantity, setQuantity] = useState<any>('');
  const [price, setPrice] = useState<any>('');
  const [file, SetFiles] = useState<any>([]);
  const { userData, displayModel, displayToast } = useAppContext();
  const pTypes: any = ProductTypes;

  const handleSelect1 = (option: any) => {
    setSelected1(options.find((o: any) => typeof option === "string" ? o.value === option : option.includes(o.value)));
  };

  const handleSelect2 = (option: any) => {
    setSelected2(selected1?.items?.find((o: any) => typeof option === "string" ? o.value === option : option.includes(o.value)));
  };

  const handleCreate = () => {
    if (!selected1?.value || !quantity || !price || !file.name) {
      displayToast({ type: "dark", msg: "Please Provide All Details" });
      return
    }
    const formData = new FormData();

    formData.append("product_type", selected1.value);
    formData.append("product_sub_type", selected2.value || "");
    formData.append("quantity", quantity);
    formData.append("price", price);
    formData.append("image", file);
    formData.append("cus_id", userData?.id);
    formData.append("transaction_type", 'buy');

    fetch(`https://seller-app-backend-7gkm.onrender.com/cw/createProduct`, {
      method: 'POST',
      headers: {
        contentType: "multipart/form-data"
      },
      body: formData
    }).then(res => {
      displayToast({ type: "success", msg: "Created has been Successfully" });
      displayModel((prev: any) => ({ ...prev, isOpen: false }));
    })
  }

  return (
    <IonContent>
      <DropDown label='Product Type' options={options} onSelect={handleSelect1} />
      {Boolean(selected1?.items && selected1?.items?.length) && <DropDown label='Product SubType' options={selected1?.items || []} onSelect={handleSelect2} />}
      <CustomTextInput label={`Quantity(${pTypes[selected1?.value] || "items"})`} value={quantity || ""} onIonChange={(e: { detail: { value: any; }; }) => setQuantity(e.detail.value!)} />
      <CustomTextInput label={"Price(₹)"} value={price || ""} onIonChange={(e: { detail: { value: any; }; }) => setPrice(e.detail.value!)} />
      <FilePicker label="Attachements" onFileAccepted={SetFiles} />
      <IonToolbar>
        <IonButton slot='end' id="buy-alert" onClick={handleCreate}>Create<IonIcon icon={cart}></IonIcon></IonButton>
      </IonToolbar>
    </IonContent>
  );
}

export default AddItemView;