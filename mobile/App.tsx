import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello World</Text>
      <Button title='Botão teste 1'/>
      <Button title='Botão teste 2'/>
      <Button title='Botão teste 3'/>
      <StatusBar style="light" />
    </View>
  );
}

interface ButtonProps {
  title: string;
}

function Button(props: ButtonProps) {
  return (
    <TouchableOpacity>
      <Text style={styles.button}>
        {props.title}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 22
  },
  button: {
    color: '#fff',
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginTop: 5
  }
});
