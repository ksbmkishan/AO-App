import { useRoute } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { NativeModules, View } from 'react-native';

const { PanoramaViewer } = NativeModules;

const PanoramaView = ({
    imageUrl = 'https://storage.googleapis.com/static-temple360/360/jagannathtemple/3.jpg',
}) => {

    const router = useRoute();

    const { image } = router?.params || {};

    const vrItems = [{ "__v": 0, "_id": "6847cfd60e5fd76e8e06089e", "audio": "uploads/audio/5491f4d9-86ab-471b-a564-ff9f4f26ef68.mp3", "createdAt": "2025-06-10T06:25:26.068Z", "duration": 3, "itemImage": "uploads/images/b67e42f0-45a4-4e1e-a35c-2190b35d590c.png", "itemName": "Coconut", "itemPrice": 10, "keywords": ["Coconut", "Nariyal", "Gola", "Gari"], "payment": "deduct", "updatedAt": "2025-07-04T11:14:22.872Z" }, { "__v": 1, "_id": "6847ce240e5fd76e8e060841", "audio": "uploads/audio/94b77945-9272-4289-beea-09c7f81179ca.mp3", "createdAt": "2025-06-10T06:18:12.173Z", "duration": 3, "itemImage": "uploads/images/0204af31-a7cc-487f-aeb1-7a598344c0db.png", "itemName": "Aarti ", "itemPrice": 1, "keywords": ["Arti", "Arti thali", "Pooja", "Thali", "Aarti", "Aarti thali"], "payment": "deduct", "updatedAt": "2025-07-04T09:46:44.835Z" }, { "__v": 2, "_id": "6847c2c0306897ba3dfd4c7a", "audio": "uploads/audio/6b8596d1-acec-492f-9e56-2560589e9305.mp3", "createdAt": "2025-06-10T05:29:36.519Z", "duration": 3, "itemImage": "uploads/images/0c4e81f5-d13a-4f8c-92a7-88d6cddcef2f.png", "itemName": "Bell", "itemPrice": 1, "keywords": ["Bell", "Ghanti", "Ghanta"], "payment": "add", "updatedAt": "2025-06-10T06:18:33.710Z" }]
    useEffect(() => {
        const vrItemsJson = JSON.stringify(vrItems);
        PanoramaViewer.showPanorama(image,vrItemsJson)
            .then(() => console.log('Panorama viewer launched'))
            .catch((error) => console.error('Error:', error));
    }, [image]);

    return <View style={{ flex: 1 }} />; // Optional placeholder
};

export default PanoramaView;
