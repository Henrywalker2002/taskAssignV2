import { React, useEffect, useState } from "react";
import {Link } from "react-router-dom";
import { Table, Button, Tag, Space, Popconfirm } from "antd";
import { ButtonStyled } from "../Button/buttons";
import Modal from "../Modal/Modal";
import ModalAnm from "../ModalAnnoucement/ModalAnm";
import "../../App.css";
import { TableDemo } from "../Table/table";
import { PopUpData, PopUpMcp, PopUpTruck } from "../PopUp/popup";
import axios from "axios";
import api from "../../api/axios";

export const Truck = () => {
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


        // ====================================
        // list  Truck
    useEffect(() => {
        const dataSource4 = async () => {
          const data = await (
            await fetch(
              "https://serverurbanwatse.herokuapp.com/listTruckFree"
            )
          ).json();
          (data.message).map((item, index) => item.key = index);
          setDatafetchTruck(data.message);
          console.log(data.message);
        };
        dataSource4();
    }, []);
        


    async function createRoute (id) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({"routeId": id});
        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        };

    }




    const columns = [
        {
            title: "No",
            dataIndex: "key",
            key: "no",
            align: 'center',
        },
        {
            title: "licensePlate",
            dataIndex: "licensePlate",
            key: "licensePlate",
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
            title: "capacity",
            dataIndex: "capacity",
            key: "capacity",
            align: 'center',
        },
        {
            title: "location",
            dataIndex: "location",
            key: "location",
            align: 'center',
        },
        // {
        //     title: 'operation',
        //     dataIndex: 'operation',
        //     render: (_, record) =>
        //       datafetchMcp.length >= 1 ? (
        //         <Popconfirm title="Are you sure to delete?" onConfirm={() => handleDelete(record.routeId)}>
        //           <Button > Delete </Button>
        //         </Popconfirm>
        //       ) : null,
        // },
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

            <div className="bodyDiv">
                <div className="flex">
                    <div className="w-1/5"></div>
                    <TableDemo
                        dataSource={datafetchTruck} // +++++++++++ data +++++++++ 
                        expandable={{
                            expandedRowRender: (record) => (
                              <p
                                style={{
                                  margin: 0,
                                }}
                              >
                                {record.description}
                              </p>
                            ),
                            rowExpandable: (record) => record.name !== 'Not Expandable',
                          }}
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
                        {/* <ButtonStyled type="text" onClick={() => openModal()}> */}
                        <Link to="/">
                            <ButtonStyled type="text">
                                ADD
                            </ButtonStyled>
                        </Link>

                    </div>
                </div>
            </div>
        </>
    );
};

