import { FormControl, MenuItem, Select, Card, CardContent } from '@mui/material';
import { useEffect, useState } from 'react';
import './App.css';
import Infobox from './components/Infobox';
import Table from './components/Table';
import { sortData, prettyPrintStat } from './components/util';
import numeral from 'numeral';
import covidTitle from '../src/assets/images/covidTitle.gif';
import linkedin from '../src/assets/images/linkedin.gif';
import github from '../src/assets/images/github.gif'
import covid1 from '../src/assets/images/covid1.gif';
import covid2 from '../src/assets/images/covid2.gif';
import covid3 from '../src/assets/images/covid3.gif';
import Info from './components/Info';

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('USA States');
  const [stateInfo, setStateInfo] = useState({});
  const [tableData, setTabledata] = useState([]);

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
    <div className="app">
     <div className='app-header'>
     <a href='https://www.linkedin.com/in/samuele-toro-8aa198226/'><img className='linkedin' src={linkedin}/></a>
     <a href='https://github.com/Pequod96'><img className='github' src={github}/></a>
     <h1>C<img className="covidtitle" src={covidTitle}/>VID-19</h1>
     <h1 className='tracker'>TRACKER</h1>
     <p>The updated real-time statistics of the coronavirus Covid-19 in the United States.
     The data of the infected, the dead and the recovered.</p>
     </div>
     <h2 className='tracker2'>TRACKER</h2>
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
        {/*<img className="covid2" src={covid2}/>
        <img className="covid3" src={covid3}/>*/}
      <Card className='app-right'>
        <CardContent>
          <h3>Live cases by States</h3>
          <Table states={tableData} />
        </CardContent>
      </Card>
      <Info />
    </div>
  );
}

export default App;
