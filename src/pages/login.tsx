import React, { useEffect, useState } from 'react';
import './login.css';
import { useHistory } from 'react-router';
import { IonContent, IonText } from '@ionic/react';
import { useAppContext } from '../provider/appProvider';
import GoogleLoginButton from '../components/googleAuth';

interface props {
}

const LoginPage: React.FC<props> = (props) => {
    const { displayModel, appImage, setUserData, apiService } = useAppContext();
    const history = useHistory();

    const handleSuccess = async (data: any) => {
        apiService("post", {
            email: data.email, name: data.name, image_url: data.imageUrl
        }, "login", (res: any) => {
            setUserData(res);
            localStorage.setItem("userData", JSON.stringify(res));
            history.push('/list');
        })
    }

    return (
        <IonContent className="login-page-content">
            <div className="login-card">
                {appImage}
                <GoogleLoginButton
                    handleSuccess={handleSuccess}
                />
            </div>
        </IonContent>
    );
};

export default LoginPage;
