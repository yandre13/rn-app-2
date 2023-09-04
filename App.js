import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import IndexScreen from './src/screens/IndexScreen'
import { Provider as BlogProvider } from './src/context/blog-context'
import ShowScreen from './src/screens/ShowScreen'
import CreateScreen from './src/screens/CreateScreen'
import EditScreen from './src/screens/Edit'
import { Feather } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'

const Stack = createStackNavigator()

const App = () => {
  return (
    <BlogProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Index"
          screenOptions={{
            headerTitle: 'Blogs',
          }}
        >
          <Stack.Screen
            name="Index"
            component={IndexScreen}
            options={({ navigation }) => ({
              headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate('Create')}>
                  <Feather name="plus" size={30} />
                </TouchableOpacity>
              ),
            })}
          />
          <Stack.Screen
            name="Show"
            component={ShowScreen}
            options={({ navigation, route }) => ({
              headerRight: () => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('Edit', { id: route.params.id })
                  }
                >
                  <Feather name="edit" size={30} />
                </TouchableOpacity>
              ),
            })}
          />
          <Stack.Screen name="Create" component={CreateScreen} />
          <Stack.Screen name="Edit" component={EditScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </BlogProvider>
  )
}

export default App
