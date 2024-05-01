import React, { useEffect, useState } from 'react';
import {
    IonItem,
    IonLabel,
    IonList,
    IonToggle,
} from '@ionic/react';

interface DropDownProps {
    options: any;
    onSelect: (selected: any) => void;
    selectedOptions?: any;
    label?: string;
}

const DropDown: React.FC<DropDownProps> = ({ options, onSelect, selectedOptions, label }) => {
    const [showList, setShowList] = useState<boolean>(false);
    const [selected, setSelected] = useState<any>(selectedOptions || []);
    const toggleShowList = () => setShowList(!showList);

    const handleSelect = (option: any) => {
        if (selected.includes(option.value)) {
            setSelected((prev: any) => prev.filter((item: any) => item !== option.value));
            onSelect({});
        } else {
            setSelected((prev: any) => [...prev, option.value]);
            onSelect(option);
        }
        setShowList(false);
    };

    return (
        <div>
            <IonItem onClick={toggleShowList}>
                <IonLabel>
                    {selected?.join(', ') || label || 'Select'}
                </IonLabel>
                <IonToggle checked={showList} />
            </IonItem>
            {showList && (
                <IonList>
                    {options.map((option: any) => (
                        <IonItem key={option?.value} color={selected.includes(option.value) ? 'primary' : ''} onClick={() => handleSelect(option)}>
                            <IonLabel>
                                {option.label}
                            </IonLabel>
                        </IonItem>
                    ))}
                </IonList>
            )}
        </div>
    );
};

export default DropDown;
