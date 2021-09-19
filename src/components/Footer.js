import React, {Component} from "react";
import { RiSpaceShipFill } from "react-icons/ri"
import { AiFillGithub,  AiFillLinkedin} from "react-icons/all";
import styled from "styled-components";
import "./Footer.css";

export default function Footer() {
    const Header = styled.div`
    color: aliceblue;
    background-color: #2D232E;
    font-size: 35px;
`
    return(
        <>
            <footer class="site-footer">
                <div class="container">
                    <div class="row">
                        <div class="col-sm-12 col-md-6">
                            <h6>About</h6>
                            <p class="text-justify"><b>to the moon</b> aims to eliminate the common headaches that come with popular bug tracking software. to the moon is catered towards startups and indie development companies. This web-app offers complete control to the user and freedom to modify everything to their needs without unnecessary complexity. </p>
                        </div>
                    </div>

                </div>
                <div class="container">
                    <div class="row">
                        <div class="col-md-8 col-sm-6 col-xs-12">
                            <p class="copyright-text">Copyright &copy; 2021 All Rights Reserved by <a href="https://github.com/PolarBearJ">PolarBearJ - Joshua Stevens</a>.
                            </p>
                        </div>

                        <div class="col-md-4 col-sm-6 col-xs-12">
                            <ul class="social-icons">
                                <li><a class="facebook" href="https://github.com/PolarBearJ"><AiFillGithub/><i class="fa fa-facebook"></i></a></li>
                                <li><a class="twitter" href="https://www.linkedin.com/in/joshua-m-stevens/"><AiFillLinkedin/><i class="fa fa-twitter"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )


}