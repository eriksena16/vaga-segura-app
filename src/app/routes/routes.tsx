import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ClientesList from '../(costumers)/list/page';
import VagasList from '../(panel)/principal/page';

const Stack = createNativeStackNavigator();

export default function AppRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ClientesList" component={ClientesList} />
      <Stack.Screen name="VagasList" component={VagasList} />
    </Stack.Navigator>
  );
}
