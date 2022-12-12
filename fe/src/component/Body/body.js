import { React, useEffect, useState } from "react";
import { Table, Button, Tag, Space } from "antd";
import { ButtonStyled } from "../Button/buttons";
import Modal from "../Modal/Modal";
import ModalAnm from "../ModalAnnoucement/ModalAnm";
// import "./body.css";
import "../../App.css";
import { TableDemo } from "../Table/table";
import PopUpData, { PopUpMcp } from "../PopUp/popup";
// import axios from "axios";

export const BodyDemo = () => {
    const [showModal, setShowModal] = useState(false);
    const [showModalAnm, setShowModalAnm] = useState(false);
    const [showPopUpData, setShowPopUpData] = useState(false);
    const [showPopUpMcp, setShowPopUpMcp] = useState(false);
    const [datafetch, setDatafetch] = useState([]);
    const [datafetchMcp, setDatafetchMcp] = useState([]);

    // const [data, setData] = useState(null);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);

    const openModal = () => {
        setShowModal((prev) => !prev);
        // console.log(showModal);
    };

    const openModalAnm = () => {
        setShowModalAnm((prev) => !prev)
    }
    // const openModalData = () => {
    //     setShowPopUpData((prev) => !prev)
    // }

    const dataSource = [
        {
            // key: "1",
            title: "dsfMike",
            no: "23",
            mcp: "10 Downingvxcv Street",
        },
        {
            // key: "2",
            title: "Johfdsfn",
            no: "2",
            mcp: "10 Downing Street",
        },
        {
            // key: "3",
            title: "Mifsdfke",
            no: "3",
            mcp: "10 Downing Street",
        },
    ];


    useEffect(() => {
        const dataSource2 = async () => {
        const data = await (
            await fetch(
            "https://serverurbanwatse.herokuapp.com/listEmployeeFree"
            )
        ).json();
        setDatafetch(data.message);
        console.log(data.message);
        };
        dataSource2();
        // console.log(datafetch);
    }, []);

    useEffect(() => {
        const dataSource3 = async () => {
          const data = await (
            await fetch(
              "https://serverurbanwatse.herokuapp.com/listMCPs"
            )
          ).json();
          setDatafetchMcp(data.message);
          console.log(data.message);
        };
        dataSource3();
        // console.log(datafetchMcp);
    }, []);
        
    // }, [])


    const columns = [
        {
            title: "No",
            dataIndex: "no",
            key: "no",
            align: 'center',
        },
        {
            title: "Colector and janitor",
            dataIndex: "name",
            key: "title",
            onHeaderCell: (column) => {
                return {
                    onClick: () => {
                        setShowPopUpData((prev) => !prev)
                    }
                };
            },
            align: 'center'
        },
        {
            title: "MCPs",
            dataIndex: "name",
            key: "mcp",
            onHeaderCell: (column) => {
                return {
                    onClick: () => {
                        setShowPopUpMcp((prev) => !prev)
                    }
                };
            },
            align: 'center'
        },
    ];

    // const handleOnClickDetail = () => { }
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

    return (
        <>
            <Modal
                showModal={showModal}
                setShowModal={setShowModal}
                title="Nhập mật khẩu"
            />
            <ModalAnm
                showModal={showModalAnm}
                setShowModal={setShowModalAnm}
                title="DELETE"
                announcement='Are you sure to delete this?'
            />
            {/* <PopUpData isShowPopUp={showPopUpData} setShowPopUp={setShowPopUpData} data={dataSource.map(data => data)} title={"Colector & Janitor"}/> */}
            <PopUpData isShowPopUp={showPopUpData} setShowPopUp={setShowPopUpData} data={datafetch} title={"Colector & Janitor"}/>
            <PopUpMcp isShowPopUp={showPopUpMcp} setShowPopUp={setShowPopUpMcp} data={datafetchMcp.map(data => data)} title={"MCPs"}/>

            <div className="bodyDiv">
                <div className="flex">
                    <div className="w-1/5"></div>
                    <TableDemo
                        // dataSource={dataSource} // +++++++++++ data +++++++++ 
                        columns={columns}

                        className="w-3/5 mt-10"
                        rowSelection={rowSelection}
                    />
                    <div className="w-1/5"></div>
                </div>

                <div className="flex">
                    {" "}
                    <div className="w-4/5 "> </div>
                    <div className="w-1/5 mb-10">
                        <ButtonStyled type="text" onClick={() => openModal()}>
                            ADD
                        </ButtonStyled>
                        <ButtonStyled onClick={() => openModalAnm()} type="text">DELETE</ButtonStyled>
                    </div>
                </div>
            </div>
        </>
    );
};

