import React, {Component} from "react";
import { RiSpaceShipFill } from "react-icons/ri"
import { HiOutlineMail } from "react-icons/all";
import styled from "styled-components";

export default function Header() {
    const Header = styled.div`
      color: aliceblue;
      background-color: #2D232E;
      font-size: 35px;
`

        return(
            <Header>
                <RiSpaceShipFill/> to the moon
            </Header>
        )


}