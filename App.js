import React, { useRef, useMemo, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, Text, View, SafeAreaView } from "react-native";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";

import ListItem from "./components/ListItem";
import Chart from "./components/Chart";
import { SAMPLE_DATA } from "./assets/data/sampleData";

const ListHeader = () => {
  return (
    <>
      <View style={styles.titleWrapper}>
        <Text style={styles.largeTitle}>Markets</Text>
      </View>
      <View style={styles.divider} />
    </>
  );
};

export default function App() {
  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ["50%"], []);
  const [selectedCoinData, setSelectedCoinData] = useState(null);

  const openModal = (item) => {
    setSelectedCoinData(item);
    bottomSheetModalRef.current.present();
  };
  return (
    <BottomSheetModalProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />

        <FlatList
          keyExtractor={(item) => item.id}
          data={SAMPLE_DATA}
          renderItem={({ item }) => (
            <ListItem
              name={item.name}
              symbol={item.symbol}
              currentPrice={item.current_price}
              priceChangePercentage7d={
                item.price_change_percentage_7d_in_currency
              }
              logoUrl={item.image}
              onPress={() => openModal(item)}
            />
          )}
          ListHeaderComponent={<ListHeader />}
        />
      </SafeAreaView>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        style={styles.bottomSheet}
      >
        <View style={styles.contentContainer}>
          {selectedCoinData ? (
            <Chart
              name={selectedCoinData.name}
              currentPrice={selectedCoinData.current_price}
              priceChangePercentage7d={
                selectedCoinData.price_change_percentage_7d_in_currency
              }
              logoUrl={selectedCoinData.image}
              symbol={selectedCoinData.symbol}
              sparkline={selectedCoinData.sparkline_in_7d.price}
            />
          ) : null}
        </View>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  largeTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  titleWrapper: {
    marginTop: 40,
    paddingHorizontal: 16,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#a9abb1",
    marginHorizontal: 16,
    marginTop: 16,
  },
  bottomSheet: {
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
