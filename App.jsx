import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { navigationRef } from './src/navigation/navigationRef';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStaticNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { setUser } from './src/store/authSlice';
import SplashScreen from './src/screens/SplashScreen';
import LoginScreen from './src/screens/auth/LoginScreen';
import RegisterScreen from './src/screens/auth/RegisterScreen';
import DashboardScreen from './src/screens/dashboard/DashboardScreen';

// Feature Screens
import SendMoneyScreen from './src/screens/features/SendMoneyScreen';
import MobileTopupScreen from './src/screens/features/MobileTopupScreen';
import RaastScreen from './src/screens/features/RaastScreen';
import BillPaymentsScreen from './src/screens/features/BillPaymentsScreen';
import CardManagementScreen from './src/screens/features/CardManagementScreen';
import QRScreen from './src/screens/features/QRScreen';
import ZakaatScreen from './src/screens/features/ZakaatScreen';
import MutualFundsScreen from './src/screens/features/MutualFundsScreen';
import PayoneerScreen from './src/screens/features/PayoneerScreen';
import TaxScreen from './src/screens/features/TaxScreen';
import LimitManagementScreen from './src/screens/features/LimitManagementScreen';
import FeedbackManagementScreen from './src/screens/features/FeedbackManagementScreen';

import { Provider } from 'react-redux';
import { store } from './src/store';

const queryClient = new QueryClient();

const RootStack = createNativeStackNavigator({
  initialRouteName: 'Splash',
  screens: {
    Splash: SplashScreen,
    Login: LoginScreen,
    Register: RegisterScreen,
    Dashboard: DashboardScreen,
    SendMoney: SendMoneyScreen,
    MobileTopup: MobileTopupScreen,
    Raast: RaastScreen,
    BillPayments: BillPaymentsScreen,
    CardManagement: CardManagementScreen,
    QR: QRScreen,
    Zakaat: ZakaatScreen,
    MutualFunds: MutualFundsScreen,
    Payoneer: PayoneerScreen,
    Tax: TaxScreen,
    LimitManagement: LimitManagementScreen,
    FeedbackManagement: FeedbackManagementScreen,
  },
  screenOptions: {
    headerShown: false,
  },
});

const Navigation = createStaticNavigation(RootStack);

function AppContent() {
  const dispatch = useDispatch();

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const userStr = await AsyncStorage.getItem("user");

        if (userStr) {
          dispatch(setUser(JSON.parse(userStr)));

          let attempts = 0;
          const checkNavigationReady = setInterval(() => {
            if (navigationRef.current?.isReady()) {
              clearInterval(checkNavigationReady);
              navigationRef.current?.reset({
                index: 0,
                routes: [{ name: 'Dashboard' }],
              });
            } else {
              attempts++;
              if (attempts > 50) {
                clearInterval(checkNavigationReady);
              }
            }
          }, 50);
        }
      } catch (error) {
        console.log("Error restoring session:", error);
      }
    };
    restoreSession();
  }, [dispatch]);

  return <Navigation ref={navigationRef} />;
}

export default function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <AppContent />
        </QueryClientProvider>
      </Provider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
