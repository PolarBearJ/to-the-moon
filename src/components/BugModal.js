import React, {useRef, useEffect, useCallback} from "react";
import {useSpring, animated} from "react-spring";
import styled, { css } from 'styled-components'
import { MdClose } from "react-icons/md";
import {Form, Row, Col, Button, Modal} from "react-bootstrap";

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
  width: 550px;
  height: 300px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  display: grid;
  grid-template-columns: 1fr 1fr;
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

export const BugModal = ({showBugModal, setShowBugModal}) => {
    const BugModalRef = useRef()
    const animation = useSpring({
        config: {duration: 250},
        opacity: showBugModal ? 1 : 0,
        transform: showBugModal ? `translateY(0%)` : `translateY(-100%)`
    })
    const closeBugModal = e => {
        if(BugModalRef.current === e.target){
            setShowBugModal(false)
        }
    }

    return (
        <>
            {showBugModal ? (
                <BugModalWrapper showBugModal={showBugModal}>
                    <BugModalContent>
                        <h1>Blah blah blah</h1>
                        <p>Something but with p tag</p>
                        <button>Create</button>
                    </BugModalContent>
                    <CloseBugModalButton aria-label='Close BugModal' onClick={() => setShowBugModal(prev => !prev)}/>
                </BugModalWrapper>
            ) : null
            }
        </>
    )
}