import { StatusBar } from 'expo-status-bar';
import {FlatList, StyleSheet, Text, View, Button, TextInput, } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <TextInput
      />
      <Button
      title="Agregar"
      />
      <FlatList
        data={[
          {key: 'tarea 1'},
        ]}
        renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
    item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
