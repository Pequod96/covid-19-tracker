import React from 'react';
import './Table.css';
import numeral from 'numeral';

const Table = ({states}) => {
  return (
    <div className='table'>
      {states.map(({ state, cases}, index) => (
        <table key={index}>
        <tbody>
        <tr>
            <td>{state}</td>
            <td><strong>{numeral(cases).format("0.0")}</strong></td>
        </tr>
        </tbody>
        </table>
      ))}
    </div>
  )
}

export default Table;
