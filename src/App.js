import {
  FormControl,
  MenuItem,
  Select,
  Card,
  CardContent,
} from "@mui/material";
import { useEffect, useState } from "react";
import Infobox from "./components/Infobox";
import Table from "./components/Table";
import { sortData, prettyPrintStat } from "./components/util";
import numeral from "numeral";
import img from "../src/assets/images/covid6.jpg";
import covidTitle from "../src/assets/images/covidTitle.gif";
import covidTitle2 from "../src/assets/images/covidtitle2.gif";
import USAGov from "../src/assets/images/USAGov.png";
import BarChart from "./components/BarChart";
import { StatesData } from "./Data";
import Info from "./components/Info";
import { BrowserRouter } from "react-router-dom";
import { HashLink as Link } from "react-router-hash-link";
import { ClipLoader } from "react-spinners";
import styled from "styled-components";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("USA States");
  const [stateInfo, setStateInfo] = useState({});
  const [tableData, setTabledata] = useState([]);
  const [statesData, setStatesData] = useState({
    labels: StatesData.map((data) => data.state),
    datasets: [
      {
        label: "Top 5 states with the most cases",
        data: StatesData.map((data) => data.cases),
        backgroundColor: [
          "rgb(157, 2, 8)",
          "rgb(208, 0, 0)",
          "rgb(220, 47, 2)",
          "rgb(232, 93, 4)",
          "rgb(244, 140, 6)",
        ],
        color: "white",
      },
      {
        label: "Deaths in the 5 states with the most cases",
        data: StatesData.map((data) => data.deaths),
        backgroundColor: [
          "rgb(0, 119, 182)",
          "rgb(0, 150, 199)",
          "rgb(0, 180, 216)",
          "rgb(72, 202, 228)",
          "rgb(144, 224, 239)",
        ],
        color: "white",
      },
    ],
  });

  useEffect(() => {
    const getData = async () => {
      await fetch("https://disease.sh/v3/covid-19/states")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((item) => ({
            name: item.state,
            value: item.state,
          }));
          const sortedData = sortData(data);
          setTabledata(sortedData);
          setCountries(countries);
        });
    };
    getData();
  }, []);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/states")
      .then((response) => response.json())
      .then((data) => setStateInfo(data));
  }, []);

  const onCountryChange = async (e) => {
    const url =
      e.target.value === "USA States"
        ? "https://disease.sh/v3/covid-19/states"
        : `https://disease.sh/v3/covid-19/states/${e.target.value}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(e.target.value);
        setStateInfo(data);
      });
  };

  return (
    <BrowserRouter>
      <div className="app">
        <FirstWrapper id="header">
          <Link to="#tracker2" smooth>
            TRACKER
          </Link>
          <Link to="#avoidcovid" smooth>
            AVOID COVID
          </Link>
          <a href="https://www.usa.gov/coronavirus" target={"blank"}>
            <img className="USAGov" src={USAGov} alt="" />
          </a>
          <h1>
            C<img className="covidtitle" src={covidTitle} alt="" />
            VID-19
          </h1>
          <h1 className="tracker">TRACKER</h1>
          <p>
            The updated real-time statistics of the coronavirus Covid-19 in the
            United States. The data of the infected, the dead and the recovered.
          </p>
          <Link to="#tracker2" smooth>
            <img className="covidtitle2" src={covidTitle2} alt="" />
          </Link>
        </FirstWrapper>
        <SecondWrapper>
          <h2 className="tracker2" id="tracker2">
            TRACKER
          </h2>
          <div className="app-dropdown">
            <FormControl className="formcontrol">
              <Select
                variant="outlined"
                value={country}
                onChange={onCountryChange}
              >
                <MenuItem className="usaStates" value="USA States">USA States</MenuItem>
                {countries.map((country, index) => (
                  <MenuItem key={index} value={country.value}>
                    {country.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="app-stats">
            <Infobox
              title="Coronavirus Cases"
              cases={prettyPrintStat(stateInfo.todayCases)}
              total={numeral(stateInfo.cases).format("0.0a")}
            />
            <Infobox
              title="Recovered"
              cases={prettyPrintStat(stateInfo.recovered)}
              isGreen
              total={numeral(stateInfo.recovered).format("0.0a")}
            />
            <Infobox
              title="Deaths"
              cases={prettyPrintStat(stateInfo.todayDeaths)}
              total={numeral(stateInfo.deaths).format("0.0a")}
            />
          </div>
          <Card className="app-right">
            <CardContent>
              <h3>Live cases by States</h3>
              <Table states={tableData} />
            </CardContent>
          </Card>
          <div className="barchart">
            <BarChart chartData={statesData} />
          </div>
        </SecondWrapper>
        <Info />
        <ThirdWrapper>
          <div className="footer-link">
            <Link to="#header" smooth>
              COVID-19 TRACKER
              <img className="covidtitle3" src={covidTitle2} alt="" />
            </Link>
          </div>
        </ThirdWrapper>
      </div>
    </BrowserRouter>
  );
}

export default App;

const FirstWrapper = styled.div`
  text-align: center;
  height: 40rem;
  font-family: "Montserrat";
  background-image: url(${img});
  background-size: 360%;
  a {
    display: inline-block;
    padding-top: 1rem;
    padding-left: 3rem;
    padding-right: -4rem;
    text-decoration: none;
    font-family: "Montserrat";
    font-size: 0.6rem;
    font-weight: 500;
    color: rgb(247, 205, 150);
    letter-spacing: 3px;
  }

  a:hover {
    color: #5de6a68c;
  }

  .USAGov {
    position: absolute;
    left: 28rem;
    top: 0.5rem;
    width: 1.8rem;
  }

  .covidtitle {
    width: 3rem;
  }

  h1 {
    display: flex;
    justify-content: center;
    font-size: 2.5rem;
    color: rgb(247, 205, 150);
    padding-top: 12rem;
    letter-spacing: 5px;
  }

  .tracker {
    margin-top: -12.5rem;
  }

  p {
    display: flex;
    text-align: center;
    font-size: 0.8rem;
    color: rgb(243, 237, 229);
    line-height: 1.1rem;
    margin-left: 2rem;
    margin-right: 3rem;
  }

  .covidtitle2 {
    margin-top: 3rem;
    margin-right: 3rem;
    height: 11rem;
    width: 8rem;
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  @media only screen and (min-width: 320px) and (max-width: 375px) {
    height: 46rem;
    background-size: 360%;
  }

  a {
    font-size: 0.6rem;
  }

  .USAGov {
    position: absolute;
    left: 20rem;
  }

  .tracker {
    margin-top: -12.5rem;
  }

  p {
    font-size: 0.7rem;
    line-height: 1rem;
  }

  .covidtitle2 {
    margin-top: 8rem;
    width: 9rem;
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  @media only screen and (min-width: 390px) and (max-width: 480px) {
    height: 46rem;
    background-size: 350%;
  }

  a {
    font-size: 0.7rem;
  }

  .USAGov {
    left: 21.3rem;
    width: 2rem;
  }

  p {
    font-size: 0.9rem;
    line-height: 1.3rem;
    margin-top: 0.5rem;
    margin-left: 2.5rem;
    margin-right: 3.5rem;
  }

  .covidtitle2 {
    margin-top: 8rem;
    margin-right: 3rem;
    height: 10rem;
    width: 12rem;
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  @media only screen and (min-width: 768px) {
    height: 46rem;
    background-size: 175%;
    text-align: center;

    a {
      padding-top: 1.2rem;
      padding-left: 3rem;
      padding-right: -4rem;
      font-size: 1rem;
    }

    .USAGov {
      left: 44rem;
      top: 0.7rem;
      width: 2.5rem;
    }

    .covidtitle {
      width: 4rem;
    }

    h1 {
      font-size: 3.5rem;
      padding-top: 12rem;
    }

    .tracker {
      margin-top: -12.5rem;
    }

    p {
      font-size: 1.1rem;
      line-height: 1.6rem;
      margin-left: 10.5rem;
      margin-right: 11rem;
    }

    .covidtitle2 {
      margin-top: 6.5rem;
      margin-right: 3rem;
      height: 10rem;
      width: 10rem;
      -webkit-transform: rotate(0deg);
      -moz-transform: rotate(0deg);
      -o-transform: rotate(0deg);
      -ms-transform: rotate(0deg);
      transform: rotate(0deg);
    }
  }
  @media only screen and (min-width: 1024px) {
    height: 40rem;
    background-size: 115%;

    a {
      padding-top: 1.7rem;
      padding-left: 3rem;
      padding-right: -4rem;
      font-size: 1.2rem;
      letter-spacing: 3px;
    }

    .USAGov {
      left: 59rem;
      top: 0.8rem;
      width: 3.5rem;
    }

    .covidtitle {
      width: 6rem;
    }

    h1 {
      display: flex;
      justify-content: flex-start;
      font-size: 4.5rem;
      padding-top: 13rem;
      margin-left: 3rem;
      letter-spacing: 5px;
    }

    .tracker {
      margin-top: -13.5rem;
    }

    p {
      display: flex;
      text-align: left;
      font-size: 1rem;
      line-height: 1.5rem;
      margin-left: 3rem;
      margin-right: 32rem;
      margin-top: 0rem;
    }

    .covidtitle2 {
      width: 0rem;
      -webkit-transform: rotate(180deg);
      -moz-transform: rotate(180deg);
      -o-transform: rotate(180deg);
      -ms-transform: rotate(180deg);
      transform: rotate(180deg);
    }
  }
  @media only screen and (min-width: 1366px) {
    height: 40rem;
    background-size: 100%;

    a {
      padding-top: 1.7rem;
      padding-left: 3rem;
      padding-right: -4rem;
      font-size: 1.2rem;
      font-weight: 500;
      letter-spacing: 3px;
    }

    .USAGov {
      left: 79rem;
      top: 1rem;
      width: 3.7rem;
    }

    .covidtitle {
      width: 6.5rem;
    }

    h1 {
      font-size: 4.7rem;
      padding-top: 13rem;
      margin-left: 3rem;
      letter-spacing: 5px;
    }

    p {
      line-height: 1.5rem;
      margin-left: 3rem;
      margin-right: 50rem;
    }

    .covidtitle2 {
      width: 0rem;
      -webkit-transform: rotate(180deg);
      -moz-transform: rotate(180deg);
      -o-transform: rotate(180deg);
      -ms-transform: rotate(180deg);
      transform: rotate(180deg);
    }
  }
`;

const SecondWrapper = styled.div`
  .tracker2 {
    display: flex;
    justify-content: center;
    font-size: 2.5rem;
    font-family: "Montserrat";
    color: rgb(247, 196, 130);
    margin-top: 2.5rem;
    letter-spacing: 5px;
  }

  .app-dropdown {
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin-top: 2rem;
    margin-right: 3rem;
    margin-left: 3rem;
    padding: 1.5rem;
  }

  .formcontrol {
    background-color: rgb(248, 245, 245);
    border-radius: 1.5rem;
  }

  .app-stats {
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin-right: 1rem;
    margin-left: 1rem;
  }

  .app-right {
    background-color: black;
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin-right: 2.5rem;
    margin-left: 2.5rem;
    margin-top: 20rem;
    border: 3px solid rgb(247, 205, 150);
    border-radius: 2rem;
  }

  h3 {
    font-family: "Montserrat";
    color: white;
    font-weight: 400;
    letter-spacing: 1px;
    text-align: center;
  }

  .barchart {
    width: 26.5rem;
    margin-top: -40rem;
    margin-left: 1rem;
    margin-right: 1rem;
  }
  @media only screen and (min-width: 320px) and (max-width: 375px) {
    .formcontrol {
      margin-right: 1rem;
      margin-left: 1rem;
    }

    .barchart {
      width: 20.5rem;
    }
  }
  @media only screen and (min-width: 390px) and (max-width: 480px) {
    .tracker2 {
      font-size: 2.5rem;
      margin-top: 2.5rem;
    }

    .app-dropdown {
      margin-top: 2rem;
      margin-right: 3.7rem;
      margin-left: 3rem;
      padding: 1.5rem;
    }

    .formcontrol {
      margin-right: 1rem;
      margin-left: 1rem;
    }

    .app-stats {
      margin-right: 1rem;
      margin-left: 1rem;
    }

    .app-right {
      margin-right: 3.5rem;
      margin-left: 3.5rem;
      margin-top: 20rem;
    }

    .barchart {
      width: 90%;
      margin-top: -40rem;
      margin-left: 1rem;
      margin-right: 1rem;
    }
  }
  @media only screen and (min-width: 768px) {
    .tracker2 {
      font-size: 3rem;
      margin-top: 3.5rem;
    }

    .app-dropdown {
      margin-top: 2rem;
      margin-right: 6rem;
      margin-left: 6rem;
      padding: 1.5rem;
    }

    .app-right {
      margin-right: 3.5rem;
      margin-left: 3.5rem;
      margin-top: 38rem;
    }

    .barchart {
      width: 90%;
      margin-top: -55rem;
      margin-left: 1rem;
      margin-right: 1rem;
    }
  }
  @media only screen and (min-width: 1024px) {
    .tracker2 {
      font-size: 4.5rem;
      margin-top: 3rem;
    }

    .app-dropdown {
      display: flex;
      justify-content: center;
      margin-top: 1.5rem;
      padding: 2.5rem;
      margin-right: 20rem;
      margin-left: 20rem;
    }

    .app-stats {
      display: flex;
      justify-content: space-between;
      flex-direction: unset;
      margin-right: 5rem;
      margin-left: 5rem;
    }

    .app-right {
      display: flex;
      justify-content: flex-end;
      margin-right: 6rem;
      margin-left: 40rem;
      margin-top: 3rem;
    }

    .barchart {
      width: 50%;
      margin-top: -17rem;
      margin-left: 3rem;
    }
  }
  @media only screen and (min-width: 1366px) {
    .tracker2 {
      font-size: 4.7rem;
    }

    .app-dropdown {
      flex-direction: column;
      margin-top: 2rem;
      margin-right: 30rem;
      margin-left: 30rem;
      padding: 2rem;
    }

    .app-stats {
      margin-right: 5rem;
      margin-left: 5rem;
    }

    .app-right {
      margin-right: 6rem;
      margin-left: 59rem;
      margin-top: 3rem;
    }

    .barchart {
      width: 50%;
      margin-top: -23rem;
      margin-left: 5rem;
    }
  }
`;

const ThirdWrapper = styled.div`
  a {
    display: inline-block;
    padding-top: 1rem;
    padding-left: 3rem;
    padding-right: -4rem;
    text-decoration: none;
    font-family: "Montserrat";
    font-size: 0.6rem;
    font-weight: 500;
    color: rgb(247, 205, 150);
    letter-spacing: 3px;
  }

  a:hover {
    color: #5de6a68c;
  }
  .covidtitle3 {
    position: absolute;
    top: 170.8rem;
    left: 13.2rem;
    width: 4.5rem;
    height: 5rem;
    -webkit-transform: rotate(180deg);
    -moz-transform: rotate(180deg);
    -o-transform: rotate(180deg);
    -ms-transform: rotate(180deg);
    transform: rotate(180deg);
  }
  .footer-link {
    text-align: center;
    margin-top: 2rem;
    height: 7rem;
    margin-left: 3rem;
    margin-right: 6rem;
    margin-bottom: 0.5rem;
  }
  @media only screen and (min-width: 320px) and (max-width: 375px) {
    a {
      font-size: 0.6rem;
    }
    .covidtitle3 {
      top: 175.8rem;
      left: 8.6rem;
      width: 6rem;
      height: 5.5rem;
      -webkit-transform: rotate(180deg);
      -moz-transform: rotate(180deg);
      -o-transform: rotate(180deg);
      -ms-transform: rotate(180deg);
      transform: rotate(180deg);
    }
    .footer-link {
      height: 7.5rem;
      margin-top: 2rem;
    }
  }
  @media only screen and (min-width: 390px) and (max-width: 480px) {
    a {
      font-size: 0.7rem;
    }
    .covidtitle3 {
      top: 179.8rem;
      left: 8.2rem;
      width: 8rem;
      height: 3.5rem;
      -webkit-transform: rotate(180deg);
      -moz-transform: rotate(180deg);
      -o-transform: rotate(180deg);
      -ms-transform: rotate(180deg);
      transform: rotate(180deg);
    }
    .footer-link {
      height: 7.5rem;
      margin-left: 3rem;
      margin-right: 6rem;
      margin-top: 2rem;
      margin-bottom: 0.5rem;
    }
  }
  @media only screen and (min-width: 768px) {
    a {
      padding-top: 1.2rem;
      padding-left: 3rem;
      padding-right: -4rem;
      font-size: 1rem;
    }
    .covidtitle3 {
      top: 219rem;
      left: 20.5rem;
      width: 7.5rem;
      height: 4rem;
      -webkit-transform: rotate(180deg);
      -moz-transform: rotate(180deg);
      -o-transform: rotate(180deg);
      -ms-transform: rotate(180deg);
      transform: rotate(180deg);
    }
    .footer-link {
      height: 7.5rem;
      margin-left: 3rem;
      margin-right: 6rem;
      margin-top: 2rem;
      margin-bottom: 0.5rem;
    }
  }
  @media only screen and (min-width: 1024px) {
    a {
      padding-top: 1.7rem;
      padding-left: 3rem;
      padding-right: -4rem;
      font-size: 1.2rem;
      letter-spacing: 3px;
    }
    .covidtitle3 {
      top: 132.2rem;
      left: 39rem;
      width: 3rem;
      -webkit-transform: rotate(180deg);
      -moz-transform: rotate(180deg);
      -o-transform: rotate(180deg);
      -ms-transform: rotate(180deg);
      transform: rotate(180deg);
    }
    .footer-link {
      margin-top: 1rem;
      height: 5rem;
    }
  }
  @media only screen and (min-width: 1366px) {
    a {
      padding-top: 1.7rem;
      padding-left: 3rem;
      padding-right: -4rem;
      font-size: 1.2rem;
      font-weight: 500;
      letter-spacing: 3px;
    }
    .covidtitle3 {
      top: 142.5rem;
      width: 3rem;
      left: 49.7rem;
      -webkit-transform: rotate(180deg);
      -moz-transform: rotate(180deg);
      -o-transform: rotate(180deg);
      -ms-transform: rotate(180deg);
      transform: rotate(180deg);
    }
    .footer-link {
      margin-top: 1.5rem;
    }
  }
`;
