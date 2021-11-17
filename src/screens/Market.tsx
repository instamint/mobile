import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, ScrollView, Alert, View, RefreshControl} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import {getMarkets} from '../api/instamint/NFT';
import {MarketTable, Market} from '../types';
import Table from '../components/molecules/Table';
import { showErrorAlert } from '../helpers/errorHelper';
import Loader from "../components/atoms/Loader";
import { NFT } from "../navigations/screens";

//Table header
// const header = ['Creator', 'Owner', 'NFT', 'Mint Date', 'Vint. Date'];

type Props = {
  navigation: NavigationProp<any, string, any, any>;
};

const header = [
  {title: 'Creator', field: 'creator'},
  {title: 'Owner', field: 'owner'},
  {title: 'NFT', field: 'name'},
  {title: 'Mint Date', field: 'mintDate'},
  {title: 'Vint. Date', field: 'vintageDate'},
];

const MarketScreen:React.FC<Props> = (props) => {
  const { navigation } = props

  const [markets, setMarkets] = useState<Market[]>([]);
  const [latest, setLatest] = useState<Market[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true)

    try {
      const response = await getMarkets();
      setMarkets(response.data);

      const sort = (a: Market, b: Market) => {
        if (a.mintDate < b.mintDate) return -1;
        if (a.mintDate > b.mintDate) return 1;
        return 0;
      };

      const sortedData = response.data.sort(sort);
      setLatest(sortedData);
    } catch (error) {
      showErrorAlert('Market', error);
    }
    
    setLoading(false)
  };

  const onPressMarketItem = (index: number) => {
    navigation.navigate(NFT, {item: markets[index]})
  };

  const onPressLatestItem = (index: number) => {
    navigation.navigate(NFT, {item: latest[index]})
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      
        {loading ? (
          <View style={styles.container}>
            <Loader/>
          </View>
        ) : (
          <ScrollView refreshControl={
            <RefreshControl refreshing={loading}
              onRefresh={loadData}
            />
          }>
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
