import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../(auth)/page';
import ClientesList from '../(costumers)/list/page';
import { default as DashboardPage, default as VagasList } from '../(panel)/principal/page';

const Stack = createNativeStackNavigator();

export default function AppRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ClientesList" component={ClientesList} />
      <Stack.Screen name="VagasList" component={VagasList} />
      <Stack.Screen name="Login" component={Login} />
       <Stack.Screen name="DashBoard" component={DashboardPage} />
    </Stack.Navigator>
  );
}
