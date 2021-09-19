import React, {Component, useState} from "react";
import styled, { css } from 'styled-components'
import {BugModal} from './BugModal';
import {GlobalStyle} from "../globalStyles";
import {AiOutlineNumber} from "react-icons/all";
import {BsArrowUp} from "react-icons/all";

const Container = styled.div`
  height: 15%;
  width: 300px;
  color: #2D232E;
  background-color: #E0DDCF;
  padding: 16px 32px;
  border-radius: 10px;
  z-index: 10;
  margin-top: 5px;
  justify-content: center;
  align-items: center;
`
const Title = styled.div`
  width: 50%;
  font-size: 20px;
  position: absolute;
`
const Field = styled.div`
  width: 50%;
  font-size: 15px;
  justify-content: center;
  align-items: center;
  transform: translateY(-75%);
  position: absolute;
`
const Button = styled.button`
  transform: translateY(50%);
  margin-left: 180px;
  min-width: 50px;
  padding: 8px 10px;
  border-radius: 10px;
  border: none;
  background: #534B52;
  color: #fff;
  font-size: 15px;
  cursor: pointer;
  position: absolute;
  `

const Priority = styled.div`
  transform: translateY(50%);
  margin-left: 90px;
  border-radius: 10px;
  border: none;
  color: #2D232E;
  font-size: 30px;
  position: absolute;
  `

export default function BugCard({bug, bugTracker, setBugTracker}) {
    const title = bug.title;
    const num = bug.num;
    const status = bug.status;
    const desc = bug.desc;
    const priority = bug.priority;
    const [showBugModal, setShowBugModal] = useState(false)

    const openBugModal = () =>{
        setShowBugModal(prev => !prev);
    }

    let arrows = [];
    arrows.length = priority;
    arrows.fill(0);
    return(
        <>
            <GlobalStyle/>
                <Container>
                    <BugModal setBugTracker={setBugTracker} showBugModal={showBugModal} setShowBugModal={setShowBugModal} bugTracker={bugTracker} bug={bug}/>
                    <Title>{title}</Title> <Button onClick={openBugModal}>Inspect</Button>
                    <Field><AiOutlineNumber/> {num}</Field>
                    <Priority>{bug.priority > 0 ? (
                        arrows.map(i => {
                            return <BsArrowUp/>
                        })
                    ) : null}</Priority>
                </Container>
        </>
    )
}