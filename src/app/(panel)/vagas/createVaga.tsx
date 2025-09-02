import React, { useState } from "react";
import { SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

export default function CreateVagaScreen() {
    const [isMultiple, setIsMultiple] = useState(false);
    const [numeroVaga, setNumeroVaga] = useState("");
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");

    const handleSave = () => {
        if (isMultiple) {
            console.log(`Criar vagas de ${start} até ${end}`);
            // aqui você poderia chamar API para criar várias
        } else {
            console.log(`Criar vaga número ${numeroVaga}`);
            // aqui você chama API para criar só uma
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
            <View style={styles.container}>
                <Text style={styles.title}>Criar Vaga</Text>
                <View style={styles.card}>
                    {/* Checkbox fake */}
                    <TouchableOpacity
                        style={styles.checkboxContainer}
                        onPress={() => setIsMultiple(!isMultiple)}
                    >
                        <View style={[styles.checkbox, isMultiple && styles.checked]} />
                        <Text style={styles.checkboxLabel}>Adicionar mais de uma</Text>
                    </TouchableOpacity>

                    {!isMultiple ? (
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Número da Vaga</Text>
                            <TextInput
                                style={styles.input}
                                keyboardType="numeric"
                                value={numeroVaga}
                                onChangeText={setNumeroVaga}
                            />
                        </View>
                    ) : (
                        <View>
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Início</Text>
                                <TextInput
                                    style={styles.input}
                                    keyboardType="numeric"
                                    value={start}
                                    onChangeText={setStart}
                                />
                            </View>
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Fim</Text>
                                <TextInput
                                    style={styles.input}
                                    keyboardType="numeric"
                                    value={end}
                                    onChangeText={setEnd}
                                />
                            </View>
                        </View>
                    )}

                    <TouchableOpacity style={styles.button} onPress={handleSave}>
                        <Text style={styles.buttonText}>Salvar</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </SafeAreaView>
    );
}
