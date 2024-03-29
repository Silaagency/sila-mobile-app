import { View, Text, Dimensions, ScrollView, Pressable, Animated, FlatList, Linking, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Video, ResizeMode } from 'expo-av';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';

const CreativeDashboardPage = () => {

    const { width, height } = Dimensions.get('window');

    const {t} = useTranslation();

    const [userInfo, setUserInfo] = useState(null);
    const [apiData, setApiData] = useState([]);
    const [linksApiData, setLinksApiData] = useState([]);

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

    useEffect(() => {
        const creativeVidsApi = async () => {
            try {
                const response = await fetch('https://sila-b.onrender.com/creativeVids');
                const data = await response.json();
                setApiData(data.creativeVids);
            } catch (err) {
                console.error(err);
            }
        };

        creativeVidsApi();
    }, []);

    const openLink = (videos) => {
        Linking.openURL(videos);
    };

    useEffect(() => {
        const creativeLinkApi = async () => {
            try {
                const response = await fetch('https://sila-b.onrender.com/creativeLink');
                const data = await response.json();
                setLinksApiData(data.links)
            } catch (err) {
                console.error(err);
            }
        };

        creativeLinkApi();
    }, []);

    const openCreativeLink = (link) => {
        Linking.openURL(link);
    };

  return (
    <View style={[{flex: 1}]}>
        <View style={[{flexDirection: 'row'}, {alignItems: 'center'}, {gap: 20}, {padding: 30}, {backgroundColor: '#7538D4'}, {justifyContent: 'center'}, {borderBottomLeftRadius: 30}, {borderBottomRightRadius: 30}]}>
            <MaterialCommunityIcons name="movie-filter-outline" size={24} color="#fff" />
            <Text style={[{color: '#fff'}]}>{t('my-videos')}</Text>
        </View>

        <View style={[{height: height / 2.3}, {padding: 10}]}>
            {
                userInfo !== null && (
                    <FlatList showsVerticalScrollIndicator={false} data={apiData} keyExtractor={item => item._id} renderItem={({item}) => {
                        if (item.userID === userInfo._id) {
                            return(
                                <View style={[{marginBottom: 30}, {padding: 20}, {backgroundColor: '#7538D4'}, {borderRadius: 10}, {flexDirection: 'row'}, {alignItems: 'center'}, {justifyContent: 'space-between'}]}>
                                    <Text style={[{color: '#fff'}]}>{item.video}</Text>
                                    <Pressable onPress={() => Linking.openURL(item.video)}>
                                        <Feather name="external-link" size={24} color="#fff" />
                                    </Pressable>
                                </View>
                            )
                        }
                    }} />
                )
            }
        </View>

        <View style={[{flex: 1}, {borderTopRightRadius: 50}, {borderTopLeftRadius: 50}, {backgroundColor: 'lightgray'}, {padding: 30}]}>
            <Text style={[{textAlign: 'center'}, {fontSize: 16}, {fontWeight: 300}, {textDecorationLine: 'underline'}]}>{t('edited-videos-title')}</Text>

            {
                userInfo !== null && (
                    <FlatList showsVerticalScrollIndicator={false} data={linksApiData} keyExtractor={item => item._id} renderItem={({item}) => {
                        if(item.userID === userInfo._id) {
                            return(
                                <View style={[{backgroundColor: '#fff'}, {padding: 20}, {borderRadius: 10}, {marginTop: 30}, {flexDirection: 'row'}, {justifyContent: 'space-between'}, {alignItems: 'center'}]}>
                                    <Text>{item.linkName}</Text>
                                    <Pressable onPress={() => openCreativeLink(item.link)}>
                                        <Ionicons name="open" size={24} color="black" />
                                    </Pressable>
                                </View>
                            )
                        }
                    }} />
                )
            }
        </View>
    </View>
  )
}

export default CreativeDashboardPage