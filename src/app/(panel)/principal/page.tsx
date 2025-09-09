import Header from '@/components/header';
import { setupApiToken } from '@/src/services/api';
import { getDashboard } from '@/src/services/dashboardService';
import { DashboardProps } from '@/src/types/userTypes';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Route } from "expo-router";
import { router } from 'expo-router';
import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import styles from './styles';

type MaterialIconName = "person" | "warning" | "local-parking" | "credit-card";

type QuickAction = {
  id: string;
  title: string;
  icon: MaterialIconName;
  color: string;
  routeName: Route;
  params?: Record<string, any>;
};

const quickActions: QuickAction[] = [
  {
    id: '1',
    title: 'Clientes Adimplentes',
    icon: 'person',
    color: '#3B82F6',
    routeName: '/list/page',
    params: { paid: 'true' },
  },
  {
    id: '2',
    title: 'Clientes Inadimplentes',
    icon: 'warning',
    color: '#3B82F6',
    routeName: '/list/page',
    params: { paid: 'false' },
  },
  {
    id: '3',
    title: 'Vagas Disponíveis',
    icon: 'local-parking',
    color: '#3B82F6',
    routeName: '/vagas/page',
    params: { available: 'true' },
  },
  {
    id: '4',
    title: 'Registrar Pagamento',
    icon: 'credit-card',
    color: '#3B82F6',
    routeName: '/pagamentos/page',
    params: { paid: 'false' },
  }
];

export default function DashboardPage() {
  const [data, setData] = useState<DashboardProps | null>(null);

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const token = await AsyncStorage.getItem("accessToken");
        setupApiToken(token ?? undefined);
        const result = await getDashboard();
        setData(result);
      } catch (error) {
        console.log('Erro ao buscar dashboard:', error);
      }
    }
    fetchDashboard();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <View style={styles.container} >
         {/* Header */}
      <Header title="Dashboard" />
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        {/* Atalhos Rápidos */}
        <Text style={styles.sectionTitle}>Atalhos</Text>
        <View style={styles.quickActionsContainer}>
          {quickActions.map(action => (
            <TouchableOpacity
              key={action.id}
              style={styles.quickCard}
              onPress={() => router.push({ pathname: action.routeName, params: action.params })}
            >
              <MaterialIcons name={action.icon} size={32} color={action.color} />
              <Text style={styles.quickCardText}>{action.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Indicadores */}
        <Text style={styles.sectionTitle}>Indicadores</Text>
        <View style={styles.indicatorsContainer}>
          <View style={styles.indicatorCard}>
            <Text style={styles.indicatorTitle}>Total de Clientes</Text>
            <Text style={styles.indicatorValue}>{data?.totalCustomers || 0}</Text>
          </View>

          <View style={styles.indicatorCard}>
            <Text style={styles.indicatorTitle}> Ocupadas / Vagas Livres</Text>
            <View style={styles.progressBarBackground}>
              <View
                style={[
                  styles.progressBarFill,
                  {
                    width: data
                      ? `${(data.occupiedParking / (data.availableParking + data.occupiedParking)) * 100}%`
                      : '0%',
                  },
                ]}
              />
            </View>
            <Text style={styles.progressText}>
              {data?.occupiedParking || 0} / {data?.availableParking || 0}
            </Text>
          </View>

          <View style={styles.indicatorCard}>
            <Text style={styles.indicatorTitle}>Pagamentos Pendentes</Text>
            <Text style={[styles.indicatorValue, { color: 'red' }]}>{data?.paymentPending || 0}</Text>
          </View>
        </View>
      </ScrollView>
      </View>
     
    </SafeAreaView>
  );
}
