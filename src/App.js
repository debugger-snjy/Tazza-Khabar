import React, { Component } from 'react'
import NavBar from './Components/NavBar'
import News from './Components/News'

import { Route, Routes } from "react-router-dom";
import HomePage from './Components/HomePage';

// Importing the Top Loading Bar
import LoadingBar from 'react-top-loading-bar'
// TODO : Visit this Link to more about Top Loading Bar : https://www.npmjs.com/package/react-top-loading-bar

export class App extends Component {

    // Getting the API Key
    apiKey = process.env.REACT_APP_NEWS_API;
    // Also after doing this, restart the development server

    constructor(props) {
        super(props);
        this.state = {
            country: 'in',
            progress: 10,
        };
        console.log(this.state.progress)
    }


    setCountry = () => {
        let countryName = document.getElementById("countryMenu").value;
        this.setState({ country: countryName })
        console.log("Country Changed !!")
        console.log(this.state.country)
    }

    // Now Setting the progress for the loading bar
    // Using the states

    // Also, to use the this.setProgress below, we have to make the function as Arrow Function
    setProgress = (newProgress) => {
        console.log(newProgress);
        this.setState({ progress: newProgress })
        console.log(this.state.progress)

    }

    render() {
        return (
            <div>
                {/* Adding the Navigation Bar */}
                <NavBar updateCountry={this.setCountry} />

                <LoadingBar
                    color='#d1342c'
                    height={3.5}

                    progress={this.state.progress}
                    onLoaderFinished={() => this.setProgress(100)}
                />

                {/* Adding the route */}
                <Routes>
                    {/* As we can see that, the links are working & the are also changing in the address bar */}
                    {/* But the news didn't changes. For That we have to reload the page. so to remove this */}
                    {/* We will be using the key attribute, it is like a unique value to the element and it will remove the need of reloading the page again */}

                    {/* We have passed the setProgress function to the Components and will change them according to their work do */}
                    <Route exact path='/' element={<HomePage changeProgress={this.setProgress} />} />
                    <Route exact path='/all' element={<News apiKey={this.apiKey} changeProgress={this.setProgress} key={"all"} country={this.state.country} category="all" />} />
                    <Route exact path='/business' element={<News apiKey={this.apiKey} changeProgress={this.setProgress} key={"business"} country={this.state.country} category="business" />} />
                    <Route exact path='/entertainment' element={<News apiKey={this.apiKey} changeProgress={this.setProgress} key={"entertainment"} country={this.state.country} category="entertainment" />} />
                    <Route exact path='/general' element={<News apiKey={this.apiKey} changeProgress={this.setProgress} key={"general"} country={this.state.country} category="general" />} />
                    <Route exact path='/health' element={<News apiKey={this.apiKey} changeProgress={this.setProgress} key={"health"} country={this.state.country} category="health" />} />
                    <Route exact path='/science' element={<News apiKey={this.apiKey} changeProgress={this.setProgress} key={"science"} country={this.state.country} category="science" />} />
                    <Route exact path='/sports' element={<News apiKey={this.apiKey} changeProgress={this.setProgress} key={"sports"} country={this.state.country} category="sports" />} />
                    <Route exact path='/technology' element={<News apiKey={this.apiKey} changeProgress={this.setProgress} key={"technology"} country={this.state.country} category="technology" />} />
                    {/* <Route exact path='/about' element={<News key={"about"} country={this.state.country} category="about" />} /> */}
                </Routes>
            </div>
        )
    }
}

export default App
