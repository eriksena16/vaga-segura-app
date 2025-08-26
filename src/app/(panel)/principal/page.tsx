import { setupApiToken } from '@/src/services/api';
import { getDashboard } from '@/src/services/dashboardService';
import { DashboardProps } from '@/src/types/userTypes';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import styles from './styles';

// Dados fictícios
type MaterialIconName =
  | "person"
  | "warning"
  | "local-parking"
  | "credit-card";

type QuickAction = {
  id: string;
  title: string;
  icon: MaterialIconName;
  color: string;
  screen: string;
};

const quickActions: QuickAction[] = [
  { id: '1', title: 'Clientes Adimplentes', icon: 'person', color: '#3B82F6', screen: "/list/page" },
  { id: '2', title: 'Clientes Inadimplentes', icon: 'warning', color: '#3B82F6', screen: 'Inadimplentes' },
  { id: '3', title: 'Vagas Disponíveis', icon: 'local-parking', color: '#3B82F6', screen: 'Vagas' },
  { id: '4', title: 'Registrar Pagamento', icon: 'credit-card', color: '#3B82F6', screen: 'RegistrarPagamento' },
];

export default function DashboardPage() {
  const [data, setData] = useState<DashboardProps | null>(null);
  useEffect(() => {
    async function fetchDashboard() {
      try {
        const token = await AsyncStorage.getItem("accessToken");
        console.log("Token:", token);
        setupApiToken(token ?? undefined);
        const result = await getDashboard();
        setData(result);
      } catch (error) {
        console.log('Erro ao buscar dashboard:', error);
      } finally {
        // setLoading(false);
      }
    }

    fetchDashboard();
  }, []);
  return (
    <SafeAreaView style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>Dashboard</Text>
        <Ionicons name="person-circle-outline" size={32} color="#1E3A8A" />
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        {/* Atalhos Rápidos */}
        <Text style={styles.sectionTitle}>Atalhos</Text>
        <View style={styles.quickActionsContainer}>
          {quickActions.map(action => (
            <TouchableOpacity
              key={action.id}
              style={styles.quickCard}
              onPress={() => router.push("/list/page")}
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
            <Text style={styles.indicatorValue}>{data?.totalCostumers || 0}</Text>
          </View>

          <View style={styles.indicatorCard}>
            <Text style={styles.indicatorTitle}>Vagas Livres / Ocupadas</Text>
            <View style={styles.progressBarBackground}>
              <View
                style={[
                  styles.progressBarFill,
                  {
                    width: data
                      ? `${(data.availableParking / (data.availableParking + data.occupiedParking)) * 100}%`
                      : '0%',
                  },
                ]}
              />
            </View>
            <Text style={styles.progressText}>
              {data?.availableParking || 0} / {data?.occupiedParking || 0}
            </Text>
          </View>


          <View style={styles.indicatorCard}>
            <Text style={styles.indicatorTitle}>Pagamentos Pendentes</Text>
            <Text style={[styles.indicatorValue, { color: 'red' }]}>{data?.paymentPending || 0}</Text>
          </View>
        </View>
      </ScrollView>

      
    </SafeAreaView>
  );
}


