import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import { DataTable } from 'react-native-paper';
import { TableTitle } from "../components/molecules";
import { getMarkets } from "../api/instamint/NFT";

const optionsPerPage = [2, 3, 4];
const numberOfItemsPerPageList = [2, 3, 4];

const MarketScreen = () => {
  const [page, setPage] = React.useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(optionsPerPage[0]);
  const [markets, setMarkets] = useState([]);
  const [numberOfItemsPerPage, onItemsPerPageChange] = React.useState(numberOfItemsPerPageList[0]);

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  useEffect(()=>{
    loadData()
  }, [])

  const loadData = async ()=>{
    const response = await getMarkets()
    const data = response.data

    console.log(data)
    setMarkets(data)    
  }

  return (
    <SafeAreaView>
      <TableTitle>Open Market</TableTitle>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Creator</DataTable.Title>
          <DataTable.Title>Owner</DataTable.Title>
          <DataTable.Title>NFT</DataTable.Title>
          <DataTable.Title>Mint Date</DataTable.Title>
          <DataTable.Title>Vint. Date</DataTable.Title>
        </DataTable.Header>

        {/* {markets.map((item, index) => (
          <DataTable.Row key={index.toString()}>
            <DataTable.Cell>{item.creator}</DataTable.Cell>
            <DataTable.Cell>{item.owner}</DataTable.Cell>
            <DataTable.Cell>{item.name}</DataTable.Cell>
            <DataTable.Cell>{item.mintDate}</DataTable.Cell>
            <DataTable.Cell>{item.vintageDate}</DataTable.Cell>
          </DataTable.Row>
        ))} */}
        <DataTable.Row>
          <DataTable.Cell>John</DataTable.Cell>
          <DataTable.Cell>John</DataTable.Cell>
          <DataTable.Cell>NFT-1</DataTable.Cell>
          <DataTable.Cell>2020-12-31</DataTable.Cell>
          <DataTable.Cell>2020-12-31</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>John</DataTable.Cell>
          <DataTable.Cell>John</DataTable.Cell>
          <DataTable.Cell>NFT-1</DataTable.Cell>
          <DataTable.Cell>2020-12-31</DataTable.Cell>
          <DataTable.Cell>2020-12-31</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>John</DataTable.Cell>
          <DataTable.Cell>John</DataTable.Cell>
          <DataTable.Cell>NFT-1</DataTable.Cell>
          <DataTable.Cell>2020-12-31</DataTable.Cell>
          <DataTable.Cell>2020-12-31</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>John</DataTable.Cell>
          <DataTable.Cell>John</DataTable.Cell>
          <DataTable.Cell>NFT-1</DataTable.Cell>
          <DataTable.Cell>2020-12-31</DataTable.Cell>
          <DataTable.Cell>2020-12-31</DataTable.Cell>
        </DataTable.Row>


        <DataTable.Pagination
          page={page}
          numberOfPages={2}
          label="1-2 of 6"
          showFastPaginationControls
          numberOfItemsPerPageList={optionsPerPage}          
          numberOfItemsPerPage={numberOfItemsPerPage}
          onItemsPerPageChange={onItemsPerPageChange}
          setItemsPerPage={setItemsPerPage}
          selectPageDropdownLabel={'Rows per page'}
        />
      </DataTable>
      {/* <TableTitle>Latest Mints</TableTitle>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Creator</DataTable.Title>
          <DataTable.Title>Owner</DataTable.Title>
          <DataTable.Title>NFT</DataTable.Title>
          <DataTable.Title>Mint Date</DataTable.Title>
          <DataTable.Title>Vintage Date</DataTable.Title>
        </DataTable.Header>

        <DataTable.Row>
          <DataTable.Cell>John</DataTable.Cell>
          <DataTable.Cell>John</DataTable.Cell>
          <DataTable.Cell>NFT-1</DataTable.Cell>
          <DataTable.Cell>2020-12-31</DataTable.Cell>
          <DataTable.Cell>2020-12-31</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Pagination
          page={page}
          numberOfPages={3}
          onPageChange={page => setPage(page)}
          label="1-2 of 6"
          // @ts-ignore
          optionsPerPage={optionsPerPage}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          showFastPagination
          optionsLabel={'Rows per page'}
        />
      </DataTable> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default MarketScreen;
