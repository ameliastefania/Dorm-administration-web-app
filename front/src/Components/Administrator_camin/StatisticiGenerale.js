import React, {useEffect, useState} from "react";
import * as rute from '../../api/ruteApi'
import * as apiCalls from '../../APICalls'

import { Menubar } from 'primereact/menubar';
import "/node_modules/primeflex/primeflex.css"
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import useItems from '../../hooks/useItems.js'
import { PanelMenu } from 'primereact/panelmenu'
import { Chart } from 'primereact/chart';
import { useNavigate } from "react-router-dom";

import ase_icon_main_page from '../../media/ase-icon-main-page.jpg'

function StatisticiGenerale() {
    const navigate = useNavigate()
    const items = useItems()
    var localStorageItem = JSON.parse(localStorage.getItem("login"))
    const [tipChart, setTipChart] = useState(null)
    const [graficAles, setGraficAles] = useState(null)
    const [dataSet, setDataSet ] = useState(null);
    const [optiuniChart, setOptiuniChart ] = useState(null)

    const [chartData,setChartData] = useState(null);
    const [lightOptions, setLightOptions] = useState(null);
    const [basicOptions, setBasicOptions] = useState(null)
    const [basicData, setBasicData] = useState(null);

    const [situatieVotare, setSituatieVotare] = useState(null)
    const [studentiGrupatiPeFac, setStudentiGrupatiPeFac] = useState(null) 

    const [X, setX] = useState(0)
    let [count,setCount] = useState(0)
    const [titluGrafic, setTitluGrafic] = useState(null)

    async function getSituatieVoturi() {
        try {
            let result = await apiCalls.AdminGET.getSituatieVoturi_ChartPie(rute.getStudenti,localStorageItem.id_admin_camin)
            console.log(result)
            if (result) {
                setSituatieVotare(result)
                setX(1)
            } else {
                await apiCalls.connOptions.logOut(rute.LOGOUT_URL)
                navigate("/")
            }
        }
        catch(err) {
            await apiCalls.connOptions.logOut(rute.LOGOUT_URL)
            navigate("/")
            console.log(err)
        }
    }
    async function getStudentiGroupedByFac() {
        try {
            let result = await apiCalls.AdminGET.getStudentiGroupedByFac_ChartPie(rute.getStudenti,localStorageItem.id_admin_camin)
            console.log(result)
            if (result){
                setStudentiGrupatiPeFac(result)
                setX(1)
            } else {
                await apiCalls.connOptions.logOut(rute.LOGOUT_URL)
                navigate("/")
            }
        }
        catch(err) {
            
            console.log(err)
            await apiCalls.connOptions.logOut(rute.LOGOUT_URL)
            navigate("/")
        }
    }
   
    useEffect( () => {
        getSituatieVoturi();
        getStudentiGroupedByFac();
    },[])

    const meniuGrafice = [
        {
            label: 'Grafice',
            items: [
                {
                    label: 'Situatia voturilor',
                    command: () => {
                        setTitluGrafic("Situatia prezentei la vot a studentilor")
                        setTipChart(tipChart => tipChart = "pie")
                        console.log(tipChart)
                        setChartData( chartData => chartData = {
                            labels: Array.from(situatieVotare.keys()),
                            datasets: [
                                {
                                    data: Array.from(situatieVotare.values()),
                                    backgroundColor: [
                                        "#42A5F5",
                                        "#66BB6A"
                                    ],
                                    hoverBackgroundColor: [
                                        "#64B5F6",
                                        "#81C784"
                                    ]
                                }
                            ]
                        });
                        // setDataSet(chartData)
                        setLightOptions(lightOptions => lightOptions={
                            plugins: {
                                legend: {
                                    labels: {
                                        color: '#495057'
                                    }
                                }
                            }
                        });
                        setOptiuniChart(lightOptions)
                        setGraficAles(1)
                    }
                },
                {
                    label: 'Procentaj studenti grupati pe facultate',
                    command: () => {
                        setTitluGrafic("Procentajul studentilor grupati pe facultate")
                        setTipChart(tipChart => tipChart = "pie")
                        console.log(tipChart)
                        setChartData( chartData => chartData = {
                                labels: Array.from(studentiGrupatiPeFac.keys()),
                                datasets: [
                                    {
                                        data: Array.from(studentiGrupatiPeFac.values()),
                                        backgroundColor: [
                                            "#42A5F5",
                                            "#66BB6A",
                                            "#FFA726",
                                            "#A52A2A",
                                            "#FF0055"
                                        ],
                                        hoverBackgroundColor: [
                                            "#64B5F6",
                                            "#81C784",
                                            "#FFB74D",
                                            "#CD5252",
                                            "#FF287D"
                                        ]
                                    }
                                ]
                        });
                        // setDataSet(chartData)
                        setLightOptions(lightOptions => lightOptions={
                            plugins: {
                                legend: {
                                    labels: {
                                        color: '#495057'
                                    }
                                }
                            }
                        });
                        setOptiuniChart(lightOptions)
                        setGraficAles(2)
                }
            }
        ]
                
         // DOAR MOMENTAN RENUNT LA PARTEA ASTA   
        // },
        // {
        //     label: 'Bar charts',
        //     items: [
        //         {
        //             label: 'First bar chart',
        //             command: () => {
        //                 setTipChart(tipChart => tipChart = "bar")
        //                 console.log(tipChart)
        //                 setBasicData(basicData => basicData ={
        //                     labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        //                     datasets: [
        //                         {
        //                             label: 'My First dataset',
        //                             backgroundColor: '#42A5F5',
        //                             data: [65, 59, 80, 81, 56, 55, 40]
        //                         },
        //                         {
        //                             label: 'My Second dataset',
        //                             backgroundColor: '#FFA726',
        //                             data: [28, 48, 40, 19, 86, 27, 90]
        //                         }
        //                     ]
        //                 });
        //                 setDataSet(basicData)
        //                 setBasicOptions(basicOptions => basicOptions ={
        //                     maintainAspectRatio: false,
        //                     aspectRatio: .8,
        //                     plugins: {
        //                         legend: {
        //                             labels: {
        //                                 color: '#495057'
        //                             }
        //                         }
        //                     },
        //                     scales: {
        //                         x: {
        //                             ticks: {
        //                                 color: '#495057'
        //                             },
        //                             grid: {
        //                                 color: '#ebedef'
        //                             }
        //                         },
        //                         y: {
        //                             ticks: {
        //                                 color: '#495057'
        //                             },
        //                             grid: {
        //                                 color: '#ebedef'
        //                             }
        //                         }
        //                     }
        //                 });
        //                 setOptiuniChart(basicOptions)
        //                 setOptiuniChart(3)
        //             }
        //         }
        //     ]
         }
    ];

    function incarcaDate(){
        switch (graficAles) {
            case 1: {
                setTipChart(tipChart => tipChart = "pie")
                console.log(tipChart)
                setChartData( chartData => chartData = {
                    labels: ["Studenti care au votat","Studenti care nu au votat"],
                    datasets: [
                        {
                            data: situatieVotare,
                            backgroundColor: [
                                "#42A5F5",
                                "#66BB6A"
                            ],
                            hoverBackgroundColor: [
                                "#64B5F6",
                                "#81C784"
                            ]
                        }
                    ]
                });
                setDataSet(chartData)
                setLightOptions(lightOptions => lightOptions={
                    plugins: {
                        legend: {
                            labels: {
                                color: '#495057'
                            }
                        }
                    }
                });
                setOptiuniChart(lightOptions)
                
            }
            case 2: {
               
                // let divText = utils.generateElemHTML.divProcentajStud();
                // let paragraf = utils.generateElemHTML.paragrafProcentajStud()   
                // setCount(++count)  
                // if (count===1) {
                //     divText.append(paragraf)
                // } else {
                //     if (paragraf) {
                //         try {
                //             let divDeSters = document.getElementById("divProcentajStud")
                //             let paragrafDeSters = document.getElementById("paragrafProcentajStud")

                //             divDeSters.remove()
                //             paragrafDeSters.remove()
                            
                //         }
                //         catch(err) {
                
                //         }
                //     }
                // }
                setTipChart(tipChart => tipChart = "pie")
                        console.log(tipChart)
                        setChartData( chartData => chartData = {
                                labels: ['A', 'B', 'C'],
                                datasets: [
                                    {
                                        data: [300, 50, 100],
                                        backgroundColor: [
                                            "#42A5F5",
                                            "#66BB6A",
                                            "#FFA726"
                                        ],
                                        hoverBackgroundColor: [
                                            "#64B5F6",
                                            "#81C784",
                                            "#FFB74D"
                                        ]
                                    }
                                ]
                        });
                        setDataSet(chartData)
                        setLightOptions(lightOptions => lightOptions={
                            plugins: {
                                legend: {
                                    labels: {
                                        color: '#495057'
                                    }
                                }
                            }
                        });
                        setOptiuniChart(lightOptions)   
            }
        }
        
    }

    return (
        <>
         <Menubar model={items}/>
           <br></br>
           <img src={ase_icon_main_page} class="rounded float-right" alt="Img"></img>
           <br></br>
          
          
            <h1>Academia de Studii Economice Bucuresti</h1>
           
            <h1>Pagina personala a administratorului: {localStorageItem.nume} {localStorageItem.prenume} </h1>
            
            <br></br>
            <br></br>
            <PanelMenu model={meniuGrafice} style={{ width: '22rem' }} />
            <br></br>
            <button onClick={ () => {
                incarcaDate()
                setX(4)
            }}><b>Incarca date</b></button>
            <div>
                <p><b>Grafic selectat: {titluGrafic}</b></p>
            </div>
            <div className="card flex justify-content-center">
           
            <Chart type={tipChart} id="idChart" data={dataSet} options={optiuniChart}  style={{ position: 'relative', width: '30%' }}/>

             </div>
   
        
        </>
    )
}
export default StatisticiGenerale