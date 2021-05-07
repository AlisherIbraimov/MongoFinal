import React from 'react'
import {Link} from 'react-router-dom'
const { useState } = React;

export const LinksList = ({ links }) => {

    const [search, setValue] = useState("");
    const handleChange = (e) => setValue(e.target.value);

    if (!links.length) {
        return <p className="center">Ссылок пока нет</p>
    }
    return (
        <div>
            <input type="search" value={search} onChange={handleChange}/>
            <table>
                <thead>
                <tr>
                    <th>№</th>
                    <th>Оригинальная</th>
                    <th>Сокращенная</th>
                    <th>Открыть</th>
                </tr>
                </thead>

                <tbody>
                { links.filter((value) => {
                    if (value.from && value.to) {
                        return value.from.toLowerCase().includes(search.toLowerCase())||
                        value.to.toLowerCase().includes(search.toLowerCase());
                    }
                    return true;
                }).map((link, index) => {
                    return (
                        <tr key={link._id}>
                            <td>{index + 1}</td>
                            <td>{link.from}</td>
                            <td>{link.to}</td>
                            <td>
                                <Link to={`/detail/${link._id}`}>Открыть</Link>
                            </td>
                        </tr>
                    )
                }) }
                </tbody>
            </table>
        </div>
    )
}