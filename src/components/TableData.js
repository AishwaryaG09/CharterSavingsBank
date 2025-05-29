import styled from "styled-components";

export const StyledTable = styled.table`
  margin: auto;
  caption-side: top;
  border-collapse: collapse;
  caption-side: bottom;

  td,
  th {
    padding: 5px 10px;
  }

  tbody tr {
    :hover {
      background-color: rgb(218, 220, 253);
    }
  }
  thead > tr {
    background-color:rgb(174, 178, 254);
  }
  caption {
    font-size: 0.9em;
    padding: 5px;
    font-weight: bold;
  }
`;
// aliceblue