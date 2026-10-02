import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import { useNavigation } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons/faBars";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons/faRightFromBracket";
import AgentTarget from "../../components/AgentTarget";

export default function DashboardScreen() {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const handleLogout = () => {
        dispatch(logout());
        navigation.navigate("Login");
    };

    return (
        <ScrollView
            style={{ flex: 1, backgroundColor: 'white' }}
            contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
            showsVerticalScrollIndicator={false}
        >
            {/* Header */}
            <View style={styles.header}>
                <FontAwesomeIcon icon={faBars} color="white" size={20} />
                <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                    <Image
                        source={require('../../assets/meezan_logo.png')}
                        style={styles.logo}
                    />
                    <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>Meezan Bank</Text>
                </View>
                <TouchableOpacity onPress={handleLogout}>
                    <FontAwesomeIcon icon={faRightFromBracket} color="white" size={20} />
                </TouchableOpacity>
            </View>

            {/* Content Container */}
            <View style={{
                paddingVertical: 20,
                justifyContent: "center",
                flexDirection: "row",
                backgroundColor: 'white',
                flexWrap: "wrap",
                gap: 16
            }}>

                {/* Account Card */}
                <AgentTarget id="home-balance-amount" aliases={["balance-card", "check_balance"]} style={{ width: "90%" }}>
                    <View style={{ width: "100%", minHeight: 160, gap: 10, backgroundColor: "#caace3", borderRadius: 20, padding: 20 }}>
                        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Ahmed Musab</Text>
                        <Text>Current Account: 9913 1234567890</Text>
                        <Text>Branch: JAMA MILLIA MALIR-KHI</Text>
                        <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderRadius: 10, backgroundColor: "#d9d9da", paddingHorizontal: 12, paddingVertical: 10 }}>
                            <Text style={{ fontWeight: "bold" }}>PKR 125,000</Text>
                            <TouchableOpacity><Text>HIDE</Text></TouchableOpacity>
                        </View>
                    </View>
                </AgentTarget>

                {/* Action Buttons */}
                <AgentTarget id="home-quick-action-send" aliases={["send_money", "SendMoney", "nav-sendmoney"]}>
                    <TouchableOpacity style={styles.gridItem} activeOpacity={0.8} onPress={() => navigation.navigate("SendMoney")}>
                        <View style={styles.gridItemInner}>
                            <Image source={require('../../assets/sendMoney.png')} style={{ width: 45, height: 45 }} resizeMode="contain" />
                            <Text style={styles.gridItemText}>Send Money</Text>
                        </View>
                    </TouchableOpacity>
                </AgentTarget>

                <AgentTarget id="mobile-topup" aliases={["mobile_topup", "MobileTopup"]}>
                    <TouchableOpacity style={styles.gridItem} activeOpacity={0.8} onPress={() => navigation.navigate("MobileTopup")}>
                        <View style={styles.gridItemInner}>
                            <Image source={require('../../assets/mobileTopup.png')} style={{ width: 45, height: 45 }} resizeMode="contain" />
                            <Text style={styles.gridItemText}>Mobile Topup</Text>
                        </View>
                    </TouchableOpacity>
                </AgentTarget>

                <AgentTarget id="raast-payment" aliases={["raast", "Raast"]}>
                    <TouchableOpacity style={styles.gridItem} activeOpacity={0.8} onPress={() => navigation.navigate("Raast")}>
                        <View style={styles.gridItemInner}>
                            <Image source={require('../../assets/raast.png')} style={{ width: 45, height: 45 }} resizeMode="contain" />
                            <Text style={styles.gridItemText}>Raast Payment</Text>
                        </View>
                    </TouchableOpacity>
                </AgentTarget>

                <AgentTarget id="home-quick-action-paybill" aliases={["pay_bill", "BillPayments", "side-nav-bills"]}>
                    <TouchableOpacity style={styles.gridItem} activeOpacity={0.8} onPress={() => navigation.navigate("BillPayments")}>
                        <View style={styles.gridItemInner}>
                            <Image source={require('../../assets/billPayments.png')} style={{ width: 45, height: 45 }} resizeMode="contain" />
                            <Text style={styles.gridItemText}>Bill Payments</Text>
                        </View>
                    </TouchableOpacity>
                </AgentTarget>

                <AgentTarget id="cards-open-card-debit-visa" aliases={["manage_card", "view_cards", "CardManagement", "nav-cards"]}>
                    <TouchableOpacity style={styles.gridItem} activeOpacity={0.8} onPress={() => navigation.navigate("CardManagement")}>
                        <View style={styles.gridItemInner}>
                            <Image source={require('../../assets/cardManagement.png')} style={{ width: 45, height: 45 }} resizeMode="contain" />
                            <Text style={styles.gridItemText}>Card Management</Text>
                        </View>
                    </TouchableOpacity>
                </AgentTarget>

                <AgentTarget id="home-quick-action-qr" aliases={["qr_pay", "QR", "nav-qrpay"]}>
                    <TouchableOpacity style={styles.gridItem} activeOpacity={0.8} onPress={() => navigation.navigate("QR")}>
                        <View style={styles.gridItemInner}>
                            <Image source={require('../../assets/qr.jpg')} style={{ width: 45, height: 45 }} resizeMode="contain" />
                            <Text style={styles.gridItemText}>QR Payments</Text>
                        </View>
                    </TouchableOpacity>
                </AgentTarget>

                <TouchableOpacity style={styles.gridItem} activeOpacity={0.8} onPress={() => navigation.navigate("Zakaat")}>
                    <View style={styles.gridItemInner}>
                        <Image source={require('../../assets/zakaat.png')} style={{ width: 45, height: 45 }} resizeMode="contain" />
                        <Text style={styles.gridItemText}>Zakat/Fitra & Sadqaat</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.gridItem} activeOpacity={0.8} onPress={() => navigation.navigate("MutualFunds")}>
                    <View style={styles.gridItemInner}>
                        <Image source={require('../../assets/mutualFunds.png')} style={{ width: 45, height: 45 }} resizeMode="contain" />
                        <Text style={styles.gridItemText}>Al Meezan Mutual Funds</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.gridItem} activeOpacity={0.8} onPress={() => navigation.navigate("Payoneer")}>
                    <View style={styles.gridItemInner}>
                        <Image source={require('../../assets/payoneer.webp')} style={{ width: 45, height: 45 }} resizeMode="contain" />
                        <Text style={styles.gridItemText}>Payoneer</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.gridItem} activeOpacity={0.8} onPress={() => navigation.navigate("Tax")}>
                    <View style={styles.gridItemInner}>
                        <Image source={require('../../assets/tax.png')} style={{ width: 45, height: 45 }} resizeMode="contain" />
                        <Text style={styles.gridItemText}>Tax & Other Certificates</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.gridItem} activeOpacity={0.8} onPress={() => navigation.navigate("LimitManagement")}>
                    <View style={styles.gridItemInner}>
                        <Image source={require('../../assets/limitManagement.png')} style={{ width: 45, height: 45 }} resizeMode="contain" />
                        <Text style={styles.gridItemText}>Limit Management</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.gridItem} activeOpacity={0.8} onPress={() => navigation.navigate("FeedbackManagement")}>
                    <View style={styles.gridItemInner}>
                        <Image source={require('../../assets/feedback.png')} style={{ width: 45, height: 45 }} resizeMode="contain" />
                        <Text style={styles.gridItemText}>Feedback Management</Text>
                    </View>
                </TouchableOpacity>

            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    header: {
        height: 100,
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: 20,
        paddingHorizontal: 20,
        backgroundColor: "#7000c5",
        flexDirection: "row",
    },
    logo: {
        height: 50,
        width: 50,
        resizeMode: "contain",
    },
    gridItem: {
        width: "42%",
        height: 110,
        backgroundColor: "#e1d3ed",
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
    },
    gridItemInner: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 6,
    },
    gridItemText: {
        fontSize: 12,
        textAlign: "center",
        color: "#333",
        fontWeight: "500",
    }
});
