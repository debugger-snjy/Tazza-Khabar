import React, { Component } from 'react'

export class NewsItem extends Component {

    render() {

        // For props : 
        // Array Destructuring
        let { title, description, author, imageURL, newsURL, fullDateTime, newsSource } = this.props;

        let openNewsUrl = () => {
            window.open(newsURL, '_blank', 'noopener,noreferrer');
        }

        let openNewsImage = () => {
            window.open(imageURL, '_blank', 'noopener,noreferrer');
            // console.log(imageURL)
        }

        let noNews = "https://secondary.oslis.org/secondary/learn-to-research/plan/plan-possible-sources/images-for-plan-possible-sources/newspaper/@@images/image.jpeg"

        if (imageURL === null || imageURL === "") {
            // console.log("Image Null")
            imageURL = noNews;
        }

        return (
            <div>
                <div className="card">
                    {<img src={imageURL} className="card-img-top" alt=" Loading . . . " height={"235px"} onClick={openNewsImage} />}

                    <span className="position-absolute badge rounded-bottom-pill bg-danger newsSourceBadge" style={{right: "2px",paddingLeft:"20px",paddingRight:"20px"}} onClick={()=>{window.open(`https://www.google.com/search?q=${newsSource.split(" ").join("+")}`,"_blank",'noopener,noreferrer');}}>
                        <big>{newsSource}</big>
                    </span>

                    <div className="card-body">
                        <h5 className="card-title" onClick={openNewsUrl}><strong>{title}</strong></h5>
                        <p className="card-text">{description === null ? "" : description.length > 80 ? description.slice(0, 80) + "..." : description}</p>
                        {/* <a href={newsURL} target='_blank' rel='noreferrer' className="btn btn-sm btn-primary">Read More</a> */}
                    </div>
                    <div className="card-footer text-body-secondary">
                        <small className='text-muted'><strong>By {author === "" ? "Unknown" : author} on {new Date(fullDateTime).toUTCString()}</strong></small>
                    </div>

                </div>
            </div>
        )
    }
}

export default NewsItem