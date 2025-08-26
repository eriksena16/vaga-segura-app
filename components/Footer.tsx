import { Ionicons } from '@expo/vector-icons';
import { usePathname, useRouter } from 'expo-router';
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
interface FooterProps {
  active?: string;
  onNavigate?: (screen: string) => void;
}

const Footer: React.FC<FooterProps> = ({ active, onNavigate }) => {
  const router = useRouter();
  const pathname = usePathname();

  const buttons: { key: string; icon: React.ComponentProps<typeof Ionicons>['name']; label: string }[] = [
    { key: '/principal/page', icon: 'home-outline', label: 'Home' },
    { key: '/list/page', icon: 'people-outline', label: 'Clientes' },
  ];

  const activeKey = active ?? buttons.find(btn => pathname.startsWith(btn.key))?.key;

  return (
    <View style={styles.footer}>
      {buttons.map(btn => (
        <TouchableOpacity
          key={btn.key} 
          style={styles.footerButton}
          onPress={() => {
            if (onNavigate) {
              onNavigate(btn.key);
            } else {
              router.push(btn.key as any);
            }
          }}
        >
          <Ionicons 
            name={btn.icon} 
            size={24} 
            color={activeKey === btn.key ? '#3B82F6' : '#1E3A8A'} 
          />
          <Text style={[styles.footerText, { color: activeKey === btn.key ? '#3B82F6' : '#1E3A8A' }]}>
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
