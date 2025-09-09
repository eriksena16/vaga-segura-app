import Colors from "@/constants/Colors";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: { flex: 1,
    padding: 16,
    backgroundColor: "#FFFFFF"},

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
  logo: { fontSize: 24, fontWeight: 'bold', color: Colors.blackBlue, marginTop: 5 },

  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: Colors.blackBlue, margin: 20 },

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
  quickCardText: { marginTop: 10, color: Colors.blackBlue, fontWeight: 'bold', textAlign: 'center' },

  indicatorsContainer: { paddingHorizontal: 20 },
  indicatorCard: {
    backgroundColor: '#F3F4F6',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
  },
  indicatorTitle: { color: Colors.blackBlue, fontWeight: 'bold', marginBottom: 5 },
  indicatorValue: { fontSize: 24, fontWeight: 'bold', color: Colors.blackBlue },

  progressBarBackground: { height: 10, backgroundColor: Colors.gray, borderRadius: 5, marginTop: 5 },
  progressBarFill: { height: 10, backgroundColor: Colors.secundaryBlue, borderRadius: 5 },
  progressText: { marginTop: 5, color: Colors.blackBlue },

});