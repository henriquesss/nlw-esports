// Componentes e Propriedades

interface ButtonProps {
  title: string;
}

function Button(props: ButtonProps) {
  return <button>{props.title}</button>
}

function App() {
  return (
    <>
      <Button title="Teste"/>
      <Button title="Testando"/>
      <Button title="Um dois"/>
    </>
  )
}

export default App
