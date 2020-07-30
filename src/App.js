import React, {useEffect, useState} from 'react';
import {InputLabel,MenuItem, FormControl,Select,makeStyles, Card} from '@material-ui/core';
import './App.css';
import Cards from './Cards';
import Table from './Table'
import Linegraph from './Linegraph'
import MapView from './components/MapView';



const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(2),
    minWidth: 180,
  },
}));

function App() {
  const [countries, setcountries] = useState([])
  const [boxdata, setboxdata] = useState({active: 0, recovered: 3, deaths: 0, total: 3})
  const [allcountriesdata, setallcountriesdata] = useState([])
  const [mapcenter, setmapcenter] = useState({})
  const [casestatus, setcasestatus] = useState('active')
  // console.log('MAPCENTER',mapcenter)


  const classes = useStyles();
  const [age, setAge] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const position = [51.505, -0.09]

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const takecountry = value => {
    const url  = value === 'None' ?"https://disease.sh/v3/covid-19/all" :`https://disease.sh/v3/covid-19/countries/${value}`
    let list = []
    const selectdata = async()=>{
      await fetch(url)
      .then((response) => response.json())
      .then(data => {
        setboxdata({'active':data.active,'recovered':data.recovered,'deaths':data.deaths,'total':data})
        
        setmapcenter(data)
      })
    }
    selectdata()
  }


  // USEEFFECT FOR SETTING INITIAL DATA
  useEffect(() => {
    const initialdata = async()=>{
      await fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setboxdata({'active':data.active,'recovered':data.recovered,'deaths':data.deaths,'total':data.cases})
      })
    }
    initialdata()
  },[])


  // USEEFFECT FOR SHOWING COUNTRIES AND THE DATA
  useEffect(() => {
    const getcountriesdata = async() =>{
      await fetch('https://disease.sh/v3/covid-19/countries')
      .then(response => response.json())
      .then(data => {
        const countries = data.map(dta => ({
            country:dta.country,
            value : dta.countryInfo.iso3,
          }
          ));
          setcountries(countries)
          setallcountriesdata(data)
        }
      )
    }
    getcountriesdata()
  },[])


 

  // console.log('CASESTATUS >>>>>>-----',casestatus)


  return (
    <div className="box">
      
        <div className="left-box">
          <div className="liveicon" >
            <img src="https://i.pinimg.com/originals/9b/1f/c3/9b1fc305565c578cb25bc80338b641a4.gif" width="50px" height="20px" />
          </div>
          <div className="left-box-1">
            <div className="header1" >
              <h1>COVID TRACKER</h1>
            </div>
            <div className="header2">
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-controlled-open-select-label">SELECT COUNTRY</InputLabel>
                        <Select
                          labelId="demo-controlled-open-select-label"
                          id="demo-controlled-open-select"
                          open={open}
                          onClose={handleClose}
                          onOpen={handleOpen}
                          value={age}
                          onChange={handleChange}
                          
                        >
                          <MenuItem value="None" onClick = {()=>takecountry('None')} className='menutext' >Worldwide(default)</MenuItem>
                          {countries.map(count =><MenuItem key={count.country} value={count.country} onClick = {()=>takecountry(count.country)} >{count.country}</MenuItem>)} 
                        </Select>
                  </FormControl>
            </div>
          </div>
          <div className="left-box-2">
            <Cards  title="ACTIVE" cases={boxdata.active} total={boxdata} action={casestatus === 'active'} onClick={()=>setcasestatus('active')} />
            <Cards  title="RECOVERED" cases={boxdata.recovered} total={boxdata} action={casestatus === 'recovered'} onClick={()=>setcasestatus('recovered')} />
            <Cards  title="DEATHS" cases={boxdata.deaths} total={boxdata} action={casestatus === 'deaths'} onClick={()=>setcasestatus('deaths')} />
          </div>
          <Card className="map-box">
            <em>Click on circles to get information about country</em>
            <MapView countries_data = {allcountriesdata} mapcenter={mapcenter} casestatus={casestatus} />
          </Card>
        </div>


          <Card className="right-box" style={{padding: 14}} >
              <div className="graph-box">
                <Linegraph casestatus={casestatus} />
              </div>
              <h3>ALL COUNTRIES DATA</h3>
              <Table countries={allcountriesdata} />
          </Card>

          <Card className="myinfo" >
            <div>MADE BY ABHISHEK || </div> 
            <div><a href="https://www.linkedin.com/in/abhishek-badhan-959a38186/"><img src="https://www.freepnglogos.com/uploads/linkedin-in-logo-png-1.png" width="30px" height="30px" /> </a></div>
            <div><a href="https://github.com/abhishekbadhan" ><img src="https://cdn.freebiesupply.com/logos/large/2x/github-icon-logo-png-transparent.png" width="30px" height="30px"/></a></div>
          </Card>
    </div>


  );
}

export default App;