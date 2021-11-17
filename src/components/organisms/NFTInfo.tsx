import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {Button, Text} from 'react-native-paper';
import Title from '../atoms/Title';
import {BASE_URL} from '../../configuration';

type Data = {
  title: string;
  description: string;
  mintDate: string;
  vintageDate: string;
  imageUrl: string;
};

type Props = {
  data: Data;
  onPress?: any;
};

const NFTInfo: React.FC<Props> = props => {
  const {onPress, data} = props;
  return (
    <>
      <View style={styles.container}>
        <View>
          <Image
            style={{width: 120, height: 120}}
            source={{
              uri: data.imageUrl,
            }}
          />
        </View>
        <View style={styles.headerContainer}>
          <Title>{data.title}</Title>
          <Text style={styles.description} numberOfLines={3}>
            {data.description}
          </Text>
          <View style={styles.dateContainer}>
            <View style={[styles.dateBox, styles.separator]}>
              <Text style={styles.dateText}>
                {data.mintDate ? data.mintDate : 'No date found'}
              </Text>
              <Text style={styles.dateLabel}>Mint. Date</Text>
            </View>
            <View style={styles.dateBox}>
              <Text style={styles.dateText}>
                {data.vintageDate ? data.vintageDate : 'No date found'}
              </Text>
              <Text style={styles.dateLabel}>Vint. Date</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button mode={'contained'} onPress={onPress}>
          Set Bid
        </Button>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {flexDirection: 'row'},
  headerContainer: {flex: 1},
  description: {color: '#231F20', fontStyle: 'italic'},
  dateContainer: {flexDirection: 'row', flex: 1},
  dateBox: {
    alignSelf: 'flex-end',
    padding: 6,
  },
  separator: {
    borderRightWidth: 0.5,
    borderColor: '#231F20',
  },
  dateText: {color: '#231F20', fontWeight: 'bold'},
  dateLabel: {color: '#231F20'},
  buttonContainer: {marginVertical: 10},
});

export default NFTInfo;
