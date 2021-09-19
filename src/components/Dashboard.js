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
  background-color: #474448;
`
const Button = styled.button`
  transform: translateY(-600%);
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

let bugTracker = {
    open: [testBug],
    in_progress: [],
    test: [],
    closed: [],
    nums: 1
}

export default function Dashboard() {
    const [showModal, setShowModal] = useState(false)

    const openModal = () =>{
        setShowModal(prev => !prev);
    }

    return(
        <div className="dashboard">
            <GlobalStyle/>
            <Container>
                <Button onClick={openModal}>Report a bug <AiFillBug/></Button>
                <Modal showModal={showModal} setShowModal={setShowModal} bugTracker={bugTracker}/>
                <State title={"Open"} bugList={bugTracker.open}/>
                <State title={"In Progress"} bugList={bugTracker.in_progress}/>

            </Container>
        </div>
    )

}