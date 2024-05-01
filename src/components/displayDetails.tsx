import { IonButton, IonContent, IonHeader, IonIcon, IonItem, IonSelect, IonSelectOption, IonText } from '@ionic/react';
import { useEffect, useRef, useState } from 'react';
import CustomTextInput from './textbox';
import CustomToggle from './toggle';
import { add, clipboardOutline } from 'ionicons/icons';
import { useAppContext } from '../provider/appProvider';

interface props {
    renderData: any;
    dataProvider?: any;
}

const DisplayDetails: React.FC<props> = (props: any) => {

    const renderCustom = ({ label, dataField, value, disabled, isRequired }: any, data: any = {}) => {
        if (disabled) {
            return <IonItem style={{ fontSize: '15px' }}>{label}: <span style={{ paddingLeft: '10px', fontSize: '15px', color: '#000000a1', textTransform: "capitalize" }}>{dataField === "locationLink" ? <a href={props.dataProvider && props.dataProvider[dataField || "-"]} target="_blank" >Click Here</a> : props.dataProvider && props.dataProvider[dataField || "-"]}</span></IonItem>;
        }
        if (typeof value === "string")
            return (<CustomTextInput isRequired={isRequired} label={label} value={data[dataField] || ""} /* onIonChange={(e: { detail: { value: any; }; }) => handleChange(dataField, e.detail.value!)} */ />);
        if (typeof value === "boolean")
            return <CustomToggle isRequired={isRequired} checked={data[dataField]} label={label} /* onIonChange={() => handleChange(dataField, !value)} */ />
    }


    return (
        <IonContent>
            {props.renderData.map((obj: any) => { return renderCustom(obj); })}
        </IonContent>
    );
};

export default DisplayDetails;
