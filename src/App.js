import React from 'react';

import { Cards, Chart, CountryPicker} from './components';
import styles from './App.module.css';
import {fetchData} from './api';
import image from './images/image.png';
import { FaGithub } from "react-icons/fa";

class App extends React.Component{
    btnClick() {
        window.open("https://github.com/jilpatel13");
    }
state={
    data: {},
    country: '',
}
    async componentDidMount(){
        const fetchedData = await fetchData();

        this.setState({ data: fetchedData });
    }

handleCountryChange = async (country) => {

    const fetchedData = await fetchData(country);

    this.setState({ data: fetchedData,country: country });
}

    render(){
        const { data,country } = this.state;
        
        return(
            <div className={styles.container}>
                <img className={styles.image} src={image} alt="COVID-19" />
                <FaGithub className={styles.github} size='3rem' cssClass='e-link' onClick={this.btnClick.bind(this)}/>
                <Cards data={data}/>
                <CountryPicker handleCountryChange={this.handleCountryChange} />
                <Chart data={data} country={country}/>
            </div>
        );
    }
}

export default App;