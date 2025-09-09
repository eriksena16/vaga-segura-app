import CustomButton from "@/components/CustomButton";
import CustomerFormModal from "@/components/CustomerFormModal";
import Header from "@/components/header";
import Colors from "@/constants/Colors";
import { getCustomers } from "@/src/services/customerService";
import { CustomerListProps, CustomerProps } from "@/src/types/userTypes";
import { Ionicons } from "@expo/vector-icons";
import { useSearchParams } from "expo-router/build/hooks";
import { useEffect, useState } from "react";
import {
  FlatList,
  Modal,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import styles from "./styles";

export default function CustomerList({ customers }: CustomerListProps) {
  const [filters, setFilters] = useState({ number: "", plate: "", phone: "" });
  const [modalFilterVisible, setModalFilterVisible] = useState(false);
  const [modalCustomerVisible, setModalCustomerVisible] = useState(false);
  const [customerList, setCustomers] = useState<CustomerProps[]>(customers || []);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const params = useSearchParams();

  const paidParam = params.get?.("paid");
  const paidFilter =
    paidParam === "true" ? true :
      paidParam === "false" ? false :
        undefined;



  async function fetchCustomers() {
    try {
      console.log("Filtro paid:", paidFilter);
      const response = await getCustomers({ paid: paidFilter });
      setCustomers(response);
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
    }
  }

  useEffect(() => {
    fetchCustomers();
  }, [paidFilter]);

  const renderItem = ({ item }: { item: CustomerProps }) => (
    <View style={styles.customerCard}>
      <View style={styles.customerInfo}>
        <Text style={styles.customerName}>{item.name}</Text>
        <Text style={styles.customerPlate}>Placa: {item.plate}</Text>
        <Text style={styles.customerPlate}>Telefone: {item.phone}</Text>
        <Text style={styles.customerPlate}>Dia de vencimento: {item.dueDay}</Text>
        <Text style={styles.customerPlate}>Número da vaga: {item.parking?.location}</Text>
        <Text style={[styles.customerStatus, item.isPaid ? styles.paid : styles.pending]}>
          {item.isPaid ? "Adimplente" : "Inadimplente"}
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
      <View style={styles.container} >
      <Header title="Lista de Clientes" />
      {/* Top Buttons */}
      <View style={styles.topButtons}>
        <TouchableOpacity style={styles.filterButton} onPress={() => setModalFilterVisible(true)}>
          <Ionicons name="filter" size={20} color="#fff" />
          <Text style={styles.filterButtonText}>Filtros</Text>
        </TouchableOpacity>
      </View>

      {/* Modal de filtros */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalFilterVisible}
        onRequestClose={() => setModalFilterVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filtros</Text>
            <TextInput
              style={styles.input}
              placeholder="Nº da Vaga"
              value={filters.number}
              onChangeText={text => setFilters({ ...filters, number: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Placa"
              value={filters.plate}
              onChangeText={text => setFilters({ ...filters, plate: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Telefone"
              value={filters.phone}
              onChangeText={text => setFilters({ ...filters, phone: text })}
            />
            <View style={styles.modalButtons}>
              <CustomButton
                title="Fechar"
                onPress={() => setModalFilterVisible(false)}
                color={Colors.gray}
                size="medium"
              />

              <CustomButton
                title="Aplicar"
                onPress={() => setModalFilterVisible(false)}
                color={Colors.secundaryBlue}
                size="medium"

              />
            </View>
          </View>
        </View>
      </Modal>

      <View style={{ flex: 1 }}>
        <FlatList
          data={customerList}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 120 }} // espaço para botão + footer
        />
        <CustomerFormModal
          visible={modalCustomerVisible}
          onClose={() => setModalCustomerVisible(false)}
         onSave={(newCustomer: CustomerProps) => {
          setCustomers((prev) => [...prev, newCustomer]);
        }}
          fetchCustomers={fetchCustomers}
          setErrorMessage={setErrorMessage}
        />
      </View>
      {/* Botão Adicionar Cliente */}
      <TouchableOpacity style={styles.addButton}
        onPress={() => setModalCustomerVisible(true)}>
        <Ionicons name="add" size={24} color="#fff" />
        <Text style={styles.addButtonText}>Adicionar Cliente</Text>
      </TouchableOpacity>
     </View>
    </SafeAreaView>
  );
}
