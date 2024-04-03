import { Capacitor } from "@capacitor/core";
import { GoogleAuth } from "@codetrix-studio/capacitor-google-auth";
import { IonButton } from "@ionic/react";
import { useEffect } from "react";

interface props {
    disable?: boolean;
    handleSuccess?: Function;
}

const GoogleLoginButton = ({ disable, handleSuccess }: props) => {

    useEffect(() => {
        if (Capacitor.getPlatform() === "web")
            GoogleAuth.initialize({ clientId: "120908019847-1dq33rr6rhgdigid7qel0nmakc7onlb9.apps.googleusercontent.com" });
    }, []);

    const handleSigin = async () => {
        try {
            const result = await GoogleAuth.signIn();

            if (result) {
                handleSuccess && handleSuccess(result);
            }
        } catch(err) {
            console.log('g-err', err);
        }
    }

    return (
        <IonButton disabled={disable} onClick={handleSigin}>Continue with Google</IonButton>
    );
};

export default GoogleLoginButton;
