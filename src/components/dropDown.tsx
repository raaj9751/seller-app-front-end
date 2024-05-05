import React, { useEffect, useState } from 'react';
import {
    IonItem,
    IonSelect,
    IonSelectOption,
} from '@ionic/react';

interface DropDownProps {
    options: any;
    onSelect: (selected: any) => void;
    selectedOptions?: any;
    label?: string;
    multiple?: boolean;
}

const DropDown: React.FC<DropDownProps> = ({ options, onSelect, selectedOptions, label, multiple }) => {
    const [selected, setSelected] = useState<any>(selectedOptions || "");

    const handleSelect = (values: any) => {
        setSelected(values);
        onSelect(values);
    };

    return (
        <div>
            <IonItem>
                <IonSelect label={label} placeholder="Select" multiple={multiple} value={selected} onIonChange={(e) => { handleSelect(e.detail.value) }}>
                    {options.map((option: any) => (<IonSelectOption key={option?.value} value={option?.value}>{option?.label}</IonSelectOption>))}
                </IonSelect>
            </IonItem>
        </div>
    );
};

export default DropDown;
