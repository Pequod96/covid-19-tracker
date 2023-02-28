import { FormControl, MenuItem, Select, Card, CardContent } from '@mui/material';
import { useEffect, useState } from 'react';
import './App.css';
import Infobox from './components/Infobox';
import Table from './components/Table';
import { sortData, prettyPrintStat } from './components/util';
import numeral from 'numeral';
import covidTitle from '../src/assets/images/covidTitle.gif';
import USAGov from '../src/assets/images/USAGov.png';
import BarChart from './components/BarChart';
import { StatesData } from './Data';
import Info from './components/Info';
import { BrowserRouter } from 'react-router-dom';
import { HashLink as Link } from 'react-router-hash-link';

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('USA States');
  const [stateInfo, setStateInfo] = useState({});
  const [tableData, setTabledata] = useState([]);
  const [statesData, setStatesData] = useState({
    labels: StatesData.map((data) => data.state),
    datasets: [{
      label: "Top 5 states with the most cases",
      data: StatesData.map((data) => data.cases),
      backgroundColor: ["rgb(157, 2, 8)",
      "rgb(208, 0, 0)",
      "rgb(220, 47, 2)",
      "rgb(232, 93, 4)",
      "rgb(244, 140, 6)"],
      color:"white",
    }]
  });

  useEffect(() => {
    const getData = async () => {
      await fetch('https://disease.sh/v3/covid-19/states')
      .then (response => response.json())
      .then(data => {
        const countries = data.map(item => (
          {
            name: item.state,
            value: item.state
          }
        ))
        const sortedData = sortData(data)
        setTabledata(sortedData)
        setCountries(countries)
      })
    }
    getData()
  }, []) 

  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/states')
    .then(response => response.json())
    .then(data => setStateInfo(data))
  }, [])

  const onCountryChange = async e => {
    const url = e.target.value === 'USA States' ? 'https://disease.sh/v3/covid-19/states' :
    `https://disease.sh/v3/covid-19/states/${e.target.value}`

    await fetch(url)
    .then(response => response.json())
    .then(data => {
      setCountry(e.target.value)
      setStateInfo(data)
    })
  }

  return (
    <BrowserRouter>
    <div className="app">
     <div className='app-header'>
     <Link className='navlink' to='#tracker2' smooth>
      TRACKER
     </Link>
     <Link className='navlink' to='#avoidcovid' smooth>
      AVOID COVID
     </Link>
     <a href='https://www.usa.gov/coronavirus' target={'blank'}><img className='USAGov' src={USAGov} alt=''/></a>
     <h1>C<img className="covidtitle" src={covidTitle} alt=''/>VID-19</h1>
     <h1 className='tracker'>TRACKER</h1>
     <p>The updated real-time statistics of the coronavirus Covid-19 in the United States.
     The data of the infected, the dead and the recovered.</p>
     </div>
     <h2 className='tracker2' id='tracker2'>TRACKER</h2>
     <div className='app-dropdown'>
     <FormControl className='formcontrol'>
      <Select variant='outlined' value={country} onChange={onCountryChange}>
      <MenuItem value="USA States">USA States</MenuItem>
         {countries.map(country => <MenuItem value={country.value}>{country.name}</MenuItem>)}
       </Select>
      </FormControl>
      </div>
      <div className='app-stats'>
        <Infobox title="Coronavirus Cases"
        cases={prettyPrintStat(stateInfo.todayCases)}
        total={numeral
        (stateInfo.cases).format("0.0a")}
        />
        <Infobox title="Recovered"
        cases={prettyPrintStat(stateInfo.recovered)}
        isGreen
        total={numeral
        (stateInfo.recovered).format("0.0a")}
        />
        <Infobox title="Deaths"
        cases={prettyPrintStat(stateInfo.todayDeaths)}
        total={numeral
        (stateInfo.deaths).format("0.0a")}
        />
        </div>
      <Card className='app-right'>
        <CardContent>
          <h3>Live cases by States</h3>
          <Table states={tableData} />
        </CardContent>
      </Card>
      <div className='barchart'>
      <BarChart chartData={statesData} />
      </div>
      <Info />
    </div>
    </BrowserRouter>
  );
}

export default App;
