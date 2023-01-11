import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {EmptyOrder, Header, VendorOrdersTabSection} from '../../components';

const VendorOrders = () => {
  const [isEmpty] = useState(false);
  return (
    <View style={styles.page}>
      {isEmpty ? (
        <EmptyOrder />
      ) : (
        <View style={styles.content}>
          <Header title="Vendor Orders" subTitle="Customer orders and details" />
          <View style={styles.tabContainer}>
            <VendorOrdersTabSection />
          </View>
        </View>
      )}
    </View>
  );
};

export default VendorOrders;

const styles = StyleSheet.create({
  page: {flex: 1},
  content: {flex: 1},
  tabContainer: {flex: 1, marginTop: 24},
});
