import React from 'react';
// eslint-disable-next-line
import { Header, Table } from 'semantic-ui-react';
// eslint-disable-next-line
import Icon from './Icon';
// eslint-disable-next-line
import Button from './Button';
// eslint-disable-next-line
import PropTypes from 'prop-types';

// eslint-disable-next-line
const createMarkup = (html) => {
  return {__html: '<strong>Hello World</strong>'};
}

// eslint-disable-next-line
const renderCell = (value) => (<span dangerouslySetInnerHTML={ {__html: value} } />)

        /*<Table.Cell>{val.term}</Table.Cell>
        <Table.Cell>{val.definition}</Table.Cell>*/

const renderRows = (matches) => {
  return matches.map((val, idx) => {
    return (
      <Table.Row key={val.term}>
        <Table.Cell>{renderCell(val.term)}</Table.Cell>
        <Table.Cell>{renderCell(val.definition)}</Table.Cell>
      </Table.Row>
    );
  });
}

const MatchTable = ({ id, matches }) => {
  const rows = renderRows(matches);
  return (
    <Table id={id} fixed compact>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Term</Table.HeaderCell>
          <Table.HeaderCell>Definition</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {
          matches.length > 0
            ? rows
            : (<Table.Row>
                 <Table.Cell>No matches...</Table.Cell>
              </Table.Row>)
        }
      </Table.Body>
    </Table>);
}

MatchTable.propTypes = {
};

MatchTable.defaultProps = {
};

export default MatchTable;