import { View, Text, ScrollView, FlatList, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const RefundRecord = () => {

    const { width, height } = Dimensions.get('window');

    const {t} = useTranslation();

    const [userID, setUserID] = useState(null);
    const [apiData, setApiData] = useState([]);

    useEffect(() => {
        const asyncStorage = async () => {
            try {
                const response = await AsyncStorage.getItem('userInfo');
                setUserID(JSON.parse(response)._id);
            } catch (err) {
                console.error(err);
            }
        };

        asyncStorage();
    }, []);

    useEffect(() => {
        const refundApi = async () => {
            try {
                const response = await fetch('https://sila-b.onrender.com/refund');
                const data = await response.json();
                setApiData(data.refunds);
            } catch (err) {
                console.error(err);
            }
        };

        refundApi();
    }, []);

  return (
    <View style={[{marginTop: 80}, {height: height / 1.4}]}>
        {
            userID !== null && (
                <FlatList showsVerticalScrollIndicator={false} data={apiData} keyExtractor={item => item._id} renderItem={({item}) => {
                    if (item.userID === userID) {
                        return(
                            <View style={[{backgroundColor: '#000'}, {borderRadius: 30}, {padding: 20}, {gap: 20}, {marginBottom: 20}]}>
                                <View style={[{flexDirection: 'row'}, {alignItems: 'center'}, {gap: 13}]}>
                                    <FontAwesome name="id-card-o" size={24} color="#fff" />
                                    <Text style={[{color: '#fff'}]}>ID:</Text>
                                    <Text style={[{color: '#fff'}]}>{item._id}</Text>
                                </View>

                                <View style={[{flexDirection: 'row'}, {alignItems: 'center'}, {gap: 13}]}>
                                    <MaterialIcons name="drive-file-rename-outline" size={24} color="#fff" />
                                    <Text style={[{color: '#fff'}]}>{t('ad-name')}</Text>
                                    <Text style={[{color: '#fff'}]}>{item.adAccountName}</Text>
                                </View>

                                <View style={[{flexDirection: 'row'}, {alignItems: 'center'}, {gap: 13}]}>
                                    <Entypo name="dots-three-horizontal" size={24} color="#fff" />
                                    <Text style={[{color: '#fff'}]}>{t('refund-reason')}</Text>
                                    <Text style={[{color: '#fff'}, {width: width / 2.5}]}>{item.refundReason}</Text>
                                </View>

                                <View style={[{flexDirection: 'row'}, {alignItems: 'center'}, {gap: 13}]}>
                                    <FontAwesome name="dollar" size={24} color="#fff" />
                                    <Text style={[{color: '#fff'}]}>{t('amount')}</Text>
                                    <Text style={[{color: '#fff'}]}>{item.amount}</Text>
                                </View>

                                {
                                    item.status === 'Pending' && (
                                        <View style={[{flexDirection: 'row'}, {alignItems: 'center'}, {gap: 13}]}>
                                            <Text style={[{color: '#fff'}]}>{t('status')}</Text>
                                            <Text style={[{color: '#fff'}]}>{t('pending')}</Text>
                                            <Ionicons name="time" size={24} color="#fff" />
                                        </View>
                                    )
                                }

                                {
                                    item.status === 'Accepted' && (
                                        <View style={[{flexDirection: 'row'}, {alignItems: 'center'}, {gap: 13}]}>
                                            <Text style={[{color: '#fff'}]}>{t('status')}</Text>
                                            <Text style={[{color: '#fff'}]}>{t('accepted')}</Text>
                                            <Ionicons name="checkmark-done" size={24} color="#fff" />
                                        </View>
                                    )
                                }

                                {
                                    item.status === 'Rejected' && (
                                        <View style={[{flexDirection: 'row'}, {alignItems: 'center'}, {gap: 13}]}>
                                            <Text style={[{color: '#fff'}]}>{t('status')}</Text>
                                            <Text style={[{color: '#fff'}]}>{t('rejected')}</Text>
                                            <AntDesign name="close" size={24} color="#fff" />
                                        </View>
                                    )
                                }

                                <View style={[{flexDirection: 'row'}, {alignItems: 'center'}, {gap: 13}]}>
                                    <AntDesign name="calendar" size={24} color="#fff" />
                                    <Text style={[{color: '#fff'}]}>{t('date')}</Text>
                                    <Text style={[{color: '#fff'}]}>{`${item.date.slice(0, 4)} . ${item.date.slice(5, 7)} . ${item.date.slice(8, 10)}`}</Text>
                                </View>
                            </View>
                        )
                    }
                }} />
            )
        }
    </View>
  )
}

export default RefundRecord