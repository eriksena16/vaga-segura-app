import ErrorModal from "@/components/errorModal";
import Colors from "@/constants/Colors";
import { confirmePayment, getPayments } from "@/src/services/customerService";
import { PaymentListProps, PaymentProps } from "@/src/types/userTypes";
import { useSearchParams } from "expo-router/build/hooks";
import React, { useCallback, useEffect, useState } from "react";
import { Button, FlatList, Modal, RefreshControl, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import Header from "@/components/header";

export default function PaymentList({ payments }: PaymentListProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [paymentSelecionado, setPaymentSelecionado] = useState<PaymentProps | null>(null);
  const [paymentList, setPaymentList] = useState<PaymentProps[]>(payments || []);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const params = useSearchParams();
  const paidParam = params.get?.("paid");
  const paidFilter =
    paidParam === "true" ? true :
    paidParam === "false" ? false :
    undefined;

  const fetchPayments = useCallback(async () => {
    try {
      console.log("Filtro paid:", paidFilter);
      const response = await getPayments({ paid: paidFilter });
      setPaymentList(response);
    } catch (error) {
      console.error("Erro ao buscar pagamentos:", error);
    }
  }, [paidFilter]);

  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchPayments();
    setRefreshing(false);
  }, [fetchPayments]);

 const confirmarPayment = async () => {
  if (paymentSelecionado) {
    try {
      // Chama a API para confirmar pagamento
      await confirmePayment({
        customerId: paymentSelecionado.customer?.id,
        paymentId: paymentSelecionado.id,
      });

      // Atualiza a lista chamando novamente a API
      await fetchPayments();

    } catch (error: any) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Ocorreu um erro inesperado.");
      }
    } finally {
      setModalVisible(false);
    }
  }
};


  const renderItem = ({ item }: { item: PaymentProps }) => (
    <View style={styles.card}>
      <Text style={styles.cliente}>{item.customer?.name}</Text>
      <Text style={styles.texto}>Valor: R$ {item.amount}</Text>
      <Text style={styles.texto}>Data: {item.dueDate}</Text>
      <Text
        style={[
          styles.texto,
          item.paymentSatus === "Paid" ? styles.statusPago : styles.statusPendente,
        ]}
      >
        Status: {item.paymentSatus === "Paid" ? "Pago" : "Pendente"}
      </Text>
      <Text style={styles.texto}>Número da vaga: {item.customer?.parking?.location}</Text>
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
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
    <View style={styles.container}>
      <Header title="Pagamentos" />

      <FlatList
        data={paymentList}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
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
              Confirmar pagamento de {paymentSelecionado?.customer?.name}?
            </Text>
            <View style={styles.modalBotoes}>
              <Button title="Cancelar" onPress={() => setModalVisible(false)} />
              <Button title="Confirmar" onPress={confirmarPayment} />
            </View>
          </View>
        </View>
      </Modal>

      {errorMessage && (
        <ErrorModal
          visible={!!errorMessage}
          message={errorMessage}
          onClose={() => setErrorMessage(null)}
        />
      )}
    </View>
    </SafeAreaView>
  );
}
