import Footer from '@/components/Footer';
import { Ionicons, MaterialIcons } from '@expo/vector-icons'; // Para ícones
import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
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
};

const quickActions: QuickAction[] = [
  { id: '1', title: 'Clientes Adimplentes', icon: 'person', color: '#3B82F6' },
  { id: '2', title: 'Clientes Inadimplentes', icon: 'warning', color: '#3B82F6' },
  { id: '3', title: 'Vagas Disponíveis', icon: 'local-parking', color: '#3B82F6' },
  { id: '4', title: 'Registrar Pagamento', icon: 'credit-card', color: '#3B82F6' },
];

export default function Dashboard() {
  return (
    <SafeAreaView style={styles.container}>
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>VagaSegura</Text>
        <Ionicons name="person-circle-outline" size={32} color="#1E3A8A" />
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        {/* Atalhos Rápidos */}
        <Text style={styles.sectionTitle}>Atalhos</Text>
        <View style={styles.quickActionsContainer}>
          {quickActions.map(action => (
            <TouchableOpacity key={action.id} style={styles.quickCard}>
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
            <Text style={styles.indicatorValue}>120</Text>
          </View>

          <View style={styles.indicatorCard}>
            <Text style={styles.indicatorTitle}>Vagas Livres / Ocupadas</Text>
            <View style={styles.progressBarBackground}>
              <View style={[styles.progressBarFill, { width: '60%' }]} />
            </View>
            <Text style={styles.progressText}>12 / 8</Text>
          </View>

          <View style={styles.indicatorCard}>
            <Text style={styles.indicatorTitle}>Pagamentos Pendentes</Text>
            <Text style={[styles.indicatorValue, { color: 'red' }]}>5</Text>
          </View>
        </View>
      </ScrollView>

      {/* Rodapé */}
     <Footer 
  active="Home" 
  onNavigate={(screen) => console.log('Ir para:', screen)}
/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  logo: { fontSize: 24, fontWeight: 'bold', color: '#1E3A8A' },

  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1E3A8A', margin: 20 },

  quickActionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  quickCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  quickCardText: { marginTop: 10, color: '#1E3A8A', fontWeight: 'bold', textAlign: 'center' },

  indicatorsContainer: { paddingHorizontal: 20 },
  indicatorCard: {
    backgroundColor: '#F3F4F6',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
  },
  indicatorTitle: { color: '#1E3A8A', fontWeight: 'bold', marginBottom: 5 },
  indicatorValue: { fontSize: 24, fontWeight: 'bold', color: '#1E3A8A' },

  progressBarBackground: { height: 10, backgroundColor: '#E5E7EB', borderRadius: 5, marginTop: 5 },
  progressBarFill: { height: 10, backgroundColor: '#3B82F6', borderRadius: 5 },
  progressText: { marginTop: 5, color: '#1E3A8A' },

  footer: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingVertical: 10,
  },
  footerButton: { alignItems: 'center' },
  footerText: { fontSize: 12, color: '#1E3A8A', marginTop: 2 },
});
