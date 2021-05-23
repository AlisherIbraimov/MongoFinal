import React from 'react'
import {Link} from 'react-router-dom'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
const { useState } = React;

const useStyles = makeStyles({
    root: {
      maxWidth: "100%",
    },
});

export const LinksList = ({ links, clicks }) => {
    const [search, setValue] = useState("");
    const [searchBy, setSearchBy] = useState("To");
    const handleChange = (e) => setValue(e.target.value);
    const handleChangeSearchBy = (e) => setSearchBy(e.target.value);
    const classes = useStyles();

    if (!links || !links.length) {
        return (
            <Typography variant="h6" style={{textAlign: "center"}}>
                Links list is empty
            </Typography>
        )
    }
    
    return (
        <>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <TextField
                    variant="outlined"
                    id="search"
                    label="Search"
                    name="search"
                    type="url"
                    autoFocus
                    value={search}
                    onChange={handleChange}
                    style={{marginBottom: "2rem", width: "80%"}}
                />
                <FormControl 
                    variant="outlined"
                    style={{width: "19%"}}
                >
                    <InputLabel id="simple-select-outlined-label">Filter by</InputLabel>
                    <Select
                        labelId="simple-select-outlined-label"
                        label="Filter by"
                        id="simple-select-outlined"
                        value={searchBy}
                        onChange={handleChangeSearchBy}
                    >
                        <MenuItem value={"To"}>To</MenuItem>
                        <MenuItem value={"Short link"}>Short link</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <Typography variant="body2" color="textSecondary" component="p" style={{marginBottom: "2rem"}}>
                <strong>Total Clicks: </strong>{clicks.totalClicks}&nbsp;
                <strong>Average Clicks: </strong>{clicks.averageClicks}&nbsp;&nbsp;
                <strong>Max Clicks: </strong>{clicks.maxClicks}&nbsp;&nbsp;
                <strong>Min Clicks: </strong>{clicks.minClicks}
            </Typography>
            <Grid container spacing={3}>
                { links.filter((value) => {
                    if (value.from && value.to) {
                        if (searchBy === "Short link")
                            return value.to.toLowerCase().includes(search.toLowerCase());
                        return value.from.toLowerCase().includes(search.toLowerCase());
                    }
                    return true;
                }).map((link, index) => {
                    return (
                        <Grid item xs={12} lg={4} key={link._id}>
                            <Card className={classes.root} style={{width: "100%", height: "100%"}}>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Link #{index + 1}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        <strong>To: </strong>{link.from} <br />
                                        <strong>Short Link: </strong>{link.to} <br />
                                        <strong>Clicks: </strong>{link.clicks}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button component={Link} to={`/detail/${link._id}`} size="small" color="primary">
                                        Details
                                    </Button>
                                    <Button href={link.from} target="_blank" size="small" color="primary">
                                        To
                                    </Button>
                                    <Button href={link.to} target="_blank" size="small" color="primary">
                                        Short Link
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    )
                })}
            </Grid>
        </>
    )
}