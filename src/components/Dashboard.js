import React, {Component, useState} from "react";
import styled, { css } from 'styled-components'
import { Modal } from './Modal';
import {GlobalStyle} from "../globalStyles";
import State from "./State";
import {AiFillBug} from "react-icons/all"


const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url('https://wallpaperboat.com/wp-content/uploads/2019/10/free-space-background-01.jpg');
  background-color: #474448;
`
const Button = styled.button`
  transform: translateY(-550%);
  min-width: 100px;
  padding: 16px 32px;
  border-radius: 10px;
  border: none;
  background: #2D232E;
  color: #fff;
  font-size: 24px;
  cursor: pointer;
  position: absolute;
`
let testBug = {
    num: 1,
    title: "This is a test title",
    status: "Open",
    desc: "this is the description",
    priority: 2
}

export default function Dashboard() {
    const [showModal, setShowModal] = useState(false)

    const openModal = () =>{
        setShowModal(prev => !prev);
    }

    let [bugTracker, setBugTracker] = useState({
        "Open": [],
        "In Progress": [],
        "Test": [],
        "Closed": [],
        nums: 1
    })
    let [reload, setReload] = useState(0);
    return(
        <div className="dashboard">
            <GlobalStyle/>
            <Container>
                <Button onClick={openModal}>Report a bug <AiFillBug/></Button>
                <Modal showModal={showModal} setShowModal={setShowModal} bugTracker={bugTracker}/>
                <State title={"Open"} bugList={bugTracker["Open"]} bugTracker={bugTracker} setBugTracker={setBugTracker} reload={reload} setReload={setReload}/>
                <State title={"In Progress"} bugList={bugTracker["In Progress"]} bugTracker={bugTracker} setBugTracker={setBugTracker} reload={reload} setReload={setReload}/>
                <State title={"Test"} bugList={bugTracker["Test"]} bugTracker={bugTracker} setBugTracker={setBugTracker} reload={reload} setReload={setReload}/>
                <State title={"Closed"} bugList={bugTracker["Closed"]} bugTracker={bugTracker} setBugTracker={setBugTracker} reload={reload} setReload={setReload}/>

            </Container>
        </div>
    )

}