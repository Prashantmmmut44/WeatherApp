import react, { useState } from "react";
import Axios from "axios"
import { Alert, Button, Form ,Card,ListGroup} from 'react-bootstrap';

const Tempapp = () => {
    const [CountryName, setCountryName] = useState("")
    const [CityName, setCityName] = useState("")
    const [Result, setResult] = useState("")
    const [Temp, setTemp] = useState()
    const [TempInCel, setTempInCel] = useState()
    const [MaxTemp, setMaxTemp] = useState()
    const [MinTemp, setMinTemp] = useState()
    function fToC(fahrenheit) 
{
  const fTemp = fahrenheit;
  const fToCel = (fTemp - 32) * 5 / 9;
  const message = `${fTemp}\xB0F is ${fToCel}\xB0C.`;
    setTempInCel(fToCel)
} 
    const clickOnButton = ()=>{
        console.log("CountryName CityName",CountryName,CityName)
    
    var options = {
        method: 'GET',
        url: 'https://community-open-weather-map.p.rapidapi.com/weather',
        params: {
          q: CityName+","+CountryName,
          lat: '0',
          lon: '0',
          callback: '',
          id: '2172797',
          lang: 'null',
          units: 'imperial',
          mode: ''
        },
        headers: {
          'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
          'x-rapidapi-key': '36d7b52c22msh35eb92554b410b1p17343djsn869f6b564e1b'
        }
      };
      
      Axios.request(options).then(function (response) {
          console.log(response.data)
          setResult(response.data.weather[0].description);
            fToC(response.data.main.temp)
          setTemp(response.data.main.temp)
          setMaxTemp(response.data.main.temp_max)
          setMinTemp(response.data.main.temp_min)
      }).catch(function (error) {
          console.error(error);
      });
    }

    return(
        <div style={{backgroundColor:"#33A1FF", height:"800px"}}>
        <center>
        <Alert variant="primary" style={{color:"red"}}>
       <h1>My Weather App</h1> 
  </Alert>
        <br></br><br/>
        <label><b>Input Country</b></label>
        <Form.Control size="lg" type="text" style={{width:"200px"}} placeholder="CountryName" onChange={(e)=>{
            setCountryName(e.target.value)
            setResult("")
            setTempInCel("")
            setTemp("")
            setMaxTemp("")
            setMinTemp("")
        }} />
        <br></br><br/>
        <label><b>Input City</b></label>
        <Form.Control size="lg" type="text" style={{width:"200px"}} placeholder="CityName"  onChange={(e)=>{
            setCityName(e.target.value)
            setResult("")
            setTempInCel("")
            setTemp("")
            setMaxTemp("")
            setMinTemp("")
        }}/>
          <br/>

        <Button  onClick={()=>{
            clickOnButton()
        }} >Click To submit</Button >
        <br /><br />
        </center>
        <center>
        <Card style={{ width: '18rem' }}>
  <ListGroup variant="flush">
    <ListGroup.Item><b>About Weather : {Result}</b></ListGroup.Item>
    <ListGroup.Item><b>Tempreature in Celcius : {TempInCel}</b></ListGroup.Item>
    <ListGroup.Item><b>Tempreature : {Temp}</b></ListGroup.Item>
    <ListGroup.Item><b>Max Tempreature : {MaxTemp}</b></ListGroup.Item>
    <ListGroup.Item><b>Min Tempreature : {MinTemp}</b></ListGroup.Item>
  </ListGroup>
</Card>
        </center>

        </div>

    )
}

export default Tempapp;