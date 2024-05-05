import { IonButton, IonContent, IonIcon, IonItem, IonToolbar } from '@ionic/react';
import CustomTextInput from './textbox';
import CustomToggle from './toggle';
import { cart, checkmark, close } from 'ionicons/icons';
import { useAppContext } from '../provider/appProvider';

interface props {
    renderData: any;
    dataProvider?: any;
    handleChange?: any;
    disableBuy?: any;
    disableApprove?: any;
}

const DisplayDetails: React.FC<props> = (props: any) => {
    const { displayModel, displayToast, apiService, userData } = useAppContext();

    const renderCustom = ({ label, dataField, value, disabled, isRequired }: any, data: any = {}) => {
        if (disabled) {
            return <IonItem key={dataField} style={{ fontSize: '15px' }}>{label}: <span style={{ paddingLeft: '10px', fontSize: '15px', color: '#000000a1', textTransform: "capitalize" }}>{dataField === "locationLink" ? <a href={props.dataProvider && props.dataProvider[dataField || "-"]} target="_blank" >Click Here</a> : props.dataProvider && props.dataProvider[dataField || "-"]}</span></IonItem>;
        }
        if (typeof value === "string")
            return (<CustomTextInput key={dataField} isRequired={isRequired} label={label} value={props?.dataProvider[dataField] || ""} onIonChange={(e: { detail: { value: any; }; }) => props?.handleChange(dataField, e.detail.value!)} />);
        if (typeof value === "boolean")
            return <CustomToggle key={dataField} isRequired={isRequired} checked={props?.dataProvider[dataField]} label={label} onIonChange={() => props?.handleChange(dataField, !value)} />
    }

    const handleBuy = () => {
        apiService("post", { product_id: props?.dataProvider?.productId, cus_id: userData?.id }, "buy", (res: any) => {
            displayToast({ type: "success", msg: "Requested Successfully, will contact you soon" });
            displayModel((prev: any) => ({ ...prev, isOpen: false }));
        })
    }

    const handleReject = () => {
        apiService("post", { product_id: props?.dataProvider?.productId, cus_id: userData?.id }, "Reject", (res: any) => {
            displayToast({ type: "success", msg: "Rejected Successfully" });
            displayModel((prev: any) => ({ ...prev, isOpen: false }));
        })
    }

    const handleApprove = () => {
        apiService("post", { product_id: props?.dataProvider?.productId, cus_id: userData?.id }, "Approve", (res: any) => {
            displayToast({ type: "success", msg: "Approved Successfully" });
            displayModel((prev: any) => ({ ...prev, isOpen: false }));
        })
    }

    return (
        <IonContent>
            {props.renderData.map((obj: any) => { return renderCustom(obj); })}
            {Boolean(!props?.disableBuy) && <IonToolbar>
                <IonButton slot='end' id="buy-alert" onClick={handleBuy}>Request <IonIcon icon={cart}></IonIcon></IonButton>
            </IonToolbar>}
            {Boolean(!props?.disableApprove) && <><IonToolbar>
                <IonButton slot='end' id="buy-alert" onClick={handleReject}>Reject <IonIcon icon={close}></IonIcon></IonButton>
            </IonToolbar><IonToolbar>
                    <IonButton slot='end' id="buy-alert" onClick={handleApprove}>Approve <IonIcon icon={checkmark}></IonIcon></IonButton>
                </IonToolbar></>}
        </IonContent>
    );
};

export default DisplayDetails;
