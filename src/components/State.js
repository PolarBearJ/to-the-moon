import React, {Component, useState} from "react";
import styled, { css } from 'styled-components'
import { bugModal } from './Modal';
import {GlobalStyle} from "../globalStyles";
import BugCard from "./BugCard";
import {useSpring, animated} from "react-spring";

const Title = styled.div`
  color: aliceblue;
  font-size: 25px;
  margin: auto;
  width: 50%;
  padding: 10px;
  text-align: center;
  font-family: Arial, sans-serif;
  
`

const Container = styled.div`
  height: 550px;
  width: 350px;
  margin-right: 20px;
  background-color: #2D232E;
  padding: 16px 32px;
  border-radius: 50px;
  z-index: 2;
  
`


export default function State({title, bugList, bugTracker, setBugTracker, reload, setReload}) {
    const animation = useSpring({
        config: {duration: 250},
        opacity: bugList.length > 0 ? 1 : 0,
    })
    return(
        <> {bugList.length > 0 ?
            <animated.div style={animation}>
            <Container>
                <Title>{title}</Title>
                {bugList.length > 0 ? (
                    bugList.map(bug => {
                        return <BugCard bug={bug} bugTracker={bugTracker} setBugTracker={setBugTracker} reload={reload} setReload={setReload}/>
                        })
                ) : null}
            </Container>
            </animated.div>
            : null }
        </>
    )

}