import { StatusBar } from 'expo-status-bar'
import { ImageBackground, FlatList, StyleSheet, Text, View, Button, TextInput, TouchableOpacity, CheckBox } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useRef, useState } from 'react'
import { Icon } from '@iconify/react';
import { Input } from 'react-native-elements'
import { findDOMNode } from 'react-dom';
const bg1 = { uri: 'https://marketplace.canva.com/EAE7VlC9ueE/1/0/900w/canva-fondo-de-pantalla-para-celular-floral-rosa-pastel-_cO75HW94eI.jpg' }
const bg2 = { uri: 'https://image.winudf.com/v2/image1/aW8ud2FsbHBhcGVyLnBhcGVsLnBhcmVkZV9zY3JlZW5fMF8xNjc2NzM5MjkwXzA3Mg/screen-0.webp?fakeurl=1&type=.webp' }

export default function App() {
  const [text, onChangeText] = useState('')
  const [texto, onTexto] = useState([])
  const [background, setBackground] = useState(bg1)
  const [listaTareas, setListaTareas] = useState([])
  const [checks, setChecks] = useState([]);
  const handleSelect = index => {
    let newSelection = [...checks]
    newSelection[index] = !newSelection[index]
    setChecks(newSelection)
  }


 

  const mainInput = useRef()

  useEffect(() => {
    const inicializarAsyncStorage = async () => {
      try {
        const storedData = await AsyncStorage.getItem('@tareas');
        if (storedData !== null) {
          setListaTareas(JSON.parse(storedData));
        }
      } catch (error) {
        console.error('Error initializing AsyncStorage:', error);
      }
    };
  
    inicializarAsyncStorage();
  }, []);
  

  const guardarTarea = async () => {
    const tarea = mainInput.current.props.value;
    try {
      const tareas = [...listaTareas, tarea];
      setListaTareas(tareas);
      await AsyncStorage.setItem('@tareas', JSON.stringify(tareas));
    } catch (err) {
      console.log(err);
      throw new Error('ERROR EN: guardarTarea');
    }
  };
  const eliminarTarea = async (tareaIndex) => {
    console.log('tareaIndex: ', tareaIndex)
    try {
      var tareas = [...JSON.parse(await AsyncStorage.getItem('@tareas'))]
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
        id='tarea'
          onChangeText={onChangeText}
          value={text}
          placeholder="Ingresar tarea"
          ref={mainInput}
          style={styles.mainInput}
        />
        <View style={styles.posicionCentrado}>
          <TouchableOpacity style={styles.botonAgregar} onPress={handlePress}>
            <Text style={[{ fontSize: '1rem', fontWeight: "bold", }]}>Agregar tarea</Text>
          </TouchableOpacity>
        </View>

        
          <FlatList
          data={listaTareas}
          renderItem={({ item, index }) => (
            <View style={styles.cuadro}>
            <View style={styles.checkboxContainer}>
              <CheckBox
                style={styles.checkbox}
                value={checks[index]}
                onValueChange={() => handleSelect(index)}
              />
              {
                checks[index] ? <Text style={styles.itemTachado}>{item}</Text> : <Text style={styles.item}>{item}</Text>
              }
              <TouchableOpacity  onPress={() => eliminarTarea(index)}>
                <Icon icon="ph:trash-bold" style={{flex: 1, display: 'flex', alignSelf : 'center'}}/>
              </TouchableOpacity>
            </View>
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
    
  },
  checkbox: {
    alignSelf: 'center',
  },
  cuadro:{
    borderWidth: 2,
    borderRadius: 20,
    padding: "0.5rem",
    borderColor: "#C4E8DC",
    backgroundColor: '#D7FFF2',
    marginBottom: '1rem',
    paddingLeft: '1rem',
  },
  mainInput: {
    backgroundColor: '#D7FFF2DD',
    borderRadius: 5
  },
  itemTachado:{
    padding: 10,
    fontSize: 18,
    height: 44,
    textDecorationLine: 'line-through'
  }
});
