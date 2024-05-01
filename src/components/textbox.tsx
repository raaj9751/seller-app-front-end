import { IonInput, IonItem, IonText } from '@ionic/react';

interface props {
    label: any;
    value?: any;
    onIonChange?: any;
    type?: any;
    maxlength?: any;
    disableContainer?: any;
    isRequired?: any;
}

const CustomTextInput: React.FC<props> = (props: props) => {
    if (props.disableContainer) {
        return (
            <IonInput className="custom-input" labelPlacement="floating" value={props.value} onIonInput={(e) => props.onIonChange(e)}><div slot="label">
                {props.label} {props.isRequired && <IonText color="danger">*</IonText>}
            </div></IonInput>
        );
    } else {
        return (
            <IonItem>
                <IonInput className="custom-input" labelPlacement="floating" value={props.value} onIonInput={(e) => props.onIonChange(e)}><div slot="label">
                    {props.label}{props.isRequired && <IonText color="danger">*</IonText>}
                </div></IonInput>
            </IonItem>
        );
    }
};

export default CustomTextInput;
