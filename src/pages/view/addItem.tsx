import React, { useState } from 'react';
import { IonContent } from '@ionic/react';
import DropDown from '../../components/dropDown';
import { FilePicker } from '../../components/filePicker';

const AddItemView = ({ options }: any) => {
  const [selected1, setSelected1] = useState<any>({});
  const [selected2, setSelected2] = useState<any>('');

  const handleSelect1 = (option: any) => {
    setSelected1(option);
  };
  const handleSelect2 = (option: any) => {
    setSelected2(option);
  };

  return (
    <IonContent>
      <DropDown options={options} onSelect={handleSelect1} />
      <DropDown options={selected1?.items || []} onSelect={handleSelect2} />
      <FilePicker label="Attachements" />
    </IonContent>
  );
}
export default AddItemView;