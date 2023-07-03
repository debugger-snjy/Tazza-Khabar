import React, { Component } from 'react'
import Loading from "./loading_gif.gif"
export class Spinner extends Component {
    render() {
        return (
            <div className='container text-center align-middle' style={{marginTop : "10vh", marginBottom : "100px"}}>
                <img src={Loading} alt="" height={"100px"} style={{filter:"invert(1)"}}/>
            </div>
        )
    }
}

export default Spinner
