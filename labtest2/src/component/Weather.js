import React, { Component } from 'react'
import axios from 'axios'
import "bootstrap/dist/css/bootstrap.min.css";
import './Weather.css'


export default class Weather extends Component {
    constructor(props) {
        super(props)
        this.state = {
            weatherInfo: {},
            weatherInfo_5days: [],
            date: null,
            dayOfWeek: null
        }
    }

    componentDidMount() {
        this.getWeatherInfo();
        this.getFiveDaysWeather();
    }

    getWeatherInfo = async () => {
        try {
            var res = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=Toronto&appid=604e8355f62cb6e7e873e9ea52376932&units=metric`)

            const date = new Date()
            const dateStr = date.toDateString().slice(4)
            const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const dayOfWeek = daysOfWeek[date.getDay()];

            this.setState({
                ...this.state,
                weatherInfo: res.data,
                date: dateStr,
                dayOfWeek: dayOfWeek
            })
        } catch (error) {
            console.log(error)
        }
    }

    getFiveDaysWeather = async () => {
        try {
            var res_5days = await axios.get('http://api.openweathermap.org/data/2.5/forecast?q=Toronto&cnt=5&appid=604e8355f62cb6e7e873e9ea52376932&units=metric')
            console.log(res_5days.data.list);
            res_5days = res_5days.data.list;
            this.setState({
                ...this.state,
                weatherInfo_5days: res_5days
            })
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        const { main, weather, wind } = this.state.weatherInfo;
        const forecastList = this.state.weatherInfo_5days || [];

        return (
        <div id="row" class="container text-center, border border-secondary">
            <div class="row">
                <div id="col1" class="col-sm-3">
                    <h2>{this.state.dateStr}</h2>
                    <h2>{this.state.dayOfWeek}</h2>
                    <h3>{this.state.date}</h3>
                    <h3>{this.state.weatherInfo.name}</h3>
                    {weather && <img src={`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`} alt="clear sky"></img>}
                    {main && (<h1>{main.temp} °C</h1>)}
                    {weather && (<h3>{weather[0].main} </h3>)}
                </div>

                <div class="col-sm-9">
                    <div class="row">
                        <div class="col-8 col-sm-6" id="today-left">
                            <h3>WIND</h3>
                            <h3>HUMIDITY</h3>
                            <h3>AIR PRESSURE</h3>
                            <h3>MAX TEMP</h3>
                            <h3>MIN TEMP</h3>
                        </div>
                        <div class="col-4 col-sm-6" id="today-right">
                            {wind && (<h3>{wind.speed} km/h</h3>)}
                            {main && (<h3>{main.humidity} %</h3>)}      
                            {main && (<h3>{main.pressure} mb</h3>)}         
                            {main && (<h3>{main.temp_max} °C</h3>)}           
                            {main && (<h3>{main.temp_min} °C</h3>)}
                        </div> 
                    </div>
 
                    <div class="row" id="forecastPart">
                        <div class="col-8 col-sm-6">
                            <p>Forecast</p>
                                <div id="forecast">
                                    {forecastList?.map((forecast, index) => (
                                        <div key={index} id="day">
                                        <p>{forecast.dt_txt.slice(5, 10)}</p>
                                        <p>{forecast.main.temp} °C</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
