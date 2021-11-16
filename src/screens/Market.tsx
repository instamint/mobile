import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, ScrollView, Alert, View} from 'react-native';
import {getMarkets} from '../api/instamint/NFT';
import {MarketTable} from '../types';
import Table from '../components/molecules/Table';
import { showErrorAlert } from '../helpers/errorHelper';
import Loader from "../components/atoms/Loader";

//Table header
const header = ['Creator', 'Owner', 'NFT', 'Mint Date', 'Vint. Date'];

const MarketScreen = () => {
  const [markets, setMarkets] = useState<MarketTable[]>([]);
  const [latest, setLatest] = useState<MarketTable[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true)

    try {
      const response = await getMarkets();
      const data = response.data.map(x => ({
        creator: x.creator,
        owner: x.owner,
        nft: x.name,
        mintDate: x.mintDate,
        vintageDate: x.vintageDate,
      }));

      setMarkets(data);

      const sort = (a: MarketTable, b: MarketTable) => {
        if (a.mintDate < b.mintDate) return -1;
        if (a.mintDate > b.mintDate) return 1;
        return 0;
      };
      const sortedData = data.sort(sort);
      setLatest(sortedData);
    } catch (error) {
      showErrorAlert('Market', error);
    }
    
    setLoading(false)
  };

  const onPressMarketItem = (index: number) => {
    Alert.alert('INDEX ' + index);
  };

  const onPressLatestItem = (index: number) => {
    Alert.alert('INDEX ' + index);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      
        {loading ? (
          <View style={styles.container}>
            <Loader/>
          </View>
        ) : (
          <ScrollView onMomentumScrollEnd={loadData}>
            <Table
              header={header}
              data={markets}
              title={'Open Market'}
              onPressItem={onPressMarketItem}
            />
            <Table
              header={header}
              data={latest}
              title={'Latest Mints'}
              onPressItem={onPressLatestItem}
            />
          </ScrollView>
        )}
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

export default MarketScreen;
