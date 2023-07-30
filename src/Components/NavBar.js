// rcep --> Gives class component with prop-types
import React, { Component } from 'react'

// Importing the link tag from the react-router-dom
import { Link } from 'react-router-dom';

export class NavBar extends Component {

    render() {

        const fixednavbarStyle = {
            "position": "sticky",
            "top": "0",
            "width": "100%",
            "zIndex": "1",
            "boxShadow" : "0px 0px 9px 5px black",
        }

        return (
            <div style={fixednavbarStyle}>
                <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/">Tazza Khabar</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        {/* To handle it we have to add react router */}
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link" aria-current="page" to="/all">All</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" aria-current="page" to="/business">Business</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" aria-current="page" to="/entertainment">Entertainment</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" aria-current="page" to="/general">General</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" aria-current="page" to="/health">Health</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" aria-current="page" to="/science">Science</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" aria-current="page" to="/sports">Sports</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" aria-current="page" to="/technology">Technology</Link>
                                </li>
                            </ul>
                            <form className="d-flex">
                                <span className='text-white' style={{ marginRight: "10px" }}>Country : </span>
                                <select name="" id="countryMenu" onChange={this.props.updateCountry} defaultValue={"in"}>
                                    <option value="ar">Argentina</option>
                                    <option value="au">Australia</option>
                                    <option value="at">Austria</option>
                                    <option value="be">Belgium</option>
                                    <option value="br">Brazil</option>
                                    <option value="bg">Bulgaria</option>
                                    <option value="ca">Canada</option>
                                    <option value="cn">China</option>
                                    <option value="co">Colombia</option>
                                    <option value="cu">Cuba</option>
                                    <option value="cz">Czech Republic</option>
                                    <option value="eg">Egypt</option>
                                    <option value="fr">France</option>
                                    <option value="de">Germany</option>
                                    <option value="gr">Greece</option>
                                    <option value="hk">Hong Kong</option>
                                    <option value="hu">Hungary</option>
                                    <option value="in">India</option>
                                    <option value="id">Indonesia</option>
                                    <option value="ie">Ireland</option>
                                    <option value="il">Israel</option>
                                    <option value="it">Italy</option>
                                    <option value="jp">Japan</option>
                                    <option value="lv">Latvia</option>
                                    <option value="lt">Lithuania</option>
                                    <option value="my">Malaysia</option>
                                    <option value="mx">Mexico</option>
                                    <option value="ma">Morocco</option>
                                    <option value="nl">Netherlands</option>
                                    <option value="nz">New Zealand</option>
                                    <option value="ng">Nigeria</option>
                                    <option value="no">Norway</option>
                                    <option value="ph">Philippines</option>
                                    <option value="pl">Poland</option>
                                    <option value="pt">Portugal</option>
                                    <option value="ro">Romania</option>
                                    <option value="ru">Russia</option>
                                    <option value="sa">Saudi Arabia</option>
                                    <option value="rs">Serbia</option>
                                    <option value="sg">Singapore</option>
                                    <option value="sk">Slovakia</option>
                                    <option value="si">Slovenia</option>
                                    <option value="za">South Africa</option>
                                    <option value="kr">South Korea</option>
                                    <option value="se">Sweden</option>
                                    <option value="ch">Switzerland</option>
                                    <option value="tw">Taiwan</option>
                                    <option value="th">Thailand</option>
                                    <option value="tr">Turkey</option>
                                    <option value="ae">UAE</option>
                                    <option value="ua">Ukraine</option>
                                    <option value="gb">United Kingdom</option>
                                    <option value="us">United States</option>
                                </select>
                            </form>
                        </div>
                    </div>
                </nav>
            </div >
        )
    }
}

export default NavBar
