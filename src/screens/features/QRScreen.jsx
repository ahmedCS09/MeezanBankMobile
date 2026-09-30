import Header from "../../components/Header";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faQrcode } from "@fortawesome/free-solid-svg-icons/faQrcode";
import { faCamera } from "@fortawesome/free-solid-svg-icons/faCamera";

export default function QRScreen() {

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
            <Header title="QR Payments" />

            <View style={styles.qrScannerFrame}>
                <FontAwesomeIcon icon={faQrcode} color="#5C246E" size={120} />
                <Text style={styles.qrTitle}>Scan & Pay Instantly</Text>
                <Text style={styles.qrText}>Scan any Raast, PayPak, or Mastercard QR code at retail stores to make instant Shariah-compliant payments.</Text>
                <TouchableOpacity style={styles.primaryBtn} activeOpacity={0.8} onPress={() => Alert.alert("Camera", "Camera scanner will open.")}>
                    <FontAwesomeIcon icon={faCamera} color="white" size={16} />
                    <Text style={styles.primaryBtnText}>Open Camera Scanner</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#F8F5FB" },
    header: { backgroundColor: "#5C246E", flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, paddingVertical: 18, elevation: 4 },
    headerTitle: { fontSize: 18, fontWeight: "bold", color: "white" },
    backBtn: { padding: 6 },
    accountCard: { backgroundColor: "#caace3", margin: 16, borderRadius: 16, padding: 16, elevation: 2 },
    accountLabel: { fontSize: 12, color: "#4A154B", fontWeight: "600" },
    accountName: { fontSize: 18, fontWeight: "bold", color: "#2C0938", marginTop: 2 },
    accountNumber: { fontSize: 14, color: "#4A154B", marginTop: 2 },
    balanceBadge: { backgroundColor: "#5C246E", alignSelf: "flex-start", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, marginTop: 10 },
    balanceText: { color: "white", fontWeight: "bold", fontSize: 13 },
    tabContainer: { flexDirection: "row", marginHorizontal: 16, marginVertical: 12, backgroundColor: "#E6DBEE", borderRadius: 10, padding: 4 },
    tab: { flex: 1, paddingVertical: 10, alignItems: "center", borderRadius: 8 },
    activeTab: { backgroundColor: "#5C246E" },
    tabText: { color: "#5C246E", fontWeight: "600", fontSize: 13 },
    activeTabText: { color: "white" },
    formCard: { backgroundColor: "white", marginHorizontal: 16, borderRadius: 16, padding: 18, elevation: 2, marginBottom: 16 },
    sectionCard: { backgroundColor: "white", margin: 16, borderRadius: 16, padding: 16, elevation: 2 },
    sectionTitle: { fontSize: 16, fontWeight: "bold", color: "#2C0938", marginBottom: 12 },
    inputGroup: { marginBottom: 14 },
    label: { fontSize: 13, fontWeight: "600", color: "#4A154B", marginBottom: 6 },
    inputWrapper: { flexDirection: "row", alignItems: "center", borderWidth: 1, borderColor: "#DDD", borderRadius: 10, paddingHorizontal: 12, backgroundColor: "#FAFAFA", gap: 10 },
    input: { flex: 1, height: 46, fontSize: 14, color: "#333" },
    textArea: { height: 100, textAlignVertical: "top", padding: 12, borderWidth: 1, borderColor: '#DDD', borderRadius: 10 },
    primaryBtn: { backgroundColor: "#5C246E", borderRadius: 12, paddingVertical: 14, alignItems: "center", marginTop: 14, elevation: 2, flexDirection: 'row', justifyContent: 'center', gap: 8 },
    primaryBtnText: { color: "white", fontSize: 15, fontWeight: "bold" },
    operatorRow: { flexDirection: "row", justifyContent: "space-between" },
    opBadge: { backgroundColor: "#e1d3ed", paddingVertical: 10, paddingHorizontal: 14, borderRadius: 12 },
    activeOpBadge: { backgroundColor: "#5C246E" },
    opText: { color: "#5C246E", fontWeight: "bold" },
    activeOpText: { color: "white" },
    infoBanner: { flexDirection: "row", alignItems: "center", backgroundColor: "#4A154B", marginHorizontal: 16, marginTop: 14, padding: 14, borderRadius: 12, gap: 10 },
    infoText: { color: "white", flex: 1, fontSize: 12 },
    gridRow: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
    billCategoryItem: { width: "30%", backgroundColor: "#e1d3ed", paddingVertical: 16, borderRadius: 14, alignItems: "center", gap: 6 },
    categoryText: { fontSize: 12, fontWeight: "600", color: "#2C0938" },
    debitCardContainer: { backgroundColor: "#5C246E", margin: 16, borderRadius: 16, padding: 20, elevation: 4 },
    debitCardBank: { color: "white", fontSize: 16, fontWeight: "bold" },
    debitCardType: { color: "#D4AF37", fontSize: 12, fontWeight: "bold" },
    debitCardNumber: { color: "white", fontSize: 20, fontWeight: "bold", letterSpacing: 3, marginTop: 20 },
    debitCardSmall: { color: "#E1D3ED", fontSize: 10 },
    debitCardName: { color: "white", fontSize: 14, fontWeight: "bold" },
    toggleRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 8 },
    toggleTitle: { fontSize: 14, fontWeight: "bold", color: "#2C0938" },
    toggleSub: { fontSize: 12, color: "#666", marginTop: 2 },
    divider: { height: 1, backgroundColor: "#EEE", marginVertical: 10 },
    qrScannerFrame: { backgroundColor: "white", margin: 16, borderRadius: 20, padding: 30, alignItems: "center", gap: 16, elevation: 2 },
    qrTitle: { fontSize: 18, fontWeight: "bold", color: "#2C0938" },
    qrText: { fontSize: 13, color: "#666", textAlign: "center", lineHeight: 20 },
    ratingRow: { flexDirection: "row", justifyContent: "center", gap: 12, marginBottom: 16 },
    summaryCard: { backgroundColor: "#caace3", margin: 16, borderRadius: 16, padding: 18, elevation: 2 },
    summaryLabel: { fontSize: 12, color: "#4A154B", fontWeight: "600" },
    summaryValue: { fontSize: 24, fontWeight: "bold", color: "#2C0938", marginTop: 4 },
    profitBadge: { backgroundColor: "#5C246E", alignSelf: "flex-start", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, marginTop: 10 },
    profitText: { color: "white", fontWeight: "bold", fontSize: 12 },
    sectionContainer: { marginHorizontal: 16 },
    fundCard: { backgroundColor: "white", borderRadius: 16, padding: 16, marginBottom: 12, elevation: 2 },
    fundIcon: { backgroundColor: "#e1d3ed", padding: 10, borderRadius: 12 },
    fundName: { fontSize: 14, fontWeight: "bold", color: "#2C0938" },
    fundRisk: { fontSize: 12, color: "#888", marginTop: 2 },
    returnRow: { flexDirection: "row", justifyContent: "space-between", marginVertical: 10, paddingHorizontal: 4 },
    returnLabel: { fontSize: 13, color: "#666" },
    returnValue: { fontSize: 13, fontWeight: "bold", color: "#16A34A" },
    investBtn: { backgroundColor: "#5C246E", borderRadius: 10, paddingVertical: 10, alignItems: "center" },
    investBtnText: { color: "white", fontSize: 13, fontWeight: "bold" },
    card: { backgroundColor: "white", margin: 16, borderRadius: 16, padding: 18, elevation: 2 },
    cardTitle: { fontSize: 15, fontWeight: "bold", color: "#2C0938", marginBottom: 14 },
    yearRow: { flexDirection: "row", gap: 10 },
    yearBadge: { backgroundColor: "#e1d3ed", paddingVertical: 8, paddingHorizontal: 14, borderRadius: 10 },
    activeYearBadge: { backgroundColor: "#5C246E" },
    yearText: { color: "#5C246E", fontWeight: "600", fontSize: 13 },
    activeYearText: { color: "white" },
    certItem: { flexDirection: "row", alignItems: "center", paddingVertical: 10 },
    certName: { fontSize: 14, fontWeight: "bold", color: "#2C0938" },
    certDesc: { fontSize: 12, color: "#777", marginTop: 2 },
    charityItem: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
    activeCharityItem: { backgroundColor: '#F8F5FB' },
    charityName: { fontSize: 14, color: '#333' },
    activeCharityName: { fontWeight: 'bold', color: '#5C246E' }
});
