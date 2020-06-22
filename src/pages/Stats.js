import React, {useEffect, useState} from "react"
import styles from "./Stats.module.sass"
import {Line} from "react-chartjs-2"
import {BACKEND_URL} from "../constants";
import WarningBox from "../components/Minor/WarningBox";
import {SpinnerBig} from "../components/Minor/Spinner";
import LiveIndicator from "../components/Minor/LiveIndicator";


export default function Stats() {
    let [datasets, setDatasets] = useState([])
    let [error, setError] = useState(null)
    let [loading, setLoading] = useState(false)

    const fetchStats = () => {
        setLoading(true)
        fetch(BACKEND_URL + "/getStats?limit=20").then(res => res.json()).then(res => {

            let builder = []
            for(let [key, values] of Object.entries(res)) {
                builder.push({
                    key,
                    datasets:
                        [{
                            label: key,
                            lineTension: 0.1,
                            backgroundColor: 'rgba(255,197,84,0.4)',
                            borderColor: 'rgba(255,197,84,1)',
                            pointBorderColor: 'rgba(255,197,84,1)',
                            pointBackgroundColor: 'rgba(255,197,84,1)',
                            pointHoverBackgroundColor: 'rgba(255,197,84,1)',
                            pointHoverBorderColor: 'rgba(255,197,84,1)',
                            data: values.map((value) => {return {x: Math.round(value.time * 1000), y: value.value}})
                        }]
                })
            }
            setDatasets(builder)
            setLoading(false)
        }).catch(err => {
            console.log(err)
            setError(String(err))
            setLoading(false)
        })
    }

    useEffect(() => {
        fetchStats()
        setInterval(fetchStats, 60 * 1000) //re-fetch every minute
    }, [])

    return (
        <div>
            <div className={styles.header}>
                <h1 className={styles.headline}>Stats</h1>
            </div>

            { error != null ?
            <WarningBox text={<div><b>An error ocurred: </b> <code>{error}</code></div>}/>

            : <LiveIndicator/>
            }

            <div className={styles.section}>
                <h1 className={styles.sectionHeadline}>Guild Count</h1>

                <div className={styles.sectionContent}>
                    <p className={styles.sectionText}>
                        The amount of guilds which are awesome because they have invited chime</p>
                    <div className={styles.graphWrapper}>
                        { datasets.some(item => item.key === "server_amount")
                            && <Line data={datasets.find(item => item.key === "server_amount")} options={{
                            maintainAspectRatio: false, scales: {
                                xAxes: [{
                                    type: 'time',
                                    time: {
                                        parser: 'MM/DD/YYYY HH:mm',
                                        // round: 'day'
                                        tooltipFormat: 'll HH:mm',
                                        unit: 'minute',
                                        unitStepSize: 3
                                    }
                                }],
                                yAxes: [{
                                    ticks: {
                                        min: 0,
                                        stepSize: 1,
                                    },

                                }]
                            }
                        }}


                            />

                        }
                        { loading &&
                            <SpinnerBig color={"dark"}/>
                        }
                    </div>
                </div>

            </div>
            <div className={styles.section}>
                <h1 className={styles.sectionHeadline}>CPU usage</h1>
                <div className={styles.sectionContent}>
                    <p className={styles.sectionText}>
                        The CPU usage of our server, in percent.</p>
                    <div className={styles.graphWrapper}>
                        { datasets.some(item => item.key === "cpu_usage") &&
                        <Line data={datasets.find(item => item.key === "cpu_usage")} options={{
                            maintainAspectRatio: false, scales: {
                                xAxes: [{
                                    type: 'time',
                                    time: {
                                        parser: 'MM/DD/YYYY HH:mm',
                                        // round: 'day'
                                        tooltipFormat: 'll HH:mm',
                                        unit: 'minute',
                                        unitStepSize: 1

                                    },

                                }],
                                yAxes: [{
                                    ticks: {
                                        min: 0,
                                        stepSize: 10,
                                        max: 100
                                    },

                                }]
                            }
                        }}/>}
                        { loading &&
                        <SpinnerBig color={"dark"}/>
                        }
                    </div>
                </div>

            </div>
            <div className={styles.section}>
                <h1 className={styles.sectionHeadline}>RAM usage</h1>
                <div className={styles.sectionContent}>
                    <p className={styles.sectionText}>
                        The RAM usage of our server, in percent.</p>
                    <div className={styles.graphWrapper}>
                        { datasets.some(item => item.key === "ram_usage") &&
                        <Line data={datasets.find(item => item.key === "ram_usage")} options={{
                            maintainAspectRatio: false, scales: {
                                xAxes: [{
                                    type: 'time',
                                    time: {
                                        parser: 'MM/DD/YYYY HH:mm',
                                        // round: 'day'
                                        tooltipFormat: 'll HH:mm',
                                        unit: 'minute',
                                        unitStepSize: 1

                                    },

                                }],
                                yAxes: [{
                                    ticks: {
                                        min: 0,
                                        stepSize: 10,
                                        max: 100
                                    },

                                }]
                            }
                        }}/>}
                        { loading &&
                        <SpinnerBig color={"dark"}/>
                        }
                    </div>
                </div>

            </div>
            <div className={styles.section} style={{marginBottom: 50}}>
                <h1 className={styles.sectionHeadline}>Latency</h1>
                <div className={styles.sectionContent}>
                    <p className={styles.sectionText}>
                        The latency (or ping) of chime to discord's APIs</p>
                    <div className={styles.graphWrapper}>
                        { datasets.some(item => item.key === "latency") &&
                        <Line data={datasets.find(item => item.key === "latency")} options={{
                            maintainAspectRatio: false, scales: {
                                xAxes: [{
                                    type: 'time',
                                    time: {
                                        parser: 'MM/DD/YYYY HH:mm',
                                        // round: 'day'
                                        tooltipFormat: 'll HH:mm',
                                        unit: 'minute',
                                        unitStepSize: 1
                                    },

                                }],
                                yAxes: [{
                                }]
                            }
                        }}/>}
                        { loading &&
                        <SpinnerBig color={"dark"}/>
                        }
                    </div>
                </div>

            </div>

        </div>
    )
}