import { getParkings } from "@/src/services/customerService";
import { CustomerProps, ParkingProps } from "@/src/types/userTypes";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import PhoneInput from "react-native-phone-number-input";

type Props = {
  visible: boolean;
  onClose: () => void;
  onSave: (customer: CustomerProps) => void;
};

export default function CustomerFormModal({ visible, onClose, onSave }: Props) {
  const TypedPhoneInput: any = PhoneInput;
  const [parkings, setParkings] = useState<ParkingProps[]>([]);
  const [parkingId, setParkingId] = useState<string>("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const phoneInput = useRef<PhoneInput>(null);
  const [plate, setPlate] = useState("");
  const [dueDate, setDueDate] = useState("");

  const [pickerVisible, setPickerVisible] = useState(false);
  const [searchParking, setSearchParking] = useState("");

  useEffect(() => {
    const fetchParkings = async () => {
      if (visible) {
        const response = await getParkings({ available: true });
        setParkings(response);
      }
    };
    fetchParkings();
  }, [visible]);

  const handleSave = () => {
    const newCustomer: CustomerProps = {
      id: "", // gerado no backend
      parkingId,
      name,
      phone,
      plate,
      amount: 0,
      dueDay: Number(dueDate),
    };
    onSave(newCustomer);
    onClose();
  };

  const selectedParkingLabel =
    parkings.find((p) => p.id === parkingId)?.location ?? "Selecione uma vaga";

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.title}>Cadastrar Cliente</Text>

          <View style={styles.inputGroup}>
            <Ionicons name="person-outline" size={22} color="#555" style={styles.icon} />
            <TextInput
              placeholder="Nome"
              style={styles.input}
              value={name}
              onChangeText={setName}
            />
          </View>

          {/* <View style={styles.inputGroup}>
            <Ionicons name="call-outline" size={22} color="#555" style={styles.icon} />
            <TextInput
              placeholder="Telefone"
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
          </View> */}

          <View style={styles.inputGroup}>
            <Ionicons
              name="call-outline"
              size={22}
              color="#555"
              style={styles.icon}
            />
            <TypedPhoneInput
              ref={phoneInput}
              defaultValue={phone}
              defaultCode="BR"
              layout="first"
              onChangeFormattedText={(text: string) => setPhone(text)}
               placeholder="Telefone"
              containerStyle={{
                flex: 1,
                height: 50,
                backgroundColor: "transparent",
                borderWidth: 0,
              }}
              textContainerStyle={{
                backgroundColor: "transparent",
                paddingVertical: 0,
                borderWidth: 0,
              }}
            />
          </View>


          <View style={styles.inputGroup}>
            <Ionicons name="car-outline" size={22} color="#555" style={styles.icon} />
            <TextInput
              placeholder="Placa"
              style={styles.input}
              value={plate}
              onChangeText={setPlate}
            />
          </View>

          <View style={styles.inputGroup}>
            <Ionicons name="calendar-outline" size={22} color="#555" style={styles.icon} />
            <TextInput
              placeholder="Dia de Vencimento"
              style={styles.input}
              value={dueDate}
              onChangeText={setDueDate}
              keyboardType="numeric"
            />
          </View>

          {/* Dropdown custom */}
          <View style={styles.inputGroup}>
            <Ionicons name="location-outline" size={22} color="#555" style={styles.icon} />
            <TouchableOpacity
              style={styles.pickerButton}
              onPress={() => {
                setSearchParking("");
                setPickerVisible(true);
              }}
            >
              <Text style={styles.pickerText}>{selectedParkingLabel}</Text>
              <Ionicons name="chevron-down-outline" size={20} color="#555" />
            </TouchableOpacity>
          </View>

          {/* Modal de seleção */}
          <Modal
            visible={pickerVisible}
            animationType="slide"
            transparent
            onRequestClose={() => setPickerVisible(false)}
          >
            <View style={styles.overlay}>
              <View style={styles.modalDropdown}>
                <View style={styles.modalHeader}>
                  <TextInput
                    placeholder="Buscar vaga..."
                    value={searchParking}
                    onChangeText={setSearchParking}
                    style={styles.searchInput}
                    autoFocus
                  />
                  <TouchableOpacity
                    onPress={() => setPickerVisible(false)}
                    style={styles.closeButton}
                  >
                    <Ionicons name="close" size={22} color="#333" />
                  </TouchableOpacity>
                </View>

                <FlatList
                  data={parkings.filter((p) =>
                    p.location?.toLowerCase().includes(searchParking.toLowerCase())
                  )}
                  keyExtractor={(item) => item.id}
                  keyboardShouldPersistTaps="handled"
                  style={styles.modalList}
                  renderItem={({ item }) => {
                    const isSelected = item.id === parkingId;
                    return (
                      <TouchableOpacity
                        style={[styles.dropdownItem, isSelected && styles.dropdownItemSelected]}
                        onPress={() => {
                          setParkingId(item.id);
                          setPickerVisible(false);
                        }}
                      >
                        <Text
                          style={[
                            styles.dropdownItemText,
                            isSelected && { fontWeight: "700" },
                          ]}
                        >
                          Vaga: {item.location}
                        </Text>
                        {isSelected && <Ionicons name="checkmark" size={18} color="#3B82F6" />}
                      </TouchableOpacity>
                    );
                  }}
                  ListEmptyComponent={
                    <View style={{ padding: 12 }}>
                      <Text style={{ color: "#666" }}>Nenhuma vaga encontrada</Text>
                    </View>
                  }
                />
              </View>
            </View>
          </Modal>

          <View style={styles.actions}>
            <Button title="Cancelar" onPress={onClose} color="#999" />
            <Button title="Salvar" onPress={handleSave} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  card: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  inputGroup: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 12,
    backgroundColor: "#f9f9f9",
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
  },
  pickerButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 6,
  },
  pickerText: {
    flex: 1,
    color: "#111",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  modalDropdown: {
    width: "90%",
    maxHeight: "70%",
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingVertical: 8,
    paddingHorizontal: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: "#F9FAFB",
  },
  closeButton: {
    marginLeft: 8,
    padding: 6,
  },
  modalList: {
    marginTop: 6,
  },
  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  dropdownItemSelected: {
    backgroundColor: "#F1F5FF",
  },
  dropdownItemText: {
    color: "#111",
  },
  container: {
    marginVertical: 5,
  }
});

export { CustomerFormModal };

