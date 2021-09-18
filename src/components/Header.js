import React, {Component} from "react";
import { RiSpaceShipFill } from "react-icons/ri"
import { HiOutlineMail } from "react-icons/all";

export class Header extends Component {

    render(){
        return(
            <div>
                <h1 className="left"><RiSpaceShipFill/> to the moon</h1>
            </div>
        )
    }


}