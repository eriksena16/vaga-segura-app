import { Ionicons } from '@expo/vector-icons';
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
interface FooterProps {
  active?: string; // Para indicar a tela ativa
  onNavigate?: (screen: string) => void; // Callback de navegação
}

const Footer: React.FC<FooterProps> = ({ active, onNavigate }) => {
  const buttons: { key: string; icon: React.ComponentProps<typeof Ionicons>['name']; label: string }[] = [
    { key: '/principal/page', icon: 'home-outline', label: 'Home' },
    { key: '/list/page', icon: 'people-outline', label: 'Clientes' },
    { key: 'Vagas', icon: 'car-sport-outline', label: 'Vagas' },
    { key: 'Pagamentos', icon: 'card-outline', label: 'Pagamentos' },
  ];

  return (
    <View style={styles.footer}>
      {buttons.map(btn => (
        <TouchableOpacity 
          key={btn.key} 
          style={styles.footerButton}
          onPress={() => onNavigate?.(btn.key)}
        >
          <Ionicons 
            name={btn.icon} 
            size={24} 
            color={active === btn.key ? '#3B82F6' : '#1E3A8A'} 
          />
          <Text style={[styles.footerText, { color: active === btn.key ? '#3B82F6' : '#1E3A8A' }]}>
            {btn.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingVertical: 10,
    position: 'absolute',
    bottom: 0,
  },
  footerButton: { alignItems: 'center' },
  footerText: { fontSize: 12, marginTop: 2 },
});

export default Footer;
