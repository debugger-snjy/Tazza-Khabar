import React, { Component } from 'react'

export class HomePage extends Component {
    constructor(props) {
        super(props)

        // Setting up the Progress bar to the point for the movement of progress bar
        this.props.changeProgress(50)

        setInterval(() => {
            this.props.changeProgress(100)
        }, 500);
    }
    render() {
        return (
            <div id='myHomePage'>
            </div>
        )
    }
}

export default HomePage
