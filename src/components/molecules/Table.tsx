import React, {useEffect, useState} from 'react';
import {DataTable} from 'react-native-paper';
import TableTitle from './TableTitle';

type Props = {
  header: string[];
  data: any[];
  title? : string,
  // onItemPress?: any
  onPressItem?: (index: number)=>void
};

const numberOfItemsPerPageList = [4, 8, 12];

const Table: React.FC<Props> = props => {
  const {header, data, title, onPressItem} = props;

  const [page, setPage] = React.useState(0);
  const [numberOfItemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0],
  );
  const from = page * numberOfItemsPerPage;
  const to = Math.min((page + 1) * numberOfItemsPerPage, data.length);

  useEffect(() => {
    setPage(0);
  }, [numberOfItemsPerPage]);

  return (
    <>
      {title !== undefined &&
        <TableTitle>
          {title}
        </TableTitle>
      }
      <DataTable>
        <DataTable.Header>
          {header.map((item, index) => (
            <DataTable.Title key={index.toString()}>{item}</DataTable.Title>
          ))}
        </DataTable.Header>

        {data
          .slice(numberOfItemsPerPage * page, numberOfItemsPerPage * (page + 1))
          .map((item, index) => (
            <DataTable.Row key={index.toString()} onPress={()=>onPressItem ? onPressItem(index) : null}>
              {Object.keys(item).map((key, keyIndex) => (
                <DataTable.Cell key={`${index}-${keyIndex}`}>
                  {item[key]}
                </DataTable.Cell>
              ))}
            </DataTable.Row>
          ))}

        <DataTable.Pagination
          page={page}
          numberOfPages={Math.ceil(props.data.length / numberOfItemsPerPage)}
          onPageChange={page => setPage(page)}
          label={`${from + 1}-${to} of ${data.length}`}
          showFastPaginationControls
          numberOfItemsPerPageList={numberOfItemsPerPageList}
          numberOfItemsPerPage={numberOfItemsPerPage}
          onItemsPerPageChange={onItemsPerPageChange}
          selectPageDropdownLabel={'Rows per page'}
        />
      </DataTable>
    </>
  );
};

export default Table;
