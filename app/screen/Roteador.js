
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ScreenA from '../screen/ScreenA';
import ScreenB from '../screen/ScreenB';

const Tab = createBottomTabNavigator();
function Roteador() {
  return (
    <NavigationContainer>
    <Tab.Navigator>
      <Tab.Screen name="Home" component={ScreenA} />
      <Tab.Screen name="Settings" component={ScreenB} />
    </Tab.Navigator>
    </NavigationContainer>
  )
}

export default Roteador