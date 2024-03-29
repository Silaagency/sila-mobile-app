import { View, Text, Dimensions, Image, ScrollView, Animated, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useEffect } from 'react';
import { SimpleLineIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Video, ResizeMode } from 'expo-av';
import { useTranslation } from 'react-i18next';

const MediaBuyingPage = () => {

    const navigation = useNavigation();

    const { width, height } = Dimensions.get('window');

    const {t} = useTranslation();

    const slideWindow = new Animated.Value(height);
    const firstVid = new Animated.Value(height);
    const secondVid = new Animated.Value(height);
    const thirdVid = new Animated.Value(height);

    useEffect(() => {
        Animated.timing(slideWindow, {
            toValue: 0,
            duration: 700,
            useNativeDriver: true
        }).start();

        Animated.timing(firstVid, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true
        }).start();

        Animated.timing(secondVid, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true
        }).start();

        Animated.timing(thirdVid, {
            toValue: 0,
            duration: 1500,
            useNativeDriver: true
        }).start();
    }, []);

  return (
    <View style={[{flex: 1}, {backgroundColor: '#7538D4'}, {padding: 50}]}>
        <View style={[{flexDirection: 'row'}, {alignItems: 'center'}, {gap: 20}]}>
            <MaterialCommunityIcons name="star-four-points" size={30} color="#fff" />
            <Text style={[{fontWeight: '800'}, {fontSize: 17}, {color: '#fff'}]}>{t('media-buying')}</Text>
        </View>

        <Text style={[{fontWeight: 100}, {marginTop: 20}, {color: '#fff'}, {fontSize: 25}]}>{t('media-buying-greet')}</Text>

        <Animated.View style={[{height: height / 1.4}, {position: 'absolute'}, {bottom: 0}, {left: 0}, {right: 0}, {backgroundColor: '#fff'}, {borderTopLeftRadius: 40}, {borderTopRightRadius: 40}, {padding: 20}, {transform: [{translateY: slideWindow}]}]}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={[{alignItems: 'center'}, {marginBottom: 50}]}>
                    <Image style={[{height: 300}, {width: 300}]} source={require('../assets/images&logos/creative.png')} />
                    <Text style={[{textAlign: 'center'}, {fontWeight: 300}]}>{t('media-buying-description')}</Text>
                </View>

                <View style={[{flexDirection: 'row'}, {alignItems: 'flex-start'}, {gap: 20}]}>
                    <SimpleLineIcons name="location-pin" size={24} color="black" />
                    <Text style={[{width: width / 1.5}]}>{t('media-buying-under-description')}</Text>
                </View>

                <View style={[{marginTop: 30}]}>
                    <Pressable onPress={() => navigation.navigate('MBInterface')} style={[{backgroundColor: '#7538D4'}, {padding: 15}, {borderRadius: 10}, {alignItems: 'center'}, {justifyContent: 'center'}]}>
                        <Text style={[{color: '#fff'}, {fontSize: 15}, {fontWeight: 500}]}>{t('get-started')}</Text>
                    </Pressable>

                    <Pressable onPress={() => navigation.navigate('Services')} style={[{borderWidth: 2}, {borderColor: '#7538D4'}, {padding: 15}, {borderRadius: 10}, {alignItems: 'center'}, {justifyContent: 'center'}, {marginTop: 20}]}>
                        <Text style={[{color: '#7538D4'}, {fontSize: 15}, {fontWeight: 500}]}>{t('discover-other-services')}</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </Animated.View>
    </View>
  )
};

export default MediaBuyingPage;