import React, {Component, useState} from "react";
import styled, { css } from 'styled-components'
import {BugModal} from './BugModal';
import {GlobalStyle} from "../globalStyles";
import {AiOutlineNumber} from "react-icons/all";

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
  position: fixed;
  width: 50%;
  font-size: 20px;
  position: fixed;
`
const Field = styled.div`
  width: 50%;
  font-size: 15px;
  justify-content: center;
  align-items: center;
  transform: translateY(-95%);
  position: fixed;
`
const Button = styled.button`
  transform: translateY(80%);
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
  transform: translateY(150%);
  border-radius: 10px;
  border: none;
  color: #2D232E;
  font-size: 20px;
  cursor: pointer;
  position: absolute;
  `

export default function BugCard({bug}) {
    const [showBugModal, setShowBugModal] = useState(false)

    const openBugModal = () =>{
        setShowBugModal(prev => !prev);
    }
    const title = bug.title;
    const num = bug.num;
    const status = bug.status;
    const desc = bug.desc;
    return(
        <>
            <GlobalStyle/>
                <Container>
                    <BugModal showBugModal={showBugModal} setShowBugModal={setShowBugModal}/>
                    <Title>{title}</Title> <Button onClick={openBugModal}>Inspect</Button>
                    <Field><AiOutlineNumber/> {num}</Field>
                    <Priority>Prio: </Priority>
                </Container>
        </>
    )
}