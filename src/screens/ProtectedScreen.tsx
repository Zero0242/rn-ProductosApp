import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { AuthContext } from '../context'


interface Props extends NativeStackScreenProps<any, any> { }
export const ProtectedScreen = (props: Props) => {
  const { logOut, usuario, token } = useContext(AuthContext)
  return (
    <View style={styles.container}>
      <Text style={styles.title}>ProtectedScreen</Text>
      <Button
        title='logout'
        color="#5856d6"
        onPress={logOut}
      />
      <>
        <Text>Usuario Conectado:</Text>
        <Text>{usuario?.uid}</Text>
        <Text>{usuario?.nombre}</Text>
        <Text>{usuario?.correo}</Text>
        <Text>{token}</Text>
      </>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  }
})