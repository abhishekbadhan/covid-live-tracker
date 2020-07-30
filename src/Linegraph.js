import React,{useState, useEffect} from 'react'
import {Line} from 'react-chartjs-2'

function Linegraph({casestatus}) {
  if (casestatus === "active"){
    var casestatus = "cases"
    var bcolor = "darkred"
    var color = "#f55858b8"

  }
  else if (casestatus === "recovered"){
    var bcolor = "green"
    var color = "#14d435"
  }
  else {
    var bcolor = "red"
    var color = "pink"
  }


    const [graphdata_x , setgraphdata_x] = useState([])
    const [graphdata_y , setgraphdata_y] = useState([])
    useEffect(() => {
        const timedata = async()=>{
            await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
            .then((response) => response.json())
            .then((data) =>processdata(data)
             )
        }

        timedata()
    },[casestatus])

    const processdata = (data) =>{
        let chartdatax = []
        let chartdatay = []
        let lastdatepoint  ;
        for(var date in data[casestatus]){ 
                // PUSING DATA INTO THE X-Y PLOTS
                chartdatax.push(date)
                chartdatay.push(data[casestatus][date] - lastdatepoint)
                lastdatepoint = data[casestatus][date]
        }
        setgraphdata_x(chartdatax)
        setgraphdata_y(chartdatay)
    }



    // NOW MAKING THE GRAPH
    const state = {
        labels: graphdata_x,
        datasets: [
          {
            label: casestatus ,
            opacity:0.1,
            fill: true,
            lineTension: 0.5,
            backgroundColor: color,
            borderColor: bcolor ,
            borderWidth: 2,
            data: graphdata_y
          }
        ]
      }



    return (
        <div>
            <Line
            height={400}
            data={state}
          options={{
            title:{
              display:true,
              text: 'Worldwide new '+casestatus +' last 120 days data',
              fontSize:20,
            },
            legend:{
              display:true,
            //   position:'right'
            }
          }}
        />
        </div>
    )
}

export default Linegraph
