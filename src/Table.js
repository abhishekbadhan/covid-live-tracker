import React from 'react'
import './Table.css'

function Table({countries}) {
    return (
        <div className="tablecard" >
            <table>
                <thead>
                    <tr >
                        <th className="tableheading" >Countries</th>
                        <th className="tableheading2">Active</th>
                    </tr>
                </thead>
                <tbody>
                    {countries.map(({country,active,index}) => (
                        <tr>
                            <td key={country} >{country}</td>
                            <td key={index} ><b>{active}</b></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Table
