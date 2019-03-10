import React from 'react';
// eslint-disable-next-line
import { Header, Table } from 'semantic-ui-react';
// eslint-disable-next-line
import Icon from '../components/Icon';
// eslint-disable-next-line
import Button from '../components/Button';
// eslint-disable-next-line
import PropTypes from 'prop-types';

// eslint-disable-next-line
const createMarkup = (html) => {
  return { __html: '<strong>Hello World</strong>' };
}

// eslint-disable-next-line
const renderCell = (value) => (<span dangerouslySetInnerHTML={{ __html: value }} />)

/*<Table.Cell>{val.term}</Table.Cell>
<Table.Cell>{val.definition}</Table.Cell>*/

const renderRows = (matches, disabled, onMatchDelete) => {
  return matches.map((val, idx) => {
    return (
      <Table.Row key={val.term} disabled={disabled} >
        <Table.Cell>{renderCell(val.term)}</Table.Cell>
        <Table.Cell>{renderCell(val.definition)}</Table.Cell>
        <Table.Cell>
          <button title={`Delete ${val.term}`} onClick={(event) => onMatchDelete(event, val.term)} >
            <Icon
              icon="trash"
              size={16} />
          </button>
        </Table.Cell>
      </Table.Row>
    );
  });
}

const MatchTable = ({ id, matches, disabled, onMatchDelete }) => {
  const rows = renderRows(matches, disabled, onMatchDelete);
  return (
    <Table id={id} compact>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Term</Table.HeaderCell>
          <Table.HeaderCell>Definition</Table.HeaderCell>
          <Table.HeaderCell></Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {
          matches.length > 0
            ? rows
            : (<Table.Row disabled={disabled}>
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