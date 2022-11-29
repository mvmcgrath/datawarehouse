import { Container, Table } from 'react-bootstrap'
import styled from 'styled-components'

const StyledContainer = styled(Container)`
  margin-top: 50px;
  border: 3px solid white;
  border-radius: 10px;
  color: white;
  display: flex;
  flex-direction: column;
  row-gap: 50px;
  align-items: center;
  padding: 50px 0px;
`

const StyledTable = styled(Table)`
  border: 3px solid white;
  text-align: center;
  font-size: 1rem;
  color: white;
`

const TableDisplay = ({ rows }) => {
  return(
    <StyledContainer className="bg-dark">
      <h1>Data Warehouse</h1>
      <StyledTable className="w-50 rounded">
        <thead>
          <tr>
            {rows.length > 0 && Object.keys(rows[0]).map((column, index) =>
              <th key={index}>
                {column}
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {rows.map(row =>
            <tr key={row.TableID}>
              {Object.values(row).map((column, index) =>
                <td key={index}>
                  {column}
                </td>
              )}
            </tr>
          )}
        </tbody>
      </StyledTable>
    </StyledContainer>
  )
}

export default TableDisplay