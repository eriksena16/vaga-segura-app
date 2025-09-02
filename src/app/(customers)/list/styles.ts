import Colors from "@/constants/Colors";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.principalWhite,
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  // Botões de filtro no topo
  topButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 20,
    paddingLeft: 10,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.secundaryBlue,
    padding: 12,
    marginTop: 10,
    borderRadius: 12,
  },
  filterButtonText: {
    color: "#fff",
    marginLeft: 8,
    fontWeight: "bold",
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    backgroundColor: Colors.principalWhite,
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: Colors.blackBlue,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    backgroundColor: "#F9FAFB",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  closeButton: {
    backgroundColor: "#9CA3AF",
    padding: 12,
    borderRadius: 12,
    flex: 1,
    marginRight: 5,
    alignItems: "center",
  },
  applyButton: {
    backgroundColor: Colors.blackBlue,
    padding: 12,
    borderRadius: 12,
    flex: 1,
    marginLeft: 5,
    alignItems: "center",
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },

  // Lista de clientes
  customerCard: {
    backgroundColor: Colors.lightGray,
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  customerInfo: {
    flex: 1,
  },
  customerName: {
    fontWeight: "bold",
    color: Colors.blackBlue,
    fontSize: 16,
    marginBottom: 4,
  },
  customerPlate: {
    color: "#374151",
    marginBottom: 4,
  },
  customerStatus: {
    fontWeight: "bold",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    textAlign: "center",
    alignSelf: "flex-start",
  },
  paid: { backgroundColor: "#D1FAE5", color: "#065F46" },
  pending: { backgroundColor: "#FEE2E2", color: "#991B1B" },

  actions: { flexDirection: "row", marginLeft: 10 },
  actionButton: {
    backgroundColor: Colors.blackBlue,
    padding: 8,
    borderRadius: 12,
    marginLeft: 5,
  },
  deactivate: { backgroundColor: "#EF4444" },

  // Botão adicionar cliente
  addButton: {
  position: "absolute",
  bottom: 20,
  right: 20,
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: Colors.secundaryBlue,
  paddingVertical: 12,
  paddingHorizontal: 20,
  borderRadius: 30,
  elevation: 5, // sombra no Android
  shadowColor: "#000", // sombra no iOS
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.3,
  shadowRadius: 3,
},
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 10,
    fontSize: 16,
  },
});
