# Productos App

Aplicacion conectada con server, para pruebas con react native

## Dependencies

1. AsyncStorage

```bash
$ yarn add @react-native-async-storage/async-storage
```

2. React Picker

```bash
$ yarn add @react-native-picker/picker
```

3. React Image Picker

```bash
$ yarn add react-native-image-picker
```

4. Axios

```bash
$ yarn add axios
```

5. Zustand

```bash
$ yarn add zustand
```

6. React Query

```bash
$ yarn add @tanstack/react-query
```

# React Navigation

Libreria popular para manejar la navegacion en React Native, [documentación](https://reactnavigation.org/docs/getting-started). Las instalaciones a continuacion son la base para los diferentes tipos de navegación que maneja una app movil

- Stack Navigation
- Bottom Tab Navigation
- Top Bar Navigation
- Drawer Navigation

## Instalaciones Base

1. - Instalaciones base para el paquete

```bash
# Paquete principal
$ yarn add @react-navigation/native
```

2.  - **Utilidades**: Funciones y metodos usados por la navegación en general

    - EXPO CLI

      > para realizar la configuracion automatica de expo

      ```bash
      $ npx expo install react-native-screens react-native-safe-area-context
      ```

        <hr/>

    - React Native CLI

      > Instalaciones manuales a realizar segun la [documentacion](https://reactnavigation.org/docs/getting-started#installing-dependencies-into-a-bare-react-native-project)

      ```bash
      # Utilidades para las pantallas y calculos
      $ yarn add react-native-screens react-native-safe-area-context
      ```

      > **ANDROID** Modificar el archivo `MainActivity.kt` o `MainActivity.java`

      ```kotlin
        /** Agregar import */
        import android.os.Bundle;

        class MainActivity: ReactActivity() {
        // ...

        /** Agregar metodo */
        override fun onCreate(savedInstanceState: Bundle?) {
            super.onCreate(null)
        }

        // ...
        }
      ```

      <hr/>

3.- **Implementacion**: envolver la app dentro de un `<NavigationContainer/>` en el punto más elevado

```jsx
function App(){
    return (
        <>
            <NavigationContainer>
                {...}
            </NavigationContainer>
        </>
        )
}
```

# Stack Navigator

Seguir la [documentación](https://reactnavigation.org/docs/hello-react-navigation) para las instrucciones actualizadas, requiere el paso anterior para que funcione.

- Para configurar el Stack de Navegación, seguir la [referencia](https://reactnavigation.org/docs/hello-react-navigation#creating-a-native-stack-navigator)

```bash
# Stack de Navegación
$ yarn add @react-navigation/native-stack
```

## Configuracion del Navigator

- el **type** es usado para definir que valores va a pedir una pantalla y sus "nombres"
- `createNativeStackNavigator` nos genera el navegador, se le pone el **type** para recibir ayuda
- `StackRouter`: el elemento JSX que va a ir dentro del `<NavigationContainer/>`

```jsx
// Type => Nombra las pantallas de la app y los parametros que van a usar
export type RootStackParams = {
    HomeScreen: undefined
    LoadingScreen: undefined
}

// Generador del Navigator
const Stack = createNativeStackNavigator<RootStackParams>()

export function StackRouter() {
    return (
        <Stack.Navigator>
            {/* component => Nuestras pantallas de la app */}
            <Stack.Screen name='HomeScreen' component={HomeScreen} />
            <Stack.Screen name='LoadingScreen' component={LoadingScreen} />
        </Stack.Navigator>
    )
}
```

## Navigation Props

### Pantalla

Las **pantallas** tiene acceso a los props de navegacion `navigation` y `route`, por eso usamos el **type** seguido del nombre de la pantalla

1. `navigation`: nos permite acceder a las funciones de navegacion
2. `route`: nos da acceso a las configuraciones de la ruta y los **parametros**

```jsx
interface Props extends NativeStackScreenProps<RootStackParams, 'HomeScreen'> {}

export function HomeScreen({navigation, route}: Props) {
  return (
    <View>
      <Text>HomeScreen</Text>
    </View>
  );
}
```

### Componente

A nivel de los **hooks** podemos hacer uso del **type** para obtener tipado en los datos del hook, esto es usado principalmente en **componentes** que existen dentro de la pantalla.

> el objeto `navigation` funciona similar al navigation que recibimos a nivel de Pantalla

```jsx
export function RoundedButton() {
    // Hook, usa el type que generamos en el router
    const navigation = useNavigation<NavigationProp<RootStackParams>>()

    return (
        <Pressable>
            <Text>Ir al Home</Text>
        </Pressable>
    )
}
```

# Typescript: Import Alias

Para configurar importaciones de typescript en react native, seguir la [referencia](https://reactnative.dev/docs/typescript#using-custom-path-aliases-with-typescript) y la [guia](https://www.youtube.com/watch?v=7H6ZuKpzT3k)

> Permite la sintaxis `@folder` para realizar importaciones

```ts
// Importacion normal
import {Button} from '../../componentes/Button';

// Importacion con alias
import {Button} from '@componentes/Button';
```

1. Configurar los alias en el archivo `tsconfig.json`

2. Instalar dependencia de babel, para trabajar con los alias

```bash
# Resuelve las importaciones
$ yarn add --dev babel-plugin-module-resolver
```

3. Configurar el archivo `babel.config.js`

# UI Kitten

Para usar la libreria de componentes de [ui-kitten](https://akveo.github.io/react-native-ui-kitten/docs/guides/getting-started#manual-installation)

```bash
# Paquetes necesarios
$ yarn add @ui-kitten/components @eva-design/eva react-native-svg
# Eva Icons
$ yarn add @ui-kitten/eva-icons react-native-svg
```

#### TODO

Guardar productos en caché
