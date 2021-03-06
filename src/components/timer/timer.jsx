import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import GameMap from '../GameMap/GameMap'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'
import TableUI from '../TableUI'
import Divider from '@material-ui/core/Divider';
import Switch from '@material-ui/core/Switch'
import 'fontsource-roboto';
import Grid from '@material-ui/core/Grid'
import AddIcon from '@material-ui/icons/Add';

import { connect } from "react-redux"
import { AddingArrowAction, DeletingArrowAction } from "../../redux/actions/arrowActions"

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    childTable: {
        flexGrow: 1,
        paddingLeft: '2vw',
        marginTop: '5vh',
        flexDirection: "row"
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    saudara: {
        marginRight: '2px',
        flexDirection: 'row',
        flexWrap: 'nowrap'
    }
}))


const Timer = ({ arrowNumber, arrowsData, addArrow, deleteArrow }) => {

    const MsToTime = (s) => {
        var ms = s % 1000
        s = (s - ms) / 1000
        var secs = s % 60
        s = (s - secs) / 60
        var mins = s % 60
        var hrs = (s - mins) / 60

        return hrs + ':' + mins + ':' + secs + '.' + ms
    }


    const [startOnce, setstartOnce] = useState(false)
    const [intervalFunc, setintervalFunc] = useState({})
    const [RLeft, setRLeft] = useState([])
    const [RRight, setRRight] = useState([])
    const [RTop, setRTop] = useState([])
    const [RBottom, setRBottom] = useState([])
    const [RCenter, setRCenter] = useState([])
    const [BLeft, setBLeft] = useState([])
    const [BRight, setBRight] = useState([])
    const [BTop, setBTop] = useState([])
    const [BBottom, setBBottom] = useState([])
    const [BCenter, setBCenter] = useState([])
    const [arrowCounter, setarrowCounter] = useState({ arrow: 1 })

    const [timeElapsed, settimeElapsed] = useState({ time: 180 })
    const [toggleTimer, settoggleTimer] = useState(false)

    useEffect(() => {
        if (RLeft.length > 1 && RRight.length > 1 && RBottom.length > 1 && RTop.length > 1 && RCenter.length > 1) {
            alert('Red Team Victory')
        }
        if (BLeft.length > 1 && BRight.length > 1 && BBottom.length > 1 && BTop.length > 1 && BCenter.length > 1) {
            alert('Blue Team Victory')
        }
    }, [RLeft, RRight, RBottom, RTop, RCenter, BLeft, BRight, BBottom, BTop, BCenter])

    useEffect(() => {
        if (timeElapsed.time == 0) {
            StopAction()
            settimeElapsed({ time: 0 })
            if ((RLeft.length + RRight.length + RTop.length + RBottom.length + RCenter.length) > (BLeft.length + BRight.length + BTop.length + BBottom.length + BCenter.length)) {
                alert('Red Team Wins')
            } else {
                alert('Blue Team Wins')
            }
        }
    }, [timeElapsed.time, RLeft, RRight, RBottom, RTop, RCenter, BLeft, BRight, BBottom, BTop, BCenter])

    useEffect(() => {
        setRLeft(arrowsData.RLeft);
        setRRight(arrowsData.RRight);
        setRTop(arrowsData.RTop);
        setRBottom(arrowsData.RBottom);
        setRCenter(arrowsData.RCenter);
        setBLeft(arrowsData.BLeft);
        setBRight(arrowsData.BRight);
        setBTop(arrowsData.BTop);
        setBBottom(arrowsData.BBottom);
        setBCenter(arrowsData.BCenter);
        // console.log('arrows data: ', arrowsData);
    }, [arrowCounter, arrowsData.RLeft, arrowsData.RRight, arrowsData])



    const makeTime = () => {
        setstartOnce(true)
        setintervalFunc(
            setInterval(() => {
                settimeElapsed((timeElapsed) => {
                    return {
                        time: timeElapsed.time - 1
                    }
                })
            }, 1000),
        )
    }

    const StopAction = () => {
        clearInterval(intervalFunc)
        console.log('stop')
    }

    const Restart = () => {
        clearInterval(intervalFunc)
        setstartOnce(false)
        console.log("what is the time: ", timeElapsed)
        toggleTimer == false ? settimeElapsed((timeElapsed) => {
            return {
                time: 180
            }
        }) : settimeElapsed((timeElapsed) => {
            return {
                time: 60
            }
        })
    }



    const handleToggletimer = (event) => {
        settoggleTimer(!toggleTimer)
        timeElapsed.time == 180 ? settimeElapsed((timeElapsed) => {
            return {
                time: 60
            }
        }) : settimeElapsed((timeElapsed) => {
            return {
                time: 180
            }
        })
    }

    const classes = useStyles();

    return (
        <>
            <div>
                <h1>{MsToTime(timeElapsed.time * 1000)}</h1>

                <Switch
                    checked={toggleTimer}
                    onChange={handleToggletimer}
                    color="secondary"
                    name="toggleTimer"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                />
                <Button variant="contained" disabled={startOnce} onClick={makeTime} style={{ marginLeft: "1vw" }}>
                    Start
                </Button>
                <Button variant="contained" onClick={Restart} style={{ marginLeft: "1vw" }}>
                    Restart
                </Button>
                <Button variant="contained" onClick={StopAction} style={{ marginLeft: "1vw" }}>
                    Stop
                </Button>
                {/* <Button variant="contained" onClick={lapAction}>
                    Lap
                </Button> */}
                {/* <Button variant="contained" onClick={() => {
                    addArrow(1, arrowNumber, timeElapsed.time);
                }}>
                    add bar 1
                </Button>
                <Button variant="contained" onClick={() => {
                    addArrow(2, arrowNumber, timeElapsed.time);
                }}>
                    add bar 2
                </Button>
                <Button variant="contained" onClick={() => {
                    deleteArrow(1);
                }}>
                    del bar 1
                </Button>
                <Button variant="contained" onClick={() => {
                    deleteArrow(2);
                }}>
                    del bar 2
                </Button> */}
            </div>



            <div className={classes.root}>
                <Grid container className={classes.saudara}>
                    <Grid container style={{ maxWidth: "40vw", marginTop: "5vh" }}>
                        <GameMap addingArrow={addArrow} arrowNumber={arrowNumber} timeElapsed={timeElapsed.time} />
                    </Grid>
                    <Grid style={{ flex: 1, flexGrow: 1, flexDirection: "row" }}>
                        <Grid container className={classes.saudara}>
                            <Typography variant="h2" style={{ marginTop: "1vh", marginLeft: "20vw", color: "red" }}>Red : {RLeft.length + RRight.length + RTop.length + RBottom.length + RCenter.length}</Typography>
                            <Button
                                variant="outlined"
                                color="secondary"
                                startIcon={<AddIcon />}
                                style={{ marginTop: "3vh", marginLeft: "3vw", maxHeight: "5vh" }}
                            >
                                <Typography style={{ color: 'red' }}>
                                    Violation
                                </Typography>
                            </Button>
                        </Grid>
                        <Grid container className={classes.saudara} style={{ marginBottom: "3vh" }}>
                            <Grid style={{ maxWidth: "200px", marginTop: "2vh", marginLeft: "1vw" }}>
                                <TableUI RlapPot={RLeft} />
                            </Grid>
                            <Grid style={{ maxWidth: "200px", marginTop: "2vh", marginLeft: "1vw" }}>
                                <TableUI RlapPot={RRight} />
                            </Grid>
                            <Grid style={{ maxWidth: "200px", marginTop: "2vh", marginLeft: "1vw" }}>
                                <TableUI RlapPot={RTop} />
                            </Grid>
                            <Grid style={{ maxWidth: "200px", marginTop: "2vh", marginLeft: "1vw" }}>
                                <TableUI RlapPot={RBottom} />
                            </Grid>
                            <Grid style={{ maxWidth: "200px", marginTop: "2vh", marginLeft: "1vw" }}>
                                <TableUI RlapPot={RCenter} />
                            </Grid>
                        </Grid>
                        <Grid style={{ maxWidth: "70vw", marginLeft: "1vw" }}>
                            <hr />
                        </Grid>
                        <Grid container className={classes.saudara}>
                            <Typography variant="h2" style={{ marginTop: "1vh", marginLeft: "20vw", color: "Blue" }}>
                                Blue: {BLeft.length + BRight.length + BTop.length + BBottom.length + BCenter.length}</Typography>
                            <Button
                                variant="outlined"
                                color="secondary"
                                startIcon={<AddIcon />}
                                style={{ marginTop: "4vh", marginLeft: "3vw", maxHeight: "5vh" }}
                            >
                                <Typography style={{ color: 'red' }}>
                                    Violation
                                </Typography>
                            </Button>
                        </Grid>
                        <Grid container className={classes.saudara}>
                            <Grid style={{ maxWidth: "200px", marginTop: "2vh", marginLeft: "1vw" }}>
                                <TableUI RlapPot={BLeft} />
                            </Grid>
                            <Grid style={{ maxWidth: "200px", marginTop: "2vh", marginLeft: "1vw" }}>
                                <TableUI RlapPot={BRight} />
                            </Grid>
                            <Grid style={{ maxWidth: "200px", marginTop: "2vh", marginLeft: "1vw" }}>
                                <TableUI RlapPot={BTop} />
                            </Grid>
                            <Grid style={{ maxWidth: "200px", marginTop: "2vh", marginLeft: "1vw" }}>
                                <TableUI RlapPot={BBottom} />
                            </Grid>
                            <Grid style={{ maxWidth: "200px", marginTop: "2vh", marginLeft: "1vw" }}>
                                <TableUI RlapPot={BCenter} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

            </div>
        </>
    )
}


const mapStateToProps = (state) => {
    return ({
        arrowsData: state.arrowList.arrows,
        arrowNumber: state.arrowList.numberOfArrows,
    })
}

const mapDispatchToProps = (dispatch) => {
    return ({
        addArrow: (barrel, arrow, time) => { dispatch(AddingArrowAction(barrel, arrow, time)) },
        deleteArrow: (id) => { dispatch(DeletingArrowAction(id)) }
    })
}



export default connect(mapStateToProps, mapDispatchToProps)(Timer)
