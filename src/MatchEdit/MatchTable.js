import React from 'react';
// eslint-disable-next-line
import { Segment, Table, Grid, Pagination } from 'semantic-ui-react';

import Message from '../components/Message';
// eslint-disable-next-line
import Icon from '../components/Icon';
// eslint-disable-next-line
import PropTypes from 'prop-types';

// eslint-disable-next-line
const createMarkup = html => {
  return { __html: '<strong>Hello World</strong>' };
};

// eslint-disable-next-line
const renderCell = value => (
  <span dangerouslySetInnerHTML={{ __html: value }} />
);

const renderRows = (
  matches,
  disabled,
  activePage,
  itemsPerPage,
  onMatchDelete
) => {
  return matches
    .filter((element, index) => {
      const start = activePage * itemsPerPage - itemsPerPage;
      const end = activePage * itemsPerPage - 1;
      console.log('start vs. end', `${start} vs ${end}`);
      return index >= start && index <= end;
    })
    .map((val, idx) => {
      return (
        <Table.Row key={val.term} disabled={disabled}>
          <Table.Cell>{renderCell(val.term)}</Table.Cell>
          <Table.Cell>{renderCell(val.definition)}</Table.Cell>
          <Table.Cell>
            <button
              title={`Delete ${val.term}`}
              onClick={(event, term) => onMatchDelete(event, val.term)}
            >
              <Icon icon='trash' size={16} />
            </button>
          </Table.Cell>
        </Table.Row>
      );
    });
};

const renderPagination = (activePage, totalPages, onPageChange) => {
  return (
    <div style={{ float: 'right', clear: 'both' }}>
      <Pagination
        activePage={activePage}
        totalPages={totalPages}
        siblingRange={1}
        onPageChange={(event, data) => onPageChange(event, data)}
      />
    </div>
  );
};

const MatchTable = ({
  id,
  matches,
  activePage,
  itemsPerPage,
  disabled,
  error,
  onMatchDelete,
  onPageChange
}) => {
  const totalPages = Math.ceil(
    (matches.length ? matches.length : 0) / itemsPerPage
  );
  console.log('Matches (length)', matches.length);
  console.log('Total Pages', totalPages);
  console.log('Active Page', activePage);
  const rows = renderRows(
    matches,
    disabled,
    activePage,
    itemsPerPage,
    onMatchDelete
  );
  const pagination = renderPagination(activePage, totalPages, onPageChange);
  return (
    <Segment>
      <Grid columns={1} style={{ minHeight: '550px' }}>
        <Grid.Row verticalAlign='top'>
          <Grid.Column>
            <Table id={id} compact='very'>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Term</Table.HeaderCell>
                  <Table.HeaderCell>Definition</Table.HeaderCell>
                  <Table.HeaderCell />
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {matches.length > 0 ? (
                  rows
                ) : (
                  <Table.Row disabled={disabled}>
                    <Table.Cell>No matches...</Table.Cell>
                  </Table.Row>
                )}
              </Table.Body>
            </Table>
          </Grid.Column>
        </Grid.Row>
        {totalPages > 1 ? (
          <Grid.Row verticalAlign='bottom'>
            <Grid.Column>{pagination}</Grid.Column>
          </Grid.Row>
        ) : null}
        {error && (
          <Grid.Row verticalAlign='bottom'>
            <Grid.Column>
              <Message info content={error} />
            </Grid.Column>
          </Grid.Row>
        )}
      </Grid>
    </Segment>
  );
};

MatchTable.propTypes = {};

MatchTable.defaultProps = {};

export default MatchTable;
