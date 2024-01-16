import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';

const CalculadoraPintos = () => {
  const [totalPintos, setTotalPintos] = useState('');
  const [tipoGalpao, setTipoGalpao] = useState('');
  const [resultado, setResultado] = useState('');
  const [mostrarImagemInicial, setMostrarImagemInicial] = useState(true);
  const [botaoPressionado, setBotaoPressionado] = useState('');

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setMostrarImagemInicial(false);
    }, 3000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  const calcularPintosPorGaiolaEFileira = (total, capacidadePorFileira, fileiras) => {
    const pintosPorGaiola = Math.floor(total / fileiras / capacidadePorFileira);
    const pintosRestantes = total % (fileiras * capacidadePorFileira);
  
    let distribuicaoPintosPorFileira = Array(fileiras).fill(pintosPorGaiola);
  
    const novaDistribuicao = distribuicaoPintosPorFileira.map((qtd, i) => {
      if (i < pintosRestantes) {
        return qtd + 1;
      }
      return qtd;
    });
  
    setResultado(`Acomodação de pintos por gaiola: ${pintosPorGaiola}`);
    setResultado(
      `Distribuição de pintos por fileira:\n${novaDistribuicao
        .map((qtd, i) => `Fileira ${i + 1}: ${qtd} pintos`)
        .join('\n')}`
    );
  };
  

  const handleCalcular = () => {
    const total = parseInt(totalPintos, 10);

    if (isNaN(total)) {
      setResultado('Por favor, insira um valor válido para o total de pintos.');
    } else {
      switch (tipoGalpao) {
        case 'A':
          calcularPintosPorGaiolaEFileira(total, 63, 12);
          break;
        case 'B':
          calcularPintosPorGaiolaEFileira(total, 42, 12);
          break;
        case 'C':
          calcularPintosPorGaiolaEFileira(total, 97, 6);
          break;
        case 'D':
          calcularPintosPorGaiolaEFileira(total, 84, 6);
          break;
        default:
          setResultado('Selecione um tipo de galpão válido.');
      }
    }
  };

  const handleBotaoPressionado = (tipo) => {
    setBotaoPressionado(tipo);
    setTipoGalpao(tipo);
  };

  return (
    <View style={styles.container}>
      {mostrarImagemInicial && (
        <Image
          source={require('./src/assets/tijuca.png')}
          style={styles.imagemInicial}
        />
      )}

      {!mostrarImagemInicial && (
        <View style={styles.content}>
          <Text style={styles.label}>Informe o número total de pintos:</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Total de pintos"
            value={totalPintos}
            onChangeText={(text) => setTotalPintos(text)}
          />

          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={[styles.button, botaoPressionado === 'A' && styles.botaoPressionado]}
              onPress={() => handleBotaoPressionado('A')}
            >
              <Text style={styles.buttonText}>Pinteiro 1 e 2</Text>
            </TouchableOpacity>
            <View style={styles.horizontalSpacer} />
            <TouchableOpacity
              style={[styles.button, botaoPressionado === 'B' && styles.botaoPressionado]}
              onPress={() => handleBotaoPressionado('B')}
            >
              <Text style={styles.buttonText}>Pinteiro 3 e 4</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={[styles.button, botaoPressionado === 'C' && styles.botaoPressionado]}
              onPress={() => handleBotaoPressionado('C')}
            >
              <Text style={styles.buttonText}>Pinteiro 5</Text>
            </TouchableOpacity>
            <View style={styles.horizontalSpacer} />
            <TouchableOpacity
              style={[styles.button, botaoPressionado === 'D' && styles.botaoPressionado]}
              onPress={() => handleBotaoPressionado('D')}
            >
              <Text style={styles.buttonText}>Pinteiro 6</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.calcularButton} onPress={handleCalcular}>
            <Text style={styles.buttonText}>Calcular</Text>
          </TouchableOpacity>

          <Text style={styles.resultado}>{resultado}</Text>
        </View>
      )}
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
    
    
  },
  imagemInicial: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    backgroundColor: 'black',
  },
  content: {
    width: '80%',
    color: 'red',
  },
  label: {
    marginBottom: 8,
    color: 'white',
    fontSize: 17,
  },
  input: {
    height: 40,
    borderColor: 'grey',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
    backgroundColor: 'grey',
    color: 'white',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 10,
    flex: 1,
  },
  botaoPressionado: {
    backgroundColor: 'darkblue',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  horizontalSpacer: {
    width: 10,
  },
  calcularButton: {
    backgroundColor: '#0000CD',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  resultado: {
    marginTop: 16,
    color: 'white',
    fontSize: 16, // Ajuste o tamanho da fonte conforme necessário
    textAlign: 'center', // Centralize o texto
    borderWidth: 1,
    borderColor: 'green',
    padding: 10,
    backgroundColor: 'green',
    borderRadius: 8,
    margin: 9,
    elevation: 1,
    shadowColor: 'rgba(0, 0, 0, 0.4)',
    shadowOffset: { width: 100, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 200,



    borderWidth: 0,
  },
  containerText: {
    color: 'blue',
    fontSize: 25,
    textAlign: 'center',
    backgroundColor: 'blue',
    borderColor: 'blue',
    height: 80,
    width: 400,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
    
  },
  textoContainer: {
    color: 'white',
    fontSize: 25,
    flex: 2,
  },
});

export default CalculadoraPintos;
