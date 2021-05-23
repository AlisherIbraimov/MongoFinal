import React, {useContext, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {useHistory} from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export const CreatePage = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)
    const {loading, request} = useHttp()
    const [link, setLink] = useState('')

    const pressHandler = async event => {
        try {
            const data = await request('/api/link/generate', 'POST', {from: link}, {
                Authorization: `Bearer ${auth.token}`
            })
            history.push(`/detail/${data.link._id}`)
        } catch (e) {}
    }

    return (
        <Grid container spacing={3} style={{marginBottom: "3rem"}}>
            <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="link"
                    label="Link"
                    name="link"
                    autoFocus
                    value={link}
                    onChange={e => setLink(e.target.value)}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={loading || !link}
                    onClick={pressHandler}
                >
                    Create
                </Button>
            </Grid>
        </Grid>
    )
}
