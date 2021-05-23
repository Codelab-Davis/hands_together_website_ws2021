import react, { useEffect, useState } from "react"; 
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/programs.css";
import img1 from "../images/programs_1.png";
import img2 from "../images/programs_2.png";
import img3 from "../images/programs_3.png";
import img4 from "../images/programs_4.png";
import img5 from "../images/programs_5.png";
import img6 from "../images/programs_6.png";
import img7 from "../images/programs_7.png";

function Programs() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 769 ? true : false); 

  useEffect(() => { 
      function handleResize() { 
        setIsMobile(window.innerWidth < 769 ? true : false); 
      } 

      window.addEventListener('resize', handleResize); 
  }); 

  return(
    <div>
      <div className="container-fluid p-0">
        {/* <div className="col-12" style={{padding: "0"}}>
          <h1 className="header-text">Our Programs</h1>
        </div>

        <div className="row container-padding">
          <div className="col-md-6 side-info infoblurb" style={{padding: "0"}}>
            <h2>Preschool</h2>
            The preschool curriculum at Hands Together emphasizes English literacy, reading and math readiness skills.<br/><br/>
            Our services encompass:
            <ul>
              <li>Quality preschool and day care</li>
              <li>English literacy, reading, and math readiness curriculum</li>
              <li>Health and developmental screenings</li>
            </ul>
          </div> 
          <div className="col-md-6 img-container" style={{padding: "0"}}>
            <img src={img1} className="about-img"/>
          </div>
        </div>  */}

        <div className="container-padding">
            <h1 className="header-text">About Us</h1>
            <div className="row no-gutters">
                <div className="col-md-6 side-info infoblurb" style={{padding: "0"}}> 
                <h2 style={{fontWeight: "700"}}>Preschool</h2>
                The preschool curriculum at Hands Together emphasizes English literacy, reading and math readiness skills.<br/><br/>
                Our services encompass:
                <ul>
                  <li>Quality preschool and day care</li>
                  <li>English literacy, reading, and math readiness curriculum</li>
                  <li>Health and developmental screenings</li>
                </ul>
                </div> 
                <div className="col-md-6 img-container" style={{padding: "0"}}>
                    <img src={img1} className="about-img"/>
                </div>
            </div>
        </div>


        <div className="col-12 img-section">
          <img src={img2} className="full-width-image"/>
          <h2 className="overlay-text">
            Advanced early childhood education promotes academic achievement, higher high school graduation rates, and has been proven to ensure children reach their full potential.
            <br/><br/>Hands Together’s enriched program brings hope and opportunity to central Orange County’s young learners and their families.
          </h2>
        </div>
        
        <div className="container-padding">
          <div className="row no-gutters">
              <div className="col-md-6 side-info infoblurb" style={{padding: "0"}}>
                <h2 style={{fontWeight: "700"}}>Morning Garden</h2> 
                The Morning Garden program also provides parents of preschool-aged children with life skills training and vocational classes.
                <br/><br/>Our goals are to assist parents experiencing housing insecurity by improving their ability to enter the workforce, while providing a quality early childhood education to their preschool-aged children.
              </div> 
              <div className="col-md-6 img-container" style={{padding: "0"}}>
                  <img src={img3} className="about-img"/>
              </div>
          </div>
        </div> 

        {/* <div className="col-md-6 side-info">
          <h2>Morning Garden</h2>
          <h3>
            The Morning Garden program also provides parents of preschool-aged children with life skills training and vocational classes.
            <br/><br/>Our goals are to assist parents experiencing housing insecurity by improving their ability to enter the workforce, while providing a quality early childhood education to their preschool-aged children.
          </h3>
        </div>
        <div className="col-md-6 small-img-container">
          <img src={img3}/>
        </div> */}

        <div className="col-12 img-section">
          <img src={img4} className="full-width-image"/>
          <h2 className="overlay-text">
            Morning Garden’s parent programs focus on financial literacy, interview skills, resume preparation and GED acquisition. We also teach nutrition and low-cost meal preparation.
            <br/><br/>All these components support the personal and professional development of low-income families. Our program recognizes the potential for success in all people, including parents experiencing housing insecurity.
          </h2>
        </div>

        <div className="col-12 row no-gutters tri-image">
          <div className="col-md-4 crop-img" style={{backgroundImage: `url(${img5})`}}></div>
          <div className="col-md-4 crop-img" style={{backgroundImage: `url(${img6})`}}></div>
          <div className="col-md-4 crop-img" style={{backgroundImage: `url(${img7})`}}></div>
        </div>

        <div className="col-12 bottom-info">
          <p>
            Hands Together is a 501(c)(3) nonprofit early childhood education and child development program offering comprehensive preschool services. We welcome community support, and accept subsidized programs from the U.S. military, Orange County Department of Education, Orange County Social Services Agencies and Children’s Home Society.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Programs;