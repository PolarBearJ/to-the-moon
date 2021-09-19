import React, {useRef, useEffect, useCallback, useState} from "react";
import {useSpring, animated} from "react-spring";
import styled, { css } from 'styled-components'
import { MdClose } from "react-icons/md";
import {Form, Row, Col, Button, Modal} from "react-bootstrap";
import {BsFillTrashFill} from "react-icons/all";
import './BugModal.css'

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
  height: 475px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #E0DDCF;
  color: #000;
  display: grid;
  grid-template-columns: 1fr;
  position: absolute;
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

const Field = styled.div`
    color: #2D232E;
    text-align: center;
    padding: 10px 24px;
`;
const PadButton = styled.div`
    padding: 10px 24px;
`;

export const BugModal = ({showBugModal, setShowBugModal, bugTracker, bug, setBugTracker, reload, setReload}) => {
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
    const [selectedOptionStatus, setSelectedOptionStatus] = useState(bug.status)
    const optionsStatus = ["Open", "In Progress", "Test", "Closed"];

    const BugModalRef = useRef()
    const animation = useSpring({
        config: {duration: 250},
        opacity: showBugModal ? 1 : 0,
    })
    const closeBugModal = e => {
        if(BugModalRef.current === e.target){
            setShowBugModal(false);
        }
    }
    function updateBug(){
        let bug_status = bug.status;
        let num = bug.num;
        let len = bugTracker[bug.status].length;
        let bugIndex;
        for(let i = 0; i < len; i++){
            if (bugTracker[bug_status][i].num == num) bugIndex = i;
        }
            let newBug = {
                num: num,
                title: title,
                status: selectedOptionStatus,
                desc: desc,
                priority: optionParser[selectedOption]
            }
            bugTracker[bug_status].splice(bugIndex, 1);
            bugTracker[selectedOptionStatus].push(newBug);

        setShowBugModal(false);
        reload == 1 ? setReload(0) : setReload(1);
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
        reload == 1 ? setReload(0) : setReload(1);
    }

    return (
        <>
            {showBugModal ? (
                <BugModalWrapper showBugModal={showBugModal}>
                    <animated.div style={animation}>
                    <Field>
                    <h3>#{num}</h3>
                    </Field>
                    <Form>
                        <Field>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalText">
                            <Form.Label column sm={2}>
                                Title
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)}/>
                            </Col>
                        </Form.Group>
                        </Field>
                        <Field>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} value={desc} onChange={e => setDesc(e.target.value)}/>
                        </Form.Group>
                        </Field>
                        <Field>
                        <Form.Label>Priority</Form.Label>
                        <select name='selectedOption' onChange={e => setSelectedOption(e.target.value)}>
                            {options.map(i => i == selectedOption ? (
                                <option value={i} selected>
                                    {i}
                                </option>
                            ) : (<option value={i}>{i}</option>) )}
                        </select>
                        </Field>
                        <Field>
                        <Form.Label>Status</Form.Label>
                        <select name='selectedOptionStatus' onChange={e => setSelectedOptionStatus(e.target.value)}>
                            {optionsStatus.map(i => i == selectedOptionStatus ? (
                                <option value={i} selected>
                                    {i}
                                </option>
                            ) : (<option value={i}>{i}</option>) )}
                        </select>
                        </Field>
                    </Form>
                    <Row>
                        <Col xs={6}>
                            <PadButton>
                            <Button variant="danger" onClick={deleteBug}><BsFillTrashFill/></Button>
                            </PadButton>
                        </Col>
                        <Col xs={6}>
                            <PadButton>
                            <Button variant="secondary" className={"save_changes"} onClick={updateBug}>Save Changes</Button>{' '}
                            </PadButton>
                        </Col>
                    </Row>
                    <CloseBugModalButton aria-label='Close BugModal' onClick={() => setShowBugModal(prev => !prev)}/>
                    </animated.div>
                    </BugModalWrapper>
            ) : null
            }
        </>
    )
}