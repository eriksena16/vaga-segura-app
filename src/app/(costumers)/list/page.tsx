import Footer from "@/components/Footer";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
    FlatList,
    Modal,
    Pressable,
    SafeAreaView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import styles from "./styles";

export default function CustomerList() {
  const [filters, setFilters] = useState({
    number: "",
    plate: "",
    phone: "",
    status: "",
  });

  const [modalVisible, setModalVisible] = useState(false);

  const [customers, setCustomers] = useState([
    { id: 1, name: "João Silva", plate: "ABC-1234", phone: "99999-1111", status: "Pago" },
    { id: 2, name: "Maria Souza", plate: "XYZ-9876", phone: "98888-2222", status: "Pendente" },
    { id: 3, name: "Erik Sena", plate: "DEF-4567", phone: "97777-3333", status: "Pago" },
  ]);

  const renderItem = ({ item }: any) => (
    <View style={styles.customerCard}>
      <View style={styles.customerInfo}>
        <Text style={styles.customerName}>{item.name}</Text>
        <Text style={styles.customerPlate}>{item.plate}</Text>
        <Text style={[styles.customerStatus, item.status === "Pago" ? styles.paid : styles.pending]}>
          {item.status}
        </Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="create-outline" size={20} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.deactivate]}>
          <Ionicons name="close-circle-outline" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      {/* Top Buttons */}
      <View style={styles.topButtons}>
        <TouchableOpacity style={styles.filterButton} onPress={() => setModalVisible(true)}>
          <Ionicons name="filter" size={20} color="#fff" />
          <Text style={styles.filterButtonText}>Filtros</Text>
        </TouchableOpacity>
      </View>

      {/* Modal de filtros */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filtros</Text>

            <TextInput
              style={styles.input}
              placeholder="Nº da Vaga"
              value={filters.number}
              onChangeText={(text) => setFilters({ ...filters, number: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Placa"
              value={filters.plate}
              onChangeText={(text) => setFilters({ ...filters, plate: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Status"
              value={filters.status}
              onChangeText={(text) => setFilters({ ...filters, status: text })}
            />

            <View style={styles.modalButtons}>
              <Pressable style={styles.closeButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.modalButtonText}>Fechar</Text>
              </Pressable>
              <Pressable style={styles.applyButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.modalButtonText}>Aplicar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* Lista de clientes + botão adicionar */}
      <View style={{ flex: 1 }}>
        <FlatList
          data={customers}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 120 }} // espaço para botão + footer
        />

        {/* Botão Adicionar Cliente */}
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={24} color="#fff" />
          <Text style={styles.addButtonText}>Adicionar Cliente</Text>
        </TouchableOpacity>
      </View>

      {/* Footer fixo */}
      <Footer
        active={"Clientes"}
        onNavigate={(screen) => console.log("Navegar para:", screen)}
      />
    </SafeAreaView>
  );
}
