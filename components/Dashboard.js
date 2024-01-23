import { View, Image, Dimensions, ImageBackground, Text, Pressable, Animated } from 'react-native';
import { Foundation } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const Dashboard = () => {

  return (
    <View style={[{flex: 1}]}>
      <View style={[{flexDirection: 'row'}, {alignItems: 'center'}, {justifyContent: 'space-between'}, {paddingRight: 20}]}>
          <Pressable>
            <Image style={[{height: 60}, {width: 60}]} source={require('../assets/images&logos/output-onlinepngtools.png')} />
          </Pressable>
          <AntDesign name="setting" size={30} color="#fff" />
      </View>

      <ImageBackground style={[{borderRadius: 20}, {overflow: 'hidden'}, {height: '100%'}, {height: 180}, {marginTop: 50}]} source={require('../assets/images&logos/triangles2.jpg')}>
        <View style={[{flexDirection: 'row'}, {justifyContent: 'space-between'}, {alignItems: 'center'}, {padding: 30}]}>
          <Text style={[{fontFamily: 'Ubuntu-Bold'}, {fontSize: 20}]}>Account Balance:</Text>
          <Pressable>
            <Foundation name="info" size={35} color="black" />
          </Pressable>
        </View>  

        <View style={[{paddingLeft: 30}, {flexDirection: 'row'}, {alignItems: 'center'}, {gap: 10}]}>
          <Text style={[{fontFamily: 'Ubuntu-Bold'}, {fontSize: 50}]}>5000</Text>
          <MaterialCommunityIcons name="star-four-points" size={35} color="black" />
        </View>
      </ImageBackground>

      <View style={[{marginTop: 30}]}>
        <Text style={[{color: '#fff'}, {fontFamily: 'Ubuntu-Regular'}, {fontSize: 16}]}>Quick actions</Text>

        <View style={[{flexDirection: 'row'}, {gap: 30}, {marginTop: 30}]}>
          <Pressable style={[{gap: 5}, {alignItems: 'center'}]}>
            <View style={[{backgroundColor: '#fff'}, {height: 40}, {width: 40}, {borderRadius: 100 / 2}, {justifyContent: 'center'}, {alignItems: 'center'}]}>
              <AntDesign name="plus" size={24} color="black" />
            </View>
            <Text style={[{fontFamily: 'Ubuntu-Medium'}, {color: '#000'}]}>Top up</Text>
          </Pressable>

          <Pressable style={[{gap: 5}, {alignItems: 'center'}]}>
            <View style={[{backgroundColor: '#fff'}, {height: 40}, {width: 40}, {borderRadius: 100 / 2}, {justifyContent: 'center'}, {alignItems: 'center'}]}>
              <AntDesign name="user" size={24} color="black" />
            </View>
            <Text style={[{fontFamily: 'Ubuntu-Medium'}, {color: '#000'}]}>Profile</Text>
          </Pressable>
        </View>
      </View>

      <View style={[{marginTop: 50}, {gap: 30}, {justifyContent: 'center'}, {alignItems: 'center'}]}>
        <Text style={[{fontFamily: 'Ubuntu-Regular'}, {fontSize: 20}]}>AD accounts:</Text>
        <View style={[{flexDirection: 'row'}, {alignItems: 'center'}, {gap: 30}]}>
          <Text style={[{fontFamily: 'Ubuntu-Bold'}, {fontSize: 70}]}>40</Text>
          <Image style={[{height: 80}, {width: 80}]} source={require('../assets/images&logos/pie-chart_2936690.png')} />
        </View>
      </View>
    </View>
  )
};

export default Dashboard;