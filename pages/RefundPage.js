import { View, Text, TextInput, Pressable, Alert, ActivityIndicator, Dimensions } from 'react-native';
import { Foundation } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { useNavigation } from '@react-navigation/native';
import BottomNav from '../components/BottomNav';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';

const RefundPage = () => {

  const navigation = useNavigation();

  const { width, height } = Dimensions.get('window');

  const {t} = useTranslation();

  const [adAccount, setAdAccount] = useState(null);
  const [refundReason, setRefundReason] = useState(null);
  const [refundAmount, setRefundAmount] = useState(0);

  const [userInfo, setUserInfo] = useState(null);

  const [apiData, setApiData] = useState([]);

  const [pickerItems, setPickerItems] = useState(null);

  const [refundLoading, setRefundLoading] = useState(false);


  //Getting user info from async storage:
  useEffect(() => {
    const asyncStorage = async () => {
      try {
        const response = await AsyncStorage.getItem('userInfo');
        setUserInfo(JSON.parse(response));
      } catch (err) {
        console.error(err);
      }
    };

    asyncStorage();
  }, []);
  ////


  //Getting ads data from ads api:
  useEffect(() => {
    const adsApi = async () => {
      try {
        const response = await fetch('https://sila-b.onrender.com/ad');
        const data = await response.json();
        setApiData(data.ADs);
      } catch (err) {
        console.error(err);
      }
    };

    adsApi();
  }, []);
  //////



  //mapping ads into the picker:
  useEffect(() => {
    if (userInfo !== null && apiData.length > 0) {
      const transformedData = apiData.map((x) => {
        if (x.userID === userInfo._id && x.ads) {
          const mappedAds = x.ads.map((y) => ({
            label: y.adName,
            value: y
          }));
          return mappedAds;
        }
        return []; // Return an empty array if the condition is not met
      });
  
      const flattenedData = transformedData.flat();
      setPickerItems(flattenedData);
    }
  }, [userInfo, apiData]);
  /////

  

  //Sending refund:
  const sendRefund = () => {
    setRefundLoading(true);

    if (userInfo !== null && adAccount !== null && 
      refundReason !== null && refundAmount !== null) {

      const refundApi = async () => {
        try {
          const response = await fetch('https://sila-b.onrender.com/refund', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              userID: userInfo._id,
              accountName: adAccount.adName,
              refundReason: refundReason,
              amount: refundAmount
            })
          });
          
          const data = await response.json();
          setRefundLoading(false);
          navigation.reset({
            index: 0,
            routes: [{ name: 'RefundRecord' }]
          });
        } catch (err) {
          console.error(err);
        }
      };
  
      refundApi();
    } else {
      Alert.alert('Please fill-in all the information!');
      setRefundLoading(false);
    }
  };
  //

  return (
    <View style={[{flex: 1}, {padding: 30}]}>
      <View style={[{height: height / 12}, {backgroundColor: '#7538D4'}, {borderBottomLeftRadius: 50}, {borderBottomRightRadius: 50}, {flexDirection: 'row'}, {justifyContent: 'center'}, {alignItems: 'center'}, {gap: 30}, {position: 'absolute'}, {left: 0}, {right: 0}]}>
        <Foundation name="dollar" size={24} color="#fff" />
        <Text style={[{color: '#fff'}, {fontSize: 17}]}>{t('refund')}</Text>
      </View>

      <View style={[{marginTop: 80}, {gap: 20}]}>
        {
          pickerItems !== null && (
            <RNPickerSelect
              onValueChange={(value) => setAdAccount(value)}
              items={pickerItems}
            />
          )
        }

        <RNPickerSelect
          onValueChange={(value) => setRefundReason(value)}
          items={[
            { label: t('refund-reason-1'), value: 'Ads disabled' },
            { label: t('refund-reason-2'), value: 'Ads daily spend limit=0' },
            { label: t('refund-reason-3'), value: 'Page die all' },
            { label: t('refund-reason-4'), value: "Everything is fine, don't want to use it anymore!" }
          ]}
        />

        <TextInput onChangeText={(text) => setRefundAmount(text)} style={[{borderBottomWidth: 3}, {marginTop: 30}, {fontSize: 16}, {borderColor: '#7538D4'}]} placeholder={t('refund-placeholder')} keyboardType='numeric' />

        <View style={[{flexDirection: 'row'}, {gap: 20}, {marginTop: 30}, {justifyContent: 'flex-end'}]}>
          <Pressable onPress={() => navigation.navigate('Meta')} style={[{borderWidth: 3}, {padding: 15}, {borderRadius: 30}, {paddingHorizontal: 25}, {borderColor: '#7538D4'}, {justifyContent: 'center'}, {alignItems: 'center'}]}>
            <Text style={[{color: '#000'}]}>{t('cancel')}</Text>
          </Pressable>

          <Pressable onPress={sendRefund} style={[{backgroundColor: '#7538D4'}, {padding: 15}, {borderRadius: 30}, {paddingHorizontal: 40}, {justifyContent: 'center'}, {alignItems: 'center'}]}>
            {
              refundLoading ? (
                <ActivityIndicator color={'#fff'} />
              ) : (
                <Text style={[{color: '#fff'}]}>{t('apply-refund')}</Text>
              )
            }
          </Pressable>
        </View>
      </View>
    </View>
  )
}

export default RefundPage