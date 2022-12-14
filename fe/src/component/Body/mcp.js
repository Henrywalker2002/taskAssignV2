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

export const Mcp = () => {
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
    // const [datafetchDetail, setDatafetchDetail] = useState([]);

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
        // list MCP
    useEffect(() => {
        const dataSource3 = async () => {
          const data = await (
            await fetch(
              "https://serverurbanwatse.herokuapp.com/listMCPs"
            )
          ).json();
          (data.message).map((item, index) => item.key = index);
          setDatafetchMcp(data.message);
        };
        dataSource3();
    }, []);

    let id = new Array();
    id = [5,6,21,22,25];
    async function createRoute (id) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({"MCPs": id});
        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        };
        var response = await fetch("https://serverurbanwatse.herokuapp.com/createRoute", requestOptions)
        var data = await response.json();
        // console.log(data.message)
        var text = data.message
        var route = text.routeId
        return route
    }
    
    async function getRouteId(id) {
    const result = await createRoute(id);
    }
    getRouteId(id);

    const columns = [
        {
            title: "No",
            dataIndex: "key",
            key: "no",
            align: 'center',
        },
        {
            title: "MCPs",
            dataIndex: "address",
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
            title: "PercentContain",
            dataIndex: "percentContain",
            key: "PercentContain",
            align: 'center',
        },
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
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
                        dataSource={datafetchMcp} // +++++++++++ data +++++++++ 
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
                        <Link to="/staff">
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

