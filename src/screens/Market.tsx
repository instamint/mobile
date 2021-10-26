import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import { DataTable } from 'react-native-paper';
import { TableTitle } from "../components/molecules";
import { getMarkets } from "../api/instamint/NFT";
import { Market } from '../types';

const optionsPerPage = [2, 3, 4];

const MarketScreen = () => {
  const [page, setPage] = React.useState<number>(0);
  const [itemsPerPage, setItemsPerPage] = useState(optionsPerPage[0]);
  const [markets, setMarkets] = useState<Market[]>([]);
  const [latest, setLatest] = useState<Market[]>([]);

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  useEffect(()=>{
    loadData()
  }, [])

  const loadData = async ()=>{
    const response = await getMarkets()
    const data = response.data
    setMarkets(data)
    
    const sort = (a: Market, b: Market)=>{
      if (a.mintDate < b.mintDate ) return -1;
      if (a.mintDate  > b.mintDate ) return 1;
      return 0;
   }
    const sortedData = data.sort(sort)
    setLatest(sortedData)
    
  }

  const Table: React.FC<{title: string, data: Market[]}> = (props) => (
    <>
      <TableTitle>{props.title}</TableTitle>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Creator</DataTable.Title>
          <DataTable.Title>Owner</DataTable.Title>
          <DataTable.Title>NFT</DataTable.Title>
          <DataTable.Title>Mint Date</DataTable.Title>
          <DataTable.Title>Vint. Date</DataTable.Title>
        </DataTable.Header>

        {props.data.map((item, index) => (
          <DataTable.Row key={index.toString()}>
            <DataTable.Cell>{item.creator}</DataTable.Cell>
            <DataTable.Cell>{item.owner}</DataTable.Cell>
            <DataTable.Cell>{item.name}</DataTable.Cell>
            <DataTable.Cell>{item.mintDate}</DataTable.Cell>
            <DataTable.Cell>{item.vintageDate}</DataTable.Cell>
          </DataTable.Row>
        ))}

        <DataTable.Pagination
          page={page}
          numberOfPages={2}
          // label="1-2 of 6"
          showFastPaginationControls
          onPageChange={()=>{}}
          // numberOfItemsPerPageList={optionsPerPage}          
          // numberOfItemsPerPage={numberOfItemsPerPage}
          // onItemsPerPageChange={onItemsPerPageChange}
          // setItemsPerPage={setItemsPerPage}
          // selectPageDropdownLabel={'Rows per page'}
        />
      </DataTable>
    </>
  );

  return (
    <SafeAreaView>
      <ScrollView>
        <Table title={"Open Market"} data={markets} />
        <Table title={"Latest Mints"} data={latest} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default MarketScreen;
