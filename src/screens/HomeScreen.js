// src/screens/HomeScreen.js
import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useTodaySales, useRecentInvoices } from '../hooks/useInvoices';
import PrimaryButton from '../components/PrimaryButton';
import Card from '../components/Card';
import colors from '../theme/colors';
import { trySyncInvoices } from '../services/syncService';

export default function HomeScreen() {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const todaySales = useTodaySales();
  const recentInvoices = useRecentInvoices(10);

  React.useEffect(() => {
    // Try to sync invoices when screen loads
    trySyncInvoices();
  }, []);

  const handleOpenCamera = () => {
    navigation.navigate('Camera');
  };

  const handleInvoicePress = (invoice) => {
    navigation.navigate('InvoicePreview', { invoiceId: invoice.id });
  };

  const renderInvoiceItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleInvoicePress(item)}
      activeOpacity={0.7}
    >
      <Card style={styles.invoiceCard}>
        <View style={styles.invoiceHeader}>
          <Text style={styles.customerName}>
            {item.customer_name || t('walk_in_customer')}
          </Text>
          <Text style={styles.invoiceAmount}>
            ₹{item.total.toFixed(2)}
          </Text>
        </View>
        <Text style={styles.invoiceDate}>
          {new Date(item.created_at).toLocaleDateString('en-IN')}
        </Text>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Today's Sales Counter */}
      <Card style={styles.salesCard}>
        <Text style={styles.salesLabel}>{t('today_sales')}</Text>
        <Text style={styles.salesAmount}>₹{todaySales.toFixed(2)}</Text>
      </Card>

      {/* Quick Camera Button */}
      <PrimaryButton
        title={t('open_camera')}
        onPress={handleOpenCamera}
        style={styles.cameraButton}
      />

      {/* Recent Invoices */}
      <View style={styles.recentSection}>
        <Text style={styles.sectionTitle}>{t('recent_invoices')}</Text>
        <FlatList
          data={recentInvoices}
          renderItem={renderInvoiceItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              {t('no_invoices_yet')}
            </Text>
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
  },
  salesCard: {
    alignItems: 'center',
    paddingVertical: 24,
    marginBottom: 16,
  },
  salesLabel: {
    fontSize: 16,
    color: colors.textMuted,
    marginBottom: 8,
  },
  salesAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.primary,
  },
  cameraButton: {
    marginBottom: 24,
  },
  recentSection: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  listContent: {
    flexGrow: 1,
  },
  invoiceCard: {
    marginBottom: 12,
  },
  invoiceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  customerName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
  },
  invoiceAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
  },
  invoiceDate: {
    fontSize: 14,
    color: colors.textMuted,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: colors.textMuted,
    marginTop: 48,
  },
});
