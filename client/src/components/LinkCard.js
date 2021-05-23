import React, {useContext, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {useHistory} from 'react-router-dom'
import {useParams} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import {Loader} from './Loader'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles({
    root: {
      maxWidth: "100%",
    },
});

export const LinkCard = ({ link }) => {
    const history = useHistory()
    const auth = useContext(AuthContext)
    const {request} = useHttp()
    const linkId = useParams().id
    const classes = useStyles();
    const [linkFrom, setLink] = useState(link.from)

    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const pressDelete = async () => {
        try {
            const {success} = await request(`/api/link/${linkId}`, 'DELETE', {}, {
                Authorization: `Bearer ${auth.token}`
            })
            if (success)
                history.push(`/links`)
        } catch (e) {}
    }

    const pressEdit = async () => {
        try {
            const {success} = await request(`/api/link/${linkId}`, 'PUT', {from: linkFrom}, {
                Authorization: `Bearer ${auth.token}`
            })
            if (success) {
                link.from = linkFrom
                window.handleOpenSnackbar("Successfully")
            }
        } catch (e) {}
    }

    if (!link) {
        return <Loader/>
    }

    return (
        <Card className={classes.root} style={{width: "100%", height: "100%"}}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    Link
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    <strong>To: </strong>{link.from} <br />
                    <strong>Short Link: </strong>{link.to} <br />
                    <strong>Clicks: </strong>{link.clicks} <br />
                    <strong>Created Date: </strong> {new Date(link.date).toLocaleDateString()}
                </Typography>
            </CardContent>
            <CardActions>
                <Button href={link.from} target="_blank" size="small" color="primary">
                    To
                </Button>
                <Button href={link.to} target="_blank" size="small" color="primary">
                    Short Link
                </Button>
                <Button endIcon={<DeleteIcon />} size="small" color="secondary" onClick={pressDelete}>
                    Delete
                </Button>
                <Button endIcon={<EditIcon />} size="small" color="secondary" onClick={handleClickOpen}>
                    Edit
                </Button>
            </CardActions>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth>
                <DialogTitle id="form-dialog-title">Edit</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        You can edit "to" link at this dialog
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Link"
                        type="url"
                        fullWidth
                        value={linkFrom}
                        onChange={e => setLink(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="inherit">
                        Cancel
                    </Button>
                    <Button onClick={pressEdit} color="primary">
                        Edit
                    </Button>
                </DialogActions>
            </Dialog>
        </Card>
    )
}
