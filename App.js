import { StatusBar } from 'expo-status-bar'
import { ImageBackground, FlatList, StyleSheet, Text, View, Button, TextInput, TouchableOpacity, CheckBox } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useRef, useState } from 'react'
import { Input } from 'react-native-elements'
const bg1 = { uri: 'https://marketplace.canva.com/EAE7VlC9ueE/1/0/900w/canva-fondo-de-pantalla-para-celular-floral-rosa-pastel-_cO75HW94eI.jpg' }
const bg2 = { uri: 'https://image.winudf.com/v2/image1/aW8ud2FsbHBhcGVyLnBhcGVsLnBhcmVkZV9zY3JlZW5fMF8xNjc2NzM5MjkwXzA3Mg/screen-0.webp?fakeurl=1&type=.webp' }

export default function App() {
  const [text, onChangeText] = useState('')
  const [texto, onTexto] = useState([])
  const [background, setBackground] = useState(bg1)
  const [listaTareas, setListaTareas] = useState([])
  
  const mainInput = useRef()
  useEffect(() => {
    const inicializarAsyncStorage = async () => {
      // igualar la lista de tareas al asyncStorage
      await AsyncStorage.setItem('@tareas', JSON.stringify(listaTareas))
      console.log('ASYNC STORAGE: ', await AsyncStorage.getItem('@tareas'))
    }
    inicializarAsyncStorage()
  }, [])
  const guardarTarea = async () => {
    var tarea = mainInput.current.props.value
    try {
      const tareas = [...JSON.parse(await AsyncStorage.getItem('@tareas'))]
      tareas.push(tarea)
      setListaTareas(tareas)
      await AsyncStorage.setItem('@tareas', JSON.stringify(tareas))
    } catch (err) {
      console.log(err)
      throw new Error('ERROR EN: guardarTarea')
    }
  }
  const eliminarTarea = async (tareaIndex) => {
    try {
      const tareas = [...JSON.parse(await AsyncStorage.getItem('@tareas'))]
      tareas = tareas.filter((tarea, index) => index !== tareaIndex)
      await AsyncStorage.setItem('@tareas', JSON.stringify(tareas))
      setListaTareas(tareas)
    } catch (err) {
      console.log(err)
      throw new Error('ERROR EN: eliminarTarea')
    }
  }
  // const obtenerTareas = async () => {
  //   try {
  //     return [...JSON.parse(await AsyncStorage.getItem('tareas'))];
  //   } catch (error) {
  //     console.log(err)
  //     throw new Error('fallo leve')
  //   }
  // }

  const handleBackground = () => setBackground(bg => bg === bg1 ? bg2 : bg1)
  const handlePress = () => guardarTarea()

  return (
    <ImageBackground source={background} resizeMode="cover" style={styles.background}>
      <View style={styles.container}>

        <Text style={styles.titulo}>TO DO LIST</Text>
        <Input
          onChangeText={onChangeText}
          value={text}
          placeholder="Ingresar tarea"
          ref={mainInput}
        />
        <View style={styles.posicionCentrado}>
          <TouchableOpacity style={styles.botonAgregar} onPress={handlePress}>
            <Text style={[{ fontSize: '1rem', fontWeight: "bold", }]}>Agregar tarea</Text>
          </TouchableOpacity>
        </View>


        <FlatList
          data={listaTareas}
          renderItem={({ item }) => (
            <View style={styles.checkboxContainer}>
              <CheckBox
                style={styles.checkbox}
              />
              <Text style={styles.item}>{item}</Text>
              
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />

          <View style={styles.posicionCentrado}>
            <TouchableOpacity style={styles.botonAgregar} onPress={handleBackground}>
              <Text style={[{ fontSize: '1rem', fontWeight: "bold", }]}>Cambiar fondo</Text>
            </TouchableOpacity>
          </View>
        </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
    margin: '2rem',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  titulo: {
    display: 'flex',
    justifyContent: 'center',
    fontSize: '1.5rem',
    marginTop: '3rem',
    marginBottom: '2rem',
    fontWeight: '700',
    fontSize: 50,
  },
  posicionCentrado: {
    display: 'flex',
    alignItems: 'center'
  },
  botonAgregar: {
    borderRadius: 20,
    backgroundColor: '#81F79F',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: '3rem',
    minWidth: '10rem',
    padding: 10,
    margin: '1rem'
  },
  background: {
    width: '100%'
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: 'center',
  },
});
