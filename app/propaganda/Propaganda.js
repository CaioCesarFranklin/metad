import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

function Propaganda() {
  
  return (
    <View style={styles.areapropaganda}>
      <View style={styles.primeiroQuadro}>
        <View style={styles.ladoesquerdopq}>
          {/* Aqui você pode adicionar uma imagem */}
        </View>
        <View style={styles.ladodireitopq}>
          <Text style={styles.textPropaganda}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Libero ullam pariatur iusto quod,
            neque ad magnam qui aperiam. Atque, vero aliquid veniam neque deserunt totam! Modi iste fugit nesciunt nostrum.
          </Text>
        </View>
      </View>

      <View style={styles.segundoQuadro}>
        <View style={styles.ladoesquerdosq}>
          {/* Aqui você pode adicionar uma imagem */}
        </View>
        <View style={styles.ladodireitosq}>
          <Text style={styles.textPropaganda}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Libero ullam pariatur iusto quod,
            neque ad magnam qui aperiam. Atque, vero aliquid veniam neque deserunt totam! Modi iste fugit nesciunt nostrum.
          </Text>
        </View>
      </View>

      <View style={styles.terceiroQuadro}>
        <View style={styles.ladoesquerdotq}>
          {/* Aqui você pode adicionar uma imagem */}
        </View>
        <View style={styles.ladodireitotq}>
          <Text style={styles.textPropaganda}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Libero ullam pariatur iusto quod,
            neque ad magnam qui aperiam. Atque, vero aliquid veniam neque deserunt totam! Modi iste fugit nesciunt nostrum.
          </Text>
        </View>
      </View>

      <View style={styles.quartoQuarto}>
        <TouchableOpacity style={styles.acessararena}>
          <Text style={styles.acessararenaText}>Ver a ARENA</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  areapropaganda: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(181, 202, 144)',

    marginHorizontal: 'auto',
    height: 430,
    width: 420,
    borderRadius: 10,
  },
  primeiroQuadro: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 160,
    width: 380,
    backgroundColor: 'rgba(255, 255, 255, 0.274)',
    borderRadius: 15,
  },
  ladoesquerdopq: {
    marginLeft: 5,
    width: 200,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(233, 173, 62, 0.877)',
    borderRadius: 15,
  },
  ladodireitopq: {
    width: 190,
    height: 115,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.274)',
    borderRadius: 15,
  },
  segundoQuadro: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 160,
    width: 380,
    backgroundColor: 'rgba(255, 251, 0, 0.274)',
    borderRadius: 15,
  },
  ladoesquerdosq: {
    width: 200,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(233, 173, 62, 0.877)',
    borderRadius: 15,
  },
  ladodireitosq: {
    width: 190,
    height: 115,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.274)',
    borderRadius: 15,
  },
  terceiroQuadro: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 160,
    width: 380,
    backgroundColor: 'rgb(238, 255, 0)',
    borderRadius: 15,
  },
  ladoesquerdotq: {
    width: 200,
    height: 150,
    marginLeft: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(233, 173, 62, 0.877)',
    borderRadius: 15,
  },
  ladodireitotq: {
    width: 190,
    height: 115,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.274)',
    borderRadius: 15,
  },
  acessararena: {
    borderWidth: 0,
    height: 30,
    width: 200,
    borderRadius: 10,
    backgroundColor: 'rgb(255, 255, 0)',
    shadowColor: '#31312E',
    shadowOffset: {
      width: 2,
      height: 3,
    },
    shadowOpacity: 0.3,
  },
  acessararenaText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    lineHeight: 30,
  },
  textPropaganda: {
    fontSize: 10,
  },
});

export default Propaganda;
