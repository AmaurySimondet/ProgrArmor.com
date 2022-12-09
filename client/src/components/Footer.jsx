import { React, useState, useEffect, useRef } from "react";

function Footer(props) {
    // const [dimensions, setDimensions] = useState({
    //     height: window.innerHeight,
    //     width: window.innerWidth
    // })


    // useEffect(() => {
    //     function handleResize() {
    //         setDimensions({
    //             height: window.innerHeight,
    //             width: window.innerWidth
    //         })
    //     }

    //     var timeout = false;
    //     window.addEventListener('resize', function () {
    //         clearTimeout(timeout);;
    //         timeout = setTimeout(handleResize, 200);
    //     });
    // })

    // const boxRef = useRef();

    // // X
    // const [x, setX] = useState();

    // // Y
    // const [y, setY] = useState();

    // // This function calculate X and Y
    // const getPosition = () => {
    //     const x = boxRef.current.offsetLeft;
    //     setX(x);

    //     const y = boxRef.current.offsetTop;
    //     setY(y);
    // };

    // // Get the position of the red box in the beginning
    // useEffect(() => {
    //     getPosition();
    // }, []);

    // // Re-calculate X and Y of the red box when the window is resized by the user
    // useEffect(() => {
    //     window.addEventListener("resize", getPosition);
    // }, []);

    return (

        <div>

            {/* {y < dimensions.height - 50 ? <div style={{ height: "" + dimensions.height - y + 50 + "px" }}></div> : null}

            {props.warnref ? <div style={{ height: "" + props.warnref + "px" }}></div> : null} */}

            <footer className="footer footer-black">

                <a href="https://twitter.com/ProgrArmor"><img className="social" src={require('../images/icons/twitter.webp')} alt='twitter' /></a>

                <a href="https://www.instagram.com/prograrmor/"><img className="social" src={require('../images/icons/instagram.webp')} alt='instagram' /></a>

                <a href="https://www.facebook.com/profile.php?id=100087568835793"><img className="social" src={require('../images/icons/facebook.webp')} alt='facebook' /></a>

                <a href="https://discord.gg/Gj98SjG8"><img className="social" src={require('../images/icons/discord.webp')} alt='discord' /></a>

                <a href="https://www.tiktok.com/@prograrmor"><img className="social" src={require('../images/icons/tiktok.webp')} alt='tiktok' /></a>

                <a href="https://www.youtube.com/@prograrmor"><img className="social" src={require('../images/icons/youtube.webp')} alt='youtube' /></a>

            </footer>

        </div>
    )
}

export default Footer;