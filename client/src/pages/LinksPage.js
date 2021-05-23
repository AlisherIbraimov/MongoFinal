import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {Loader} from '../components/Loader'
import {LinksList} from '../components/LinksList'
import {CreatePage} from './CreatePage'

export const LinksPage = () => {
    const [links, setLinks] = useState([])
    const [clicks, setClicks] = useState(0)
    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)

    const fetchLinks = useCallback(async () => {
        try {
            const fetched = await request('/api/link', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setLinks(fetched)
        } catch (e) {}
    }, [token, request])

    const fetchClicks = useCallback(async () => {
        try {
            const fetched = await request('/api/link/overall-data', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setClicks(fetched[0])
        } catch (e) {}
    }, [token, request])

    useEffect(() => {
        fetchLinks()
        fetchClicks()
    }, [fetchLinks, fetchClicks])

    if (loading) {
        return <Loader/>
    }

    return (
        <>
            {!loading && <CreatePage />}
            {!loading && <LinksList links={links} clicks={clicks} />}
        </>
    )
}
