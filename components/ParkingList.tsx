import React from "react";
import { FlatList, TouchableOpacity, Text, View, StyleProp, ViewStyle, TextStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ParkingProps } from "@/src/types/userTypes";

interface ParkingListProps {
  parkings: ParkingProps[];
  searchParking: string;
  parkingId: string;
  setParkingId: (id: string) => void;
  setPickerVisible: (visible: boolean) => void;
  styles: {
    modalList: StyleProp<ViewStyle>;
    dropdownItem: StyleProp<ViewStyle>;
    dropdownItemSelected: StyleProp<ViewStyle>;
    dropdownItemText: StyleProp<TextStyle>;
  };
}

const ParkingList: React.FC<ParkingListProps> = ({
  parkings,
  searchParking,
  parkingId,
  setParkingId,
  setPickerVisible,
  styles,
}) => {
  return (
    <FlatList
      data={parkings.filter((p) =>
        p.location?.toLowerCase().includes(searchParking.toLowerCase())
      )}
      keyExtractor={(item) => item.id.toString()}
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
  );
};

export default ParkingList;
