import React, {useContext} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {useHistory} from 'react-router-dom'
import {useParams} from 'react-router-dom'

export const LinkCard = ({ link }) => {
    const history = useHistory()
    const auth = useContext(AuthContext)
    const {request} = useHttp()
    const linkId = useParams().id

    const pressDelete = async () => {
        try {
            const {success} = await request(`/api/link/${linkId}`, 'DELETE', {}, {
                Authorization: `Bearer ${auth.token}`
            })
            if (success)
                history.push(`/links`)
        } catch (e) {}
    }

    return (
        <>
            <h2>Ссылка</h2>

            <p>Ваша ссылка: <a href={link.to} target="_blank" rel="noopener noreferrer">{link.to}</a></p>
            <p>Откуда: <a href={link.from} target="_blank" rel="noopener noreferrer">{link.from}</a></p>
            <p>Количество кликов по ссылке: <strong>{link.clicks}</strong></p>
            <p>Дата создания: <strong>{new Date(link.date).toLocaleDateString()}</strong></p>
            <button onClick={pressDelete}>DELETE</button>
        </>
    )
}
