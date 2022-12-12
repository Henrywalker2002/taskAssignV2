import { React, useEffect, useState } from "react";
import { Table, Button, Tag, Space } from "antd";
import { ButtonStyled } from "../Button/buttons";
import Modal from "../Modal/Modal";
import ModalAnm from "../ModalAnnoucement/ModalAnm";
import "./body.css";
import "../../App.css";
// import { TableDemo } from "../Table/table";

export async function Detail() {
        var body = document.getElementsByTagName('body')[0]
        var divContainter = document.createElement('div')
        divContainter.className = "containner"
        // 
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "routeId": 1
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        var response = await fetch("https://serverurbanwatse.herokuapp.com/detailTask", requestOptions)
        var json_ = await response.json()
        console.log(json_)
        // 
        for (let x in json_['message']) {
            var row = document.createElement('div')
            row.className = 'row'
            var col1 = document.createElement('div')
            col1.className = 'col'
            col1.textContent = x
            var col2 = document.createElement('div')
            col2.className = 'col-10'
            if (x == "route" | x == "MCPs") {
                for (let y in json_['message'][x]) {
                    var tempDiv = document.createElement('div')
                    tempDiv.textContent = json_['message'][x][y]
                    col2.appendChild(tempDiv)
                }
            }
            else {
                col2.textContent = json_['message'][x]
            }
            console.log(json_[x])
            row.appendChild(col1)
            row.appendChild(col2)
            divContainter.appendChild(row)
        }
        body.appendChild(divContainter)
    };

