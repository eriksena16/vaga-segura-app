import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';

export default function VagasPage() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 18 }}>Vagas Disponíveis</Text>
      </View>
    </SafeAreaView>
  );
}