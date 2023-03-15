import React from "react";
import styled from "styled-components";
import numeral from "numeral";

const Table = ({ states }) => {
  return (
    <div>
      <TableWrapper>
        <div className="table">
          {states.map(({ state, cases }, index) => (
            <table key={index}>
              <tbody>
                <tr>
                  <td>{state}</td>
                  <td>
                    <strong>{numeral(cases).format("0.0")}</strong>
                  </td>
                </tr>
              </tbody>
            </table>
          ))}
        </div>
      </TableWrapper>
    </div>
  );
};

export default Table;

const TableWrapper = styled.div`
  .table {
    margin-top: 1rem;
    overflow-y: scroll;
    width: 23.5rem;
    height: 18rem;
    color: rgb(39, 39, 39);
  }
  table {
    width: 22.8rem;
    font-family: "Montserrat";
  }
  .table tr {
    display: flex;
    justify-content: space-between;
  }

  .table td {
    padding: 0.3rem;
  }

  table:nth-of-type(odd) {
    background-color: rgba(128, 128, 128, 0.205);
  }
  @media only screen and (min-width: 320px) and (max-width: 375px) {
    .table {
      margin-top: 1.5rem;
      overflow-y: scroll;
      width: 15.5rem;
      height: 18rem;
      color: rgb(39, 39, 39);
    }
    table {
      width: 14.8rem;
    }
  }

  @media only screen and (min-width: 390px) and (max-width: 480px) {
    .table {
      margin-top: 1.5rem;
      overflow-y: scroll;
      width: 15.5rem;
      height: 18rem;
      color: rgb(39, 39, 39);
    }
    table {
      width: 14.8rem;
    }
  }

  @media only screen and (min-width: 768px) {
    .table {
      margin-top: 1.5rem;
      overflow-y: scroll;
      width: 38rem;
      height: 18rem;
      color: rgb(39, 39, 39);
    }
    table {
      width: 37.3rem;
    }
  }

  @media only screen and (min-width: 1024px) {
    .table {
      margin-top: 1.5rem;
      overflow-y: scroll;
      width: 15rem;
      height: 15rem;
      color: rgb(39, 39, 39);
    }
    table {
      width: 14.3rem;
    }
  }

  @media only screen and (min-width: 1366px) {
    .table {
      margin-top: 1.5rem;
      overflow-y: scroll;
      width: 17rem;
      height: 18rem;
    }
    table {
      width: 16.4rem;
    }
  }
`;
