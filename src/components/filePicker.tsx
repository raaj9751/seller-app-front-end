import { IonButton, IonIcon, IonInput, IonLabel, IonItem } from '@ionic/react';
import { cloudUploadOutline } from 'ionicons/icons';
import { useState, useRef } from 'react';

export const FilePicker = ({
    accept,
    label,
    onFileAccepted,
    multiple = false,
}: any) => {
    const [fileName, setFileName] = useState('');
    const fileInput = useRef<any>(null);

    const handleFileInput = () => {
        fileInput.current?.click();
    };

    const handleFileChange = (e: any) => {
        const fileList = e.target.files;

        if (fileList.length === 0) {
            return;
        }

        if (multiple) {
            const fileArray = Array.from(fileList);
            onFileAccepted && onFileAccepted(fileArray);
        } else {
            const file = fileList[0];
            onFileAccepted && onFileAccepted(file);
        }

        setFileName(fileList[0].name);
    };

    return (
        <IonItem>
            <IonLabel position="stacked">{label}</IonLabel>
            <IonInput
                inputMode="text"
                value={fileName}
                readonly={true}
            />
            <IonButton fill="clear" onClick={handleFileInput}>
                <IonIcon slot="icon-only" icon={cloudUploadOutline} />
                &nbsp; Choose File
            </IonButton>
            <input
                type="file"
                style={{ display: 'none' }}
                ref={fileInput}
                accept={accept}
                onChange={handleFileChange}
                multiple={multiple}
            />
        </IonItem>
    );
};

