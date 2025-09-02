import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from "react-native";

type HeaderProps = {
    title: string;
};

export const Header = ({ title }: HeaderProps) => {
    return (
        <View style={styles.header}>
            <Text style={styles.logo}>{title}</Text>
            <Ionicons name="person-circle-outline" size={32} color="#1E3A8A" />
        </View>
    );
};

export default Header;

const styles = StyleSheet.create({

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
  logo: { fontSize: 24, fontWeight: 'bold', color: Colors.blackBlue},

});
