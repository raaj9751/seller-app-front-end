import React, { useEffect, useState } from 'react';
import './login.css';
import { useHistory } from 'react-router';
import { IonContent, IonText } from '@ionic/react';
import { useAppContext } from '../provider/appProvider';
import GoogleLoginButton from '../components/googleAuth';

interface props {
    redirectToMainTab: any;
    setUserDetails: any;
    userDetails: any;
}

const LoginPage: React.FC<props> = (props) => {
    const { displayModel, appImage, setUserData } = useAppContext();
    const history = useHistory();

    const handleSuccess = async (data: any) => {
        setUserData(data);
        history.push('/list');
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
