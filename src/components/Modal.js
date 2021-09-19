import React, {useRef, useEffect, useCallback, useState} from "react";
import {useSpring, animated} from "react-spring";
import styled, { css } from 'styled-components'
import { MdClose } from "react-icons/md";
import {AiFillBug} from "react-icons/all"
import {Form, Row, Col, Button} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5;
`;

const ModalWrapper = styled.div`
  width: 800px;
  height: 500px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  display: grid;
  grid-template-columns: 1fr;
  position: relative;
  z-index: 10;
  border-radius: 10px;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.8;
  color: #141414;
  p {
    margin-bottom: 1rem;
  }
`;
const ModalButton = styled.button`
    padding: 10px 24px;
    background: #141414;
    color: #fff;
    border: none;
    cursor: pointer;
    margin-top: 20px;
`

const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
`;

export const Modal = ({showModal, setShowModal, bugTracker}) => {
    const modalRef = useRef()
    const animation = useSpring({
        config: {duration: 250},
        opacity: showModal ? 1 : 0,
        transform: showModal ? `translateY(0%)` : `translateY(-100%)`
    })
    const closeModal = e => {
        if(modalRef.current === e.target){
            setShowModal(false);
        }
    }
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [prio, setPrio] = useState(1)
    const [selectedOption, setSelectedOption] = useState("Low")
    const options = ["Low", "Moderate", "High"];
    const optionParser = {
        "Low": 1,
        "Moderate": 2,
        "High": 3
    }
    function createBug(){
        bugTracker.nums = bugTracker.nums+1;
        let newBug = {
            num: bugTracker.nums,
            title: title,
            status: "Open",
            desc: desc,
            priority: optionParser[selectedOption]
        }
        bugTracker.open.push(newBug);
        setShowModal(false);
    }

    return (
        <>
            {showModal ? (
                <Background ref={modalRef} onClick={closeModal}>
                    <animated.div style={animation}>
                    <ModalWrapper showModal={showModal}>
                        <ModalContent>
                            <h1><AiFillBug/></h1>
                            <h1>Report a Bug</h1>
                            <Form>
                                <Form.Group as={Row} className="mb-3" controlId="formHorizontalText">
                                    <Form.Label column sm={2}>
                                        Title
                                    </Form.Label>
                                    <Col sm={10}>
                                        <Form.Control type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)}/>
                                    </Col>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control as="textarea" rows={3} value={desc} onChange={e => setDesc(e.target.value)}/>
                                </Form.Group>
                                <Form.Label>Priority</Form.Label>
                                <select name='selectedOption' onChange={e => setSelectedOption(e.target.value)}>
                                    {options.map(i => i == selectedOption ? (
                                        <option value={i} selected>
                                            {i}
                                        </option>
                                    ) : (<option value={i}>{i}</option>) )}
                                </select>
                            </Form>
                            <ModalButton type="button" onClick={createBug}>Create</ModalButton>
                        </ModalContent>
                        <CloseModalButton aria-label='Close modal' onClick={() => setShowModal(prev => !prev)}/>
                    </ModalWrapper>
                    </animated.div>
                </Background>
            ) : null
            }
        </>
    )
}