import React, { Component } from 'react'
import NewsItem from './NewsItem'
import { Spinner } from "./Spinner";
import PropTypes from 'prop-types'

// Importing the Infinte scroll components
import InfiniteScroll from "react-infinite-scroll-component";

// Instead of defining the API KEY in the code itself, we will provide that API Key in the .env.local file
// Now, we will get the API Key from the props
// let myAPIKey = this.props.apiKey;
// let myAPIKey = "4d381142bc154c4aae111c608a8d0384";

// #35
// Nowadays, the modern websites don't have the next and previous buttons
// They have infinite Scrolling i.e, they will keep adding the items on scrolling to the end
// Eg : Youtube, it will have n number of videos and will keep loading till the end

// We can create the infinte loading using 2 ways : 
// 1. By our own Code : using intersection observer 
//    - For more visit : https://javascript.plainenglish.io/how-to-implement-infinite-scrolling-with-intersection-observer-api-9f2bc9ad8662
//                       https://dev.to/hey_yogini/infinite-scrolling-in-react-with-intersection-observer-22fh
//                       https://medium.com/@ogbopinamoses/how-to-implement-infinite-scroll-in-a-react-app-using-the-intersection-observer-api-3d8b3d88629b

// 2. By using the infinite-scroll npm package

// We are going with the infinte-scroll package as it will be easier to use

// Step 1 : Install 
// For that, npm i react-infinite-scroll-component

// Step 2 : Going from and throught the Example


export class News extends Component {


    static propTypes = {
        country: PropTypes.string,
        category: PropTypes.string,
    }

    currentPage = 1;
    newPageSize = 6;

    constructor() {

        // We need to call a special function called super()
        super();
        // if we not call the super() function, then it will cause error

        console.log("I am Component from News Component")

        // Setting the state :
        // This is the wrong way to set the states in mounted component but we can initialize them in this way
        this.state = {
            articles: [],
            loading: false,
            totalResults: 0,
            totalPages: 0,
            pagelist: [],
            page: 1,
        }

        // Correct way to set the state in mounted component
        // this.setState({
        //     articles: this.articles,
        //     loading: false
        // });

        // NOTE : 
        // We use the states when we change the data/other things again and again without reloading
        // and We use props when we want to pass the things from one component to another
        // props are read only
        // Also Props can be used to change the state by passing the state but we can never change the props
    }


