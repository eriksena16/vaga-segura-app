import Footer from '@/components/Footer';
import { Stack } from 'expo-router';
import React from 'react';
import { SafeAreaView, View } from 'react-native';

export default function PanelGroupLayout() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <View style={{ flex: 1, paddingBottom: 70 }}>
        <Stack screenOptions={{ headerShown: false }} />
      </View>
      <Footer />
    </SafeAreaView>
  );
}

