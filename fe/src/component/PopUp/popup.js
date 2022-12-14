import React, { useRef, useEffect, useCallback, useState } from "react";
import { useSpring, animated } from "react-spring";
import styled from "styled-components/macro";
import { MdClose } from "react-icons/md";
import { Button, Input, Table } from "antd";
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
  width: 700px;
  height: 500px;
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
const ModalTitle = styled.div`
  text-align: center;
`;

export const PopUpData = ({ isShowPopUp, setShowPopUp, title, data }) => {
    const modalRef = useRef();
    const columns = [
        {
            dataIndex: "name",
        },
    ]

    const animation = useSpring({
        config: {
            duration: 250,
        },
        opacity: isShowPopUp ? 1 : 0,
        transform: isShowPopUp ? `translateY(0%)` : `translateY(-100%)`,
    });

    const closeModal = (e) => {
        if (modalRef.current === e.target) {
            setShowPopUp(false);
        }
    };
    const [state, setState] = useState([]);
    // const selectRow = (record) => {
    //     const selectedRowKeys = [...state.selectedRowKeys];
    //     if (selectedRowKeys.indexOf(record.key) >= 0) {
    //         selectedRowKeys.splice(selectedRowKeys.indexOf(record.key), 1);
    //     } else {
    //         selectedRowKeys.push(record.key);
    //     }
    //     setState({ selectedRowKeys });
    // };
    const onSelectedRowKeysChange = (selectedRowKeys) => {
        setState({ selectedRowKeys });
    };
    const { selectedRowKeys } = state;
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectedRowKeysChange
    };

    data.map((item, index) => item.key = index)

    return (
        <>
            {isShowPopUp ? (
                <Background onClick={closeModal} ref={modalRef}>
                    <animated.div style={animation}>
                        <ModalWrapper showModal={isShowPopUp}>
                            <ModalContent>
                                <ModalTitle className="w-full h-12 bg-[#D9D9D9] pt-1 font-bold text-3xl">
                                    {title}
                                </ModalTitle>
                                <Table className="mt-4 w-[80%] "
                                    dataSource={data}
                                    columns={columns}
                                    pagination={{ pageSize: 6 }}
                                    showHeader={false}
                                    
                                    rowSelection={rowSelection} />
                            </ModalContent>
                            <div className="flex">
                                <div className="w-4/5"></div>
                                <div className="w-1/5 ">
                                    <Button className="bg-[#2C4E29] text-white">CONTINUE</Button>
                                </div>
                            </div>
                            <CloseModalButton
                                aria-label="Close modal"
                                onClick={() => setShowPopUp((prev) => !prev)}
                            />
                        </ModalWrapper>
                    </animated.div>
                </Background>
            ) : null}
        </>
    );
};

export const PopUpMcp = ({ isShowPopUp, setShowPopUp, title, data }) => {
    // console.log(data)
    const modalRef = useRef();
    const columns = [
        {
            dataIndex: "address",
            // key: "title",
        },
    ]

    const animation = useSpring({
        config: {
            duration: 250,
        },
        opacity: isShowPopUp ? 1 : 0,
        transform: isShowPopUp ? `translateY(0%)` : `translateY(-100%)`,
    });

    const closeModal = (e) => {
        if (modalRef.current === e.target) {
            setShowPopUp(false);
        }
    };
    const [state, setState] = useState([]);
    // const selectRow = (record) => {
    //     const selectedRowKeys = [...state.selectedRowKeys];
    //     if (selectedRowKeys.indexOf(record.key) >= 0) {
    //         selectedRowKeys.splice(selectedRowKeys.indexOf(record.key), 1);
    //     } else {
    //         selectedRowKeys.push(record.key);
    //     }
    //     setState({ selectedRowKeys });
    // };
    const onSelectedRowKeysChange = (selectedRowKeys) => {
        setState({ selectedRowKeys });
    };
    const { selectedRowKeys } = state;
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectedRowKeysChange
    };
    data.map((item, index) => item.key = index)
    return (
        <>
            {isShowPopUp ? (
                <Background onClick={closeModal} ref={modalRef}>
                    <animated.div style={animation}>
                        <ModalWrapper showModal={isShowPopUp}>
                            <ModalContent>
                                <ModalTitle className="w-full h-12 bg-[#D9D9D9] pt-1 font-bold text-3xl">
                                    {title}
                                </ModalTitle>
                                <Table className="mt-4 w-[80%] "
                                    dataSource={data}
                                    columns={columns}
                                    pagination={{ pageSize: 6 }}
                                    showHeader={false}
                                    rowSelection={rowSelection} 
                                    />
                            </ModalContent>
                            <div className="flex">
                                <div className="w-4/5"></div>
                                <div className="w-1/5 ">
                                    <Button className="bg-[#2C4E29] text-white">CONTINUE</Button>
                                </div>
                            </div>


                            <CloseModalButton
                                aria-label="Close modal"
                                onClick={() => setShowPopUp((prev) => !prev)}
                            />
                        </ModalWrapper>
                    </animated.div>
                </Background>
            ) : null}
        </>
    );
};


export const PopUpTruck = ({ isShowPopUp, setShowPopUp, title, data }) => {
    // console.log(data)
    const modalRef = useRef();
    const columns = [
        {
            dataIndex: "licensePlate",
            // key: "title",
        },
    ]

    const animation = useSpring({
        config: {
            duration: 250,
        },
        opacity: isShowPopUp ? 1 : 0,
        transform: isShowPopUp ? `translateY(0%)` : `translateY(-100%)`,
    });

    const closeModal = (e) => {
        if (modalRef.current === e.target) {
            setShowPopUp(false);
        }
    };
    const [state, setState] = useState([]);
    // const selectRow = (record) => {
    //     const selectedRowKeys = [...state.selectedRowKeys];
    //     if (selectedRowKeys.indexOf(record.key) >= 0) {
    //         selectedRowKeys.splice(selectedRowKeys.indexOf(record.key), 1);
    //     } else {
    //         selectedRowKeys.push(record.key);
    //     }
    //     setState({ selectedRowKeys });
    // };
    const onSelectedRowKeysChange = (selectedRowKeys) => {
        setState({ selectedRowKeys });
    };
    const { selectedRowKeys } = state;
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectedRowKeysChange
    };
    data.map((item, index) => item.key = index)
    return (
        <>
            {isShowPopUp ? (
                <Background onClick={closeModal} ref={modalRef}>
                    <animated.div style={animation}>
                        <ModalWrapper showModal={isShowPopUp}>
                            <ModalContent>
                                <ModalTitle className="w-full h-12 bg-[#D9D9D9] pt-1 font-bold text-3xl">
                                    {title}
                                </ModalTitle>
                                <Table className="mt-4 w-[80%] "
                                    dataSource={data}
                                    columns={columns}
                                    pagination={{ pageSize: 6 }}
                                    showHeader={false}

                                    rowSelection={rowSelection} />
                            </ModalContent>
                            <div className="flex">
                                <div className="w-4/5"></div>
                                <div className="w-1/5 ">
                                    <Button className="bg-[#2C4E29] text-white">CONTINUE</Button>
                                </div>
                            </div>

                            <CloseModalButton
                                aria-label="Close modal"
                                onClick={() => setShowPopUp((prev) => !prev)}
                            />
                        </ModalWrapper>
                    </animated.div>
                </Background>
            ) : null}
        </>
    );
};



export default PopUpData;
