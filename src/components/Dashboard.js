import React, {Component, useState} from "react";
import styled, { css } from 'styled-components'
import { Modal } from './Modal';
import {GlobalStyle} from "../globalStyles";


const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`
const Button = styled.button`
  transform: translateY(-600%);
  min-width: 100px;
  padding: 16px 32px;
  border-radius: 4px;
  border: none;
  background: #141414;
  color: #fff;
  font-size: 24px;
  cursor: pointer;
`

export default function Dashboard() {
    const [showModal, setShowModal] = useState(false)

    const openModal = () =>{
        setShowModal(prev => !prev);
    }

    return(
        <div className="mt-5 d-flex">
            <GlobalStyle/>
            <Container>
                <Button onClick={openModal}>Create a bug</Button>
                <Modal showModal={showModal} setShowModal={setShowModal}/>
            </Container>
        </div>
    )

}