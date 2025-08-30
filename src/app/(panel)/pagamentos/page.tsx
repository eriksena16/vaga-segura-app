import { getPayments } from "@/src/services/costumerService";
import { PaymentListProps, PaymentProps } from "@/src/types/userTypes";
import { useSearchParams } from "expo-router/build/hooks";
import React, { useEffect, useState } from "react";
import { Button, FlatList, Modal, Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";

export default function PaymentList({ payments }: PaymentListProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [paymentSelecionado, setPaymentSelecionado] = useState<PaymentProps | null>(null);
  const [paymentList, setPaymentList] = useState<PaymentProps[]>(payments || []);
  const params = useSearchParams();

  const paidParam = params.get?.("paid");
  const paidFilter =
    paidParam === "true" ? true :
      paidParam === "false" ? false :
        undefined;

  async function fetchPayments() {
    try {
      console.log("Filtro paid:", paidFilter);
      const response = await getPayments({ paid: paidFilter });
      setPaymentList(response);
    } catch (error) {
      console.error("Erro ao buscar pagamentos:", error);
    }
  }

  useEffect(() => {
    fetchPayments();
  }, [paidFilter]);
  
  const confirmarPayment = () => {
    if (paymentSelecionado) {
      setPaymentList(prev =>
        prev.map(p =>
          p.id === paymentSelecionado.id ? { ...p, paymentSatus: "Paid" } : p
        )
      );
    }
    setModalVisible(false);
  };

  const renderItem = ({ item }: { item: PaymentProps }) => (
    <View style={styles.card}>
      <Text style={styles.cliente}>{item.costumer?.name}</Text>
      <Text style={styles.texto}>Valor: R$ {item.amount}</Text>
      <Text style={styles.texto}>Data: {item.dueDate}</Text>
      <Text style={[styles.texto, item.paymentSatus === "Paid" && styles.statusPago]}>
        Status: {item.paymentSatus}
      </Text>

      {item.paymentSatus === "Pending" && (
        <TouchableOpacity
          style={styles.botao}
          onPress={() => {
            setPaymentSelecionado(item);
            setModalVisible(true);
          }}
        >
          <Text style={styles.botaoTexto}>Marcar como Pago</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Pagamentos Pendentes</Text>
      <FlatList
        data={payments.filter(p => p.paymentSatus === "Pending")}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />

      {/* Modal de Confirmação */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>
              Confirmar pagamento de {paymentSelecionado?.costumer?.name}?
            </Text>
            <View style={styles.modalBotoes}>
              <Button title="Cancelar" onPress={() => setModalVisible(false)} />
              <Button title="Confirmar" onPress={confirmarPayment} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

