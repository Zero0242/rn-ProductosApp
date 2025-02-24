<p align="center">
  <a href="https://reactnative.dev/" target="blank">
  <img src="https://cdn.worldvectorlogo.com/logos/react-native-1.svg" width="200" alt="App Logo" /></a>
</p>

# Proyecto Productos

Remake de app del curso de ReactNative con Expo Go

> Creado en React Native

## DEV

1. Clonar repositorio con `git clone`
2. Instalar los paquetes de React Native con `npm install`
3. Ejecutar el proyecto con `npm run start`

## Requisitos

1. Tener instalado React Native
2. Instalar Android Studio

## Scripts

Algunos scripts que pueden ser utilizados

| Comando                                          | Descripcion                                                       |
| ------------------------------------------------ | ----------------------------------------------------------------- |
| `npm install`                                    | Instala las dependencias                                          |
| `npm run start`                                  | Inicia el modo debug                                              |
| `npx expo prebuild`                              | (EXPO): precompilar app                                           |
| `rm -rf node_modules`                            | Limpia las dependencias                                           |
| `cd android && ./gradlew assembleDebug && cd ..` | Crea un apk de desarrollo, requiere carpeta `android`             |
| `cd android && ./gradlew clean && cd ..`         | Limpieza del caché de android, requiere carpeta `android`         |
| `npx react-native build-android --mode=release`  | Crea el bundle de tienda para Android, requiere carpeta `android` |

#### Otros Scripts

Otros scripts que pueden usar para fines de desarrollo, (acciones de paquetes)

| Comando | Descripcion                                                                |
| ------- | -------------------------------------------------------------------------- |
| `....`  | Insertar scripts que usen los paquetes de terceros si es necesario hacerlo |

## Documentacion

Links de librerias utilizadas

- [React Native]("https://reactnative.dev/")

## PROD

- Generar un keystore para poder subir la app

```bash
# Generar key para subidas
keytool -genkey -v -keystore my-upload-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
# Pasar el key a base64 (para ci cd)
base64 -i my-upload-key.keystore -o my-upload-key-base64.txt
base64 -i key.properties -o key-properties-base64.txt
```
