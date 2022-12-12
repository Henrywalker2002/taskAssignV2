import { React, useEffect, useState } from "react";
import { Table, Button, Tag, Space } from "antd";
import { ButtonStyled } from "../Button/buttons";
import Modal from "../Modal/Modal";
import ModalAnm from "../ModalAnnoucement/ModalAnm";
import "./body.css";
import "../../App.css";
import { TableDemo } from "../Table/table";
import { PopUpData, PopUpMcp, PopUpTruck } from "../PopUp/popup";
// import axios from "axios";

export const BodyDemo = () => {
    const [showModal, setShowModal] = useState(false);
    const [showModalAnm, setShowModalAnm] = useState(false);
    
    // POPUP
    const [showPopUpData, setShowPopUpData] = useState(false);
    const [showPopUpMcp, setShowPopUpMcp] = useState(false);
    const [showPopUpTrucks, setShowPopUpTrucks] = useState(false);

    // DATA
    const [datafetch, setDatafetch] = useState([]);
    const [datafetchMcp, setDatafetchMcp] = useState([]);
    const [datafetchTruck, setDatafetchTruck] = useState([]);
    const [datafetchTask, setDatafetchTask] = useState([]);

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

    // const dataSource = [
    //     {
    //         // key: "1",
    //         title: "dsfMike",
    //         no: "23",
    //         MCPs: [
    //             "Đường Hương Lộ 80B & Đường Đông Thạnh 4, Hồ Chí Minh, Hồ Chí Minh, 71708",
    //             "Hẻm 621 Hưng Phú & Đường Nguyễn Duy, Hồ Chí Minh, Hồ Chí Minh, 73007",
    //             "Đường Lê Văn Lương & Lê Văn Lương, Hồ Chí Minh, Hồ Chí Minh, 73207",
    //             "Đường Phan Văn Đáng & Đường Tỉnh Lộ 769, Nhơn Trạch, Đồng Nai, 76260",
    //             "Đường Nguyễn Tư Giản 157, Hồ Chí Minh, Hồ Chí Minh, 71420",
    //             "Hẻm 745/150 Quang Trung 745/150/33, Hồ Chí Minh, Hồ Chí Minh, 71420",
    //             "Đường CC5 13, Hồ Chí Minh, Hồ Chí Minh, 72010",
    //             "Hẻm 32 Đường Số 10 32/17, Hồ Chí Minh, Hồ Chí Minh, 71108",
    //             "Đường Dương Cát Lợi 67, Hồ Chí Minh, Hồ Chí Minh, 73206"
    //         ],        
    //     },
    //     {
    //         // key: "2",
    //         title: "Johfdsfn",
    //         no: "2",
    //         mcp: "10 Downing Street",
    //     },
    //     {
    //         // key: "3",
    //         title: "Mifsdfke",
    //         no: "3",
    //         mcp: "10 Downing Street",
    //     },
    // ];



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

    useEffect(() => {
        const dataSource4 = async () => {
          const data = await (
            await fetch(
              "https://serverurbanwatse.herokuapp.com/listTruckFree"
            )
          ).json();
          setDatafetchTruck(data.message);
          console.log(data.message);
        };
        dataSource4();
        // console.log(datafetchMcp);
    }, []);
        
    // ==========================================
    useEffect(() => {
        const dataSource5 = async () => {
            const data = await (
                await fetch("https://serverurbanwatse.herokuapp.com/listTask")
            ).json();
            (data.message).map((item, index) => item.key = index)
            setDatafetchTask(data.message);
            console.log(data.message);
        };
        dataSource5();
    }, []);
    // ==========================================


    const columns = [
        {
            title: "No",
            dataIndex: "key",
            key: "no",
            align: 'center',
        },
        {
            title: "Colector and janitor",
            dataIndex: "Employees",
            key: "name",
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
            title: "Trucks",
            dataIndex: "licensePlate",
            key: "licensePlate",
            onHeaderCell: (column) => {
                return {
                    onClick: () => {
                        setShowPopUpTrucks((prev) => !prev)
                    }
                };
            },
            align: 'center'
        },
        {
            title: "MCPs",
            dataIndex: "mcp",
            key: "MCPs",
            onHeaderCell: (column) => {
                return {
                    onClick: () => {
                        setShowPopUpMcp((prev) => !prev)
                    }
                };
            },
            align: 'center'
        },
        {
            title: "Map",
            dataIndex: "map",
            key: "map",
            align: 'center',
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
            <PopUpTruck isShowPopUp={showPopUpTrucks} setShowPopUp={setShowPopUpTrucks} data={datafetchTruck.map(data => data)} title={"Trucks"}/>
            
            <div className="bodyDiv">
                <div className="flex">
                    <div className="w-1/5"></div>
                    <TableDemo
                        dataSource={datafetchTask} // +++++++++++ data +++++++++ 
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