    // Function to enable Loading, Fetching the Data and Update the Data
    load_fetch_update(pageNumber) {

        this.props.changeProgress(20)

        // Fetching the Data From the URL using the fetch function
        let requestURL = new Request(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&${this.myCategory}apiKey=${this.props.apiKey}&page=${pageNumber}&pageSize=${this.newPageSize}`);

        this.props.changeProgress(40)

        // making the loading start while it fetch the data
        this.setState({ loading: true })

        fetch(requestURL).then(async (response) => {
            if (response.status === 200) {
                this.props.changeProgress(50)
                return response.json();

            } else {
                throw new Error("Something went wrong on API server!");
            }
        }).then((response) => {
            console.debug(response);
            let newsData = response;
            console.log(newsData)
            this.props.changeProgress(70)


            // making the loading stop after it fetch the data
            let Pages = [];

            for (let i = 1; i <= Math.ceil(newsData["totalResults"] / this.newPageSize); i++) {
                Pages.push(i)
            }
            console.log(Pages)

            // Stopping the Loading as we have got the results
            this.props.changeProgress(85)
            this.setState({
                articles: newsData["articles"],
                loading: false,
                totalPages: Math.ceil(newsData["totalResults"] / this.newPageSize),
                pagelist: Pages,
                totalResults: newsData["totalResults"],
                page: this.state.page + 1,
            })
            this.props.changeProgress(100)

        }).catch((error) => {
            console.error(error);
        });
    }


    // It is a lifecycle function that will start working after the render function
    // It will start when all the things get rendered
    componentDidMount = async () => {
        console.log("It is a componentDidMount method");
        this.load_fetch_update(this.state.page);
    }

    // Function to handle the Next Click Button
    handleNextClick = async () => {
        console.log("Total Pages : ", this.state.totalPages);
        if (!document.getElementById("nextBtn").disabled) {
            console.log("Next Button is Clicked !")
            this.currentPage++;
            this.load_fetch_update(this.currentPage);
        }
    }

    // Function to handle the Previous Click Button
    handlePrevClick = async () => {
        if (!document.getElementById("prevBtn").disabled) {
            console.log("Previous Button is Clicked !")
            this.currentPage--;
            this.load_fetch_update(this.currentPage);
        }
    }

    // Function to handle the page size :
    updatePageSize = () => {
        this.newPageSize = document.getElementById("pageSizeChanger").value;
        this.currentPage = 1;
        console.log("Size of Page is " + this.newPageSize)
        this.load_fetch_update(this.currentPage);
    }

    // Function to handle the page number and show results accordingly
    updatePageNumber = (page) => {
        console.log(page);
        this.currentPage = page;
        this.load_fetch_update(page);
    }

    // Fetch More function to get the infinte scroll
    fetchMoreData = () => {
        this.setState({
            page: this.state.page + 1,
        });

        // Fetching the Data From the URL using the fetch function
        let requestURL = new Request(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&${this.myCategory}apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.newPageSize}`);

        // making the loading start while it fetch the data
        this.setState({ loading: true })

        fetch(requestURL).then((response) => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error("Something went wrong on API server!");
            }
        }).then((response) => {
            console.debug(response);
            let newsData = response;
            console.log(newsData)

            // making the loading stop after it fetch the data
            let Pages = [];

            for (let i = 1; i <= Math.ceil(newsData["totalResults"] / this.newPageSize); i++) {
                Pages.push(i)
            }
            console.log(Pages)

            // Stopping the Loading as we have got the results
            this.setState({
                articles: this.state.articles.concat(newsData["articles"]),
                loading: false,
                totalPages: Math.ceil(newsData["totalResults"] / this.newPageSize),
                pagelist: Pages,
                totalResults: newsData["totalResults"]
            })
        }).catch((error) => {
            console.error(error);
        })
    };

    myCategory = "";

    render() {
        console.log("It is a render method/function");
        console.log("Country : " + this.props.country)

        if (this.props.category !== "all") {
            this.myCategory = `category=${this.props.category}&`;
        }

        return (
            <div className='container my-3'>
                {/* This is a News Component and it contains news Items */}

                <div className="container d-flex justify-content-around align-items-end">

                    {/* No need of Previous Button, as we have infinite scroll */}
                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill={this.currentPage === 1 ? "grey" : "white"} onClick={this.handlePrevClick} className="bi bi-caret-left-fill" viewBox="0 0 16 16">
                        <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
                    </svg> */}

                    <h2 className='text-center text-white'>Top Headlines - {this.props.category[0].toUpperCase()}{this.props.category.slice(1,)}</h2>
                    
                    {/* No need of Next Button, as we have infinite scroll */}
                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill={this.currentPage === this.state.totalPages ? "grey" : "white"} onClick={this.handleNextClick} className="bi bi-caret-right-fill" viewBox="0 0 16 16">
                        <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                    </svg> */}
                </div>

                <hr color='white' style={{ height: "2px", background: "white", opacity: "0.75" }} />

                {/* <div className="container text-center text-white">
                    <hr color='white' style={{ height: "2px", background: "white", opacity: "0.75" }} />
                    <strong>Number of News in one Page :
                        <select className="form-select d-inline mx-1" id='pageSizeChanger' onChange={this.updatePageSize} defaultValue={21} style={{ width: "30%" }}>
                            <option value="12">12</option>
                            <option value="15">15</option>
                            <option value="18">18</option>
                            <option value="21">21</option>
                            <option value="24">24</option>
                            <option value="27">27</option>
                            <option value="30">30</option>
                            <option value="33">33</option>
                            <option value="36">36</option>
                            <option value="39">39</option>
                            <option value="42">42</option>
                            <option value="45">45</option>
                            <option value="48">48</option>
                            <option value="51">51</option>
                            <option value="54">54</option>
                            <option value="57">57</option>
                            <option value="60">60</option>
                            <option value="63">63</option>
                            <option value="66">66</option>
                            <option value="69">69</option>
                            <option value="72">72</option>
                            <option value="75">75</option>
                            <option value="78">78</option>
                            <option value="81">81</option>
                            <option value="84">84</option>
                            <option value="87">87</option>
                            <option value="90">90</option>
                            <option value="93">93</option>
                            <option value="96">96</option>
                            <option value="99">99</option>
                        </select>
                    </strong>
                    <hr color='white' style={{ height: "2px", background: "white", opacity: "0.75" }} />
                </div> */}

                {/* <Spinner/> */}

                {/* {this.state.loading && <Spinner />} */}

                {/* Adding the News Items */}

                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}

                    // Adding the Style of overflow as none to remove the horizontal bar in the end of the results
                    style={{ overflow: "none" }}
                >

                    <div className="row align-items-start my-3">

                        {/* Warning: Each child in a list should have a unique "key" prop. */}
                        {/* We get this warning and we have to set the key for each element*/}
                        {/* Also That Key should be unique */}
                        {/* Applying the key to remove the warning */}

                        {/* Now, For INFINTE SCROLLING, we don't need the loading for the elements */}
                        {/* So removing it */}

                        {/* {!(this.state.loading) && this.state.articles.map((element) => {
                            //TODO : Visit Link https://codesandbox.io/s/yk7637p62z?file=/src/index.js:672-844
                        */}

                        {this.state.articles.map((element) => {

                            // Pubishing Time and Date Manually
                            // let publishingDate = element.publishedAt.split("T")[0];
                            // let publishingTime = element.publishedAt.split("T")[1].replace('Z', '');
                            // let ampmNotation = (publishingTime.split(':') >= "12") ? 'PM' : 'AM';

                            return <div className="col-md-6 col-sm-12 col-lg-4 col-xl-4 my-3" key={element.url}>
                                {/* Fixing the title and description length */}
                                <NewsItem title={element.title} description={element.description === null ? "" : element.description.slice(0, 80) + " . . ."} fullDateTime={element.publishedAt} imageURL={element.urlToImage} newsURL={element.url} author={element.author === "" | element.author === null ? "" : element.author} newsSource={element.source.name} />
                            </div>
                        })}

                    </div>
                </InfiniteScroll>

                {/* As we are going for infinite scrolling so, we don't need pages number and next, prev buttons */}

                {/* <div className='d-flex justify-content-center my-2'>
                            {this.state.pagelist.map((element) => {
                                if (element === this.currentPage) {
                                    return <button className='btn btn-dark btn-sm mx-1 text-bg-primary' key={element} id={element} onClick={() => { this.updatePageNumber(element) }}><strong>{element}</strong></button>
                                }
                                return <button className='btn btn-dark btn-sm mx-1' key={element} id={element} onClick={() => { this.updatePageNumber(element) }}>{element}</button>
                            })}
                        </div> */}

                {/* Adding the Next and previous button */}
                {/* Hidding the Buttons if the loading is enabled */}
                {/* {!(this.state.loading) && <div className="container d-flex justify-content-between">
                            <button id="prevBtn" className='btn btn-primary' onClick={this.handlePrevClick} disabled={this.currentPage === 1}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
                                <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
                            </svg> Previous</button>

                            <button id="nextBtn" className='btn btn-primary' onClick={this.handleNextClick} disabled={this.currentPage === this.state.totalPages}>Next <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
                                <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                            </svg> </button>
                        </div>} */}

            </div>
        )
    }
}

export default News
