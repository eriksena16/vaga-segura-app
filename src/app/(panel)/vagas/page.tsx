import Colors from "@/constants/Colors";
import { getParkings } from "@/src/services/customerService";
import { ParkingListProps, ParkingProps } from "@/src/types/userTypes";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useSearchParams } from "expo-router/build/hooks";
import { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  RefreshControl,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "../../(customers)/list/styles";

export default function ParkingList({ parkings }: ParkingListProps) {
  const [filters, setFilters] = useState({ number: "", plate: "", phone: "" });
  const [modalVisible, setModalVisible] = useState(false);
  const [parkingList, setParkings] = useState<ParkingProps[]>(parkings || []);
  const [refreshing, setRefreshing] = useState(false);

  const statusConfig: Record<string, { text: string; style: any }> = {
    Available: { text: "Disponivel", style: styles.paid },
    Occupied: { text: "Ocupado", style: styles.pending },
  };
  const params = useSearchParams();
  const availableParam = params.get?.("available");
  const availableFilter =
    availableParam === "true"
      ? true
      : availableParam === "false"
        ? false
        : undefined;

  const fetchPayments = useCallback(async () => {
    try {
      console.log("Filtro Available:", availableFilter);
      const response = await getParkings({ available: availableFilter });
      setParkings(response);
    } catch (error) {
      console.error("Erro ao buscar pagamentos:", error);
    }
  }, [availableFilter]);

  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchPayments();
    setRefreshing(false);
  }, [fetchPayments]);

  const renderItem = ({ item }: { item: ParkingProps }) => {
    const status =
      statusConfig[item.status] ?? {
        text: "Unknown",
        style: styles.pending,
      };

    return (
      <View style={styles.customerCard}>
        <View style={styles.customerInfo}>
          <Text style={styles.customerName}>Vaga: {item.location}</Text>
          {item.customer && (
            <>
              <Text style={styles.customerPlate}>Cliente: {item.customer?.name}</Text>
              <Text style={styles.customerPlate}>Placa: {item.customer?.plate}</Text>
              <Text style={styles.customerPlate}>Telefone: {item.customer?.phone}</Text>
            </>
          )}
          <Text style={[styles.customerStatus, status.style]}>
            {status.text}
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
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      {/* Top Buttons */}
      <View style={styles.topButtons}>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name="filter" size={20} color="#fff" />
          <Text style={styles.filterButtonText}>Filtros</Text>
        </TouchableOpacity>
      </View>

      {/* Modal de filtros */}
      <Modal
        animationType="slide"
        transparent
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
              onChangeText={(text) =>
                setFilters({ ...filters, number: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Placa"
              value={filters.plate}
              onChangeText={(text) =>
                setFilters({ ...filters, plate: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Telefone"
              value={filters.phone}
              onChangeText={(text) =>
                setFilters({ ...filters, phone: text })
              }
            />

            <View style={styles.modalButtons}>
              <Pressable
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Fechar</Text>
              </Pressable>
              <Pressable
                style={styles.applyButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Aplicar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* Lista de vagas */}
      <FlatList
        data={parkingList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 120 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[Colors.secundaryBlue]}
            tintColor={Colors.secundaryBlue}
          />
        }
      />

      {/* Botão Adicionar Vaga */}
      <TouchableOpacity style={styles.addButton}
        onPress={() => router.push('/(panel)/vagas/createVaga')}>
        <Ionicons name="add" size={24} color="#fff" />
        <Text style={styles.addButtonText}>Adicionar Vaga</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
