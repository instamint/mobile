import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {Market} from '../types';
import {Text} from 'react-native-paper';
import Table, {Header} from '../components/molecules/Table';
import {BASE_URL} from '../configuration';
import {getBidAskHistory, getTrades} from '../api/instamint/NFT';
import {NFTBidHistory} from '../types/NFTBidHistory';
import {NFTTrades} from '../types/NFTTrades';
import {showErrorAlert} from '../helpers/errorHelper';
import NFTInfo from '../components/organisms/NFTInfo';
import Divider from '../components/atoms/Divider';

type Props = {
  route: RouteProp<
    {
      params: {
        item: Market;
      };
    },
    'params'
  >;
  navigation: NavigationProp<any, string, any, any>;
};

type Tabs = 'History' | 'Trades';

const historyHeader: Header[] = [
  {title: 'Bid', field: 'bid'},
  {title: 'Ask', field: 'ask'},
  {title: 'Date/Time', field: 'created', type: 'date'},
];

const tradesHeader: Header[] = [
  {title: 'Buyer', field: 'buyerFullName'},
  {title: 'Seller', field: 'sellerFullName'},
  {title: 'Amount', field: 'transactionAmount'},
  {title: 'Fee', field: 'platformFee'},
  {title: 'Net Seller', field: 'netToSeller'},
];

const Mint: React.FC<Props> = props => {
  const {route} = props;
  const item = route.params.item;
  const NFTInfoData = {
    title: item.title,
    description: item.description,
    imageUrl: `${BASE_URL}/${item.imageWebURL}`,
    mintDate: item.mintDate,
    vintageDate: item.vintageDate,
  };
  const [selectedTabItem, setSelectedTabItem] = useState<Tabs>('History');
  const [bidHistory, setBidHistory] = useState<NFTBidHistory[]>([]);
  const [trades, setTrades] = useState<NFTTrades[]>([]);

  useEffect(() => {
    loadData();
  }, [item]);

  const loadData = async () => {
    try {
      const historyResponse = await getBidAskHistory(item.nftId);
      setBidHistory(historyResponse.data);

      const tradesResponse = await getTrades(item.nftId);
      setTrades(tradesResponse.data);
    } catch (error) {
      showErrorAlert(error);
    }
  };

  const onBidPress = ()=>{
      //TODO:
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <NFTInfo data={NFTInfoData} onPress={onBidPress} />
        <Divider />
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={tabStyles(selectedTabItem === 'History').item}
            onPress={() => setSelectedTabItem('History')}>
            <Text style={tabStyles(selectedTabItem === 'History').text}>
              Bid/Ask History
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tabStyles(selectedTabItem === 'Trades').item}
            onPress={() => setSelectedTabItem('Trades')}>
            <Text style={tabStyles(selectedTabItem === 'Trades').text}>
              Trades
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{marginBottom: 20}}>
          {selectedTabItem === 'History' ? (
            <Table header={historyHeader} data={bidHistory} />
          ) : (
            <Table header={tradesHeader} data={trades} />
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 15,
    backgroundColor: 'white',
  },

  bottonContainer: {
    width: '100%',
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginTop: 30,
    justifyContent: 'flex-end',
  },
});

const tabStyles = (pressed: boolean) =>
  StyleSheet.create({
    item: {
      flex: 1,
      paddingVertical: 5,
      paddingHorizontal: 8,
      borderBottomWidth: 1.5,
      borderColor: pressed ? '#5829e4' : '#808080',
      marginHorizontal: 5,
    },

    text: {
      fontSize: 16,
      fontWeight: 'bold',
      color: pressed ? '#5829e4' : '#808080',
      textAlign: 'center',
    },
  });

export default Mint;
