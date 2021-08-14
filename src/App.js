import React, { Component } from 'react'
import './App.css';
import Form from './components/Form';
import Weather from './components/Weather';


// http://api.openweathermap.org/data/2.5/weather?q=${city name},${country code}&appid=${API_key}
const API_KEY = 'b053756d16c6949f569d336506e8fcce'
class App extends Component {

    state = {
        temperature: '',
        city: '',
        country: '',
        humidity: '',
        description: '',
        error: '',
    }

    getWeather = async (e) => {
        e.preventDefault();
        const city = e.target.elements.city.value;
        const country = e.target.elements.country.value;
        const api = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}`)
        const data = await api.json();
        if(city&&country){
            this.setState({
                temperature: data.main.temp,
                city: data.name,
                country: data.sys.country,
                humidity: data.main.humidity,
                description: data.weather[0].description,
                error: '',
            })
        }else{
            this.setState({
                temperature: '',
                city: '',
                country: '',
                humidity: '',
                description: '',
                error: 'Please enter correct data',
            })
        }

    }
    render() {
        return (
            <div className="wrapper">
                <div className="form-container">
                    <Form getWeather={this.getWeather}/>
                    <Weather
                        temperature= {this.state.temperature}
                        city= {this.state.city}
                        country= {this.state.country}
                        humidity= {this.state.humidity}
                        description= {this.state.description}
                        error= {this.state.error}
                    />
                </div>
            </div>
        );
    }
}

export default App;
