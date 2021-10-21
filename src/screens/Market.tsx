import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { DataTable } from 'react-native-paper';
import { TableTitle } from "../components/molecules";

const optionsPerPage = [2, 3, 4];

const Market = () => {
  const [page, setPage] = React.useState<number>(0);
  const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  return (
    <SafeAreaView>
      <TableTitle>Open Market</TableTitle>
      <DataTable >
        <DataTable.Header>
          <DataTable.Title>Creator</DataTable.Title>
          <DataTable.Title>Owner</DataTable.Title>
          <DataTable.Title>NFT</DataTable.Title>
          <DataTable.Title>Mint Date</DataTable.Title>
          <DataTable.Title>Vint. Date</DataTable.Title>
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
          onPageChange={(page) => setPage(page)}
          // label="1-2 of 6"
          // @ts-ignore
          optionsPerPage={optionsPerPage}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          showFastPagination
          optionsLabel={'Rows per page'}
        />
      </DataTable>
      <TableTitle>Latest Mints</TableTitle>
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
          onPageChange={(page) => setPage(page)}
          // label="1-2 of 6"
          // @ts-ignore
          optionsPerPage={optionsPerPage}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          showFastPagination
          optionsLabel={'Rows per page'}
        />
      </DataTable>
      </SafeAreaView>
      
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default Market;
