import React, {useRef, useEffect, useCallback, useState} from "react";
import {useSpring, animated} from "react-spring";
import styled, { css } from 'styled-components'
import { MdClose } from "react-icons/md";
import {Form, Row, Col, Button, Modal} from "react-bootstrap";
import {AiOutlineNumber} from "react-icons/all";

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

const BugModalWrapper = styled.div`
  width: 300px;
  height: 400px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  display: grid;
  grid-template-columns: 1fr;
  position: relative;
  z-index: 10;
  border-radius: 10px;
`;

const BugModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.8;
  color: #141414;
  p {
    margin-bottom: 1rem;
  }
  button {
    padding: 10px 24px;
    background: #141414;
    color: #fff;
    border: none;
  }
`;

const CloseBugModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
`;

const BugModalButton = styled.button`
    padding: 10px 24px;
    background: #141414;
    color: #fff;
    border: none;
    cursor: pointer;
    margin-top: 10px;
`;

export const BugModal = ({showBugModal, setShowBugModal, bugTracker, bug, setBugTracker}) => {
    const optionParser = {
        "Low": 1,
        "Moderate": 2,
        "High": 3
    };
    const optionParserReverse = {
        1: "Low",
        2: "Moderate",
        3: "High"
    };
    const num = bug.num;
    const [title, setTitle] = useState(bug.title)
    const [desc, setDesc] = useState(bug.desc)
    const [prio, setPrio] = useState(bug.priority)
    const [status, setStatus] = useState(bug.status)
    const [selectedOption, setSelectedOption] = useState(optionParserReverse[prio])
    const options = ["Low", "Moderate", "High"];
    const [selectedOptionStatus, setSelectedOptionStatus] = useState(optionParserReverse[prio])
    const optionsStatus = ["Open", "In Progress", "Test", "Closed"];

    const BugModalRef = useRef()
    const animation = useSpring({
        config: {duration: 250},
        opacity: showBugModal ? 1 : 0,
        transform: showBugModal ? `translateY(0%)` : `translateY(-100%)`
    })
    const closeBugModal = e => {
        if(BugModalRef.current === e.target){
            setShowBugModal(false);
        }
    }
    function updateBug(){
        setShowBugModal(false);
    }
    function deleteBug(){
        let status = bug.status;
        let num = bug.num;
        let len = bugTracker[status].length;
        let bugIndex;
        for(let i = 0; i < len; i++){
            if (bugTracker[status][i].num == num){
                bugIndex = i;
            }
        }
        bugTracker[status].splice(bugIndex, 1);
        setBugTracker(bugTracker);
        setShowBugModal(false);

    }

    return (
        <>
            {showBugModal ? (
                <BugModalWrapper showBugModal={showBugModal}>
                    <h3>#{num}</h3>
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
                        <Form.Label>Status</Form.Label>
                        <select name='selectedOption' onChange={e => setSelectedOptionStatus(e.target.value)}>
                            {optionsStatus.map(i => i == selectedOptionStatus ? (
                                <option value={i} selected>
                                    {i}
                                </option>
                            ) : (<option value={i}>{i}</option>) )}
                        </select>
                    </Form>
                    <Row>
                        <Col xs={6}>
                            <Button variant="danger" onClick={deleteBug}>Delete</Button>
                        </Col>
                        <Col xs={6}>
                            <Button variant="secondary" onClick={updateBug}>Save Changes</Button>{' '}
                        </Col>
                    </Row>
                    <CloseBugModalButton aria-label='Close BugModal' onClick={() => setShowBugModal(prev => !prev)}/>
                </BugModalWrapper>
            ) : null
            }
        </>
    )
}