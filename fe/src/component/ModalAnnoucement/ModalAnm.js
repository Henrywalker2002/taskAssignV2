import React, { useRef, useEffect, useCallback } from "react";
import { useSpring, animated } from "react-spring";
import styled from "styled-components/macro";
import { MdClose } from "react-icons/md";
import "./Modal.css";
import { Button, Input } from "antd";
import { ButtonStyled } from "../Button/buttons";

const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const ModalWrapper = styled.div`
  width: 500px;
  height: 240px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #66ab60;
  color: #000;
  grid-template-columns: 1fr 1fr;
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
  h1 {
    margin-bottom: 1rem;
    font-size: 1.5rem;
  }
`;

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

export const ModalAnm = ({ showModal, setShowModal, title, announcement }) => {
    const modalRef = useRef();

    const animation = useSpring({
        config: {
            duration: 250,
        },
        opacity: showModal ? 1 : 0,
        transform: showModal ? `translateY(0%)` : `translateY(-100%)`,
    });

    const closeModal = (e) => {
        if (modalRef.current === e.target) {
            setShowModal(false);
        }
    };

    return (
        <>
            {showModal ? (
                <Background onClick={closeModal} ref={modalRef}>
                    <animated.div style={animation}>
                        <ModalWrapper showModal={showModal}>
                            <ModalContent>
                                <h1 className="mt-2">{title}</h1>
                                <div className="w-4/5 h-[120px] bg-slate-300 text-center pt-10">
                                    {announcement}
                                </div>
                                <div className="flex">
                                    <div className="w-4/5"></div>
                                    <div className="footer"> 
                                        {" "}
                                        <ButtonStyled
                                            className=""
                                            onClick={() => setShowModal((prev) => !prev)}
                                        >
                                            YES
                                        </ButtonStyled>
                                        <ButtonStyled
                                            className=""
                                            onClick={() => setShowModal((prev) => !prev)}
                                        >
                                            NO
                                        </ButtonStyled>
                                        
                                    </div>
                                </div>
                            </ModalContent>
                            <CloseModalButton
                                aria-label="Close modal"
                                onClick={() => setShowModal((prev) => !prev)}
                            />
                        </ModalWrapper>
                    </animated.div>
                </Background>
            ) : null}
        </>
    );
};

export default ModalAnm;
