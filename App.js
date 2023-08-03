import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View, Button, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';

export default function App() {
  const [text, onChangeText] = React.useState('')
  const [texto, onTexto] = React.useState([])

    return (
    <View style={styles.container}>
      <TextInput
        onChangeText={onChangeText}
        value={text}
        placeholder="Ingresar texto"
      />
      <View style={styles.posicionCentrado}>
        <TouchableOpacity style={styles.botonAgregar}>
          <Text style={[{ fontSize: '1rem', fontWeight: "bold", }]}>Agregar tarea</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={[
          { key: 'tarea 1' },
        ]}
        renderItem={({ item }) => <Text style={styles.item}>{item.key}</Text>}
      />
      <Text>{texto}</Text>
    </View>
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
  posicionCentrado:{
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
  }
});
