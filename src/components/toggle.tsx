import { IonItem, IonText, IonToggle } from '@ionic/react';

interface props {
    label?: any;
    checked: any;
    onIonChange?: any;
    disableContainer?: any;
    isRequired?: any;
}

const CustomToggle: React.FC<props> = (props: props) => {
    if (props.disableContainer) {
        return (
            <IonToggle checked={props.checked} onIonChange={(e) => { e.stopPropagation(); props.onIonChange && props.onIonChange(e) }}><div slot="label">
                {props.label} {props.isRequired && <IonText color="danger">*</IonText>}
            </div></IonToggle>
        );
    } else {
        return (
            <IonItem>
                <IonToggle checked={props.checked} onIonChange={(e) => { e.stopPropagation(); props.onIonChange && props.onIonChange(e) }}><div slot="label">
                    {props.label}{props.isRequired && <IonText color="danger">*</IonText>}
                </div></IonToggle>
            </IonItem>
        );
    }
};

export default CustomToggle;
