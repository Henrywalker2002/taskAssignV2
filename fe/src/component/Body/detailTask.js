import { React, useEffect, useState } from "react";
import { Table, Button, Tag, Space, message } from "antd";
import { ButtonStyled } from "../Button/buttons";
import Modal from "../Modal/Modal";
import ModalAnm from "../ModalAnnoucement/ModalAnm";
import "./body.css";
import "../../App.css";
// import { TableDemo } from "../Table/table";

//  const Taskdetail = () => {
    export async function Detail() {
        var body = document.getElementById('table')
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
        var data = await response.json()
        console.log(data)
        // 
        for (let x in data['message']) {
            var row = document.createElement('div')
            row.className = 'row'
            var col1 = document.createElement('div')
            col1.className = 'col'
            col1.textContent = x
            var col2 = document.createElement('div')
            col2.className = 'col-10'
            if (x === "route" | x === "MCPs") {
                for (let y in data['message'][x]) {
                    var tempDiv = document.createElement('div')
                    tempDiv.textContent = data['message'][x][y]
                    col2.appendChild(tempDiv)
                }
            }
            else {
                col2.textContent = data['message'][x]
            }
            row.appendChild(col1)
            row.appendChild(col2)
            divContainter.appendChild(row)
        }
        body.appendChild(divContainter)
        

        return (
            <body>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                        </tr>
                    </thead>
                    <tbody id="table">
                    </tbody>
                </table>
            </body>
        )
    };

    Detail();
// export function Detail() {
//     const [datafetchDetail, setDatafetchDetail] = useState([]);

//     const dataSource = [
//         {
//             "message": {
//                 "MCPs": [
//                     "Đường Hương Lộ 80B & Đường Đông Thạnh 4, Hồ Chí Minh, Hồ Chí Minh, 71708",
//                     "Hẻm 621 Hưng Phú & Đường Nguyễn Duy, Hồ Chí Minh, Hồ Chí Minh, 73007",
//                     "Đường Lê Văn Lương & Lê Văn Lương, Hồ Chí Minh, Hồ Chí Minh, 73207",
//                     "Đường Phan Văn Đáng & Đường Tỉnh Lộ 769, Nhơn Trạch, Đồng Nai, 76260",
//                     "Đường Nguyễn Tư Giản 157, Hồ Chí Minh, Hồ Chí Minh, 71420",
//                     "Hẻm 745/150 Quang Trung 745/150/33, Hồ Chí Minh, Hồ Chí Minh, 71420",
//                     "Đường CC5 13, Hồ Chí Minh, Hồ Chí Minh, 72010",
//                     "Hẻm 32 Đường Số 10 32/17, Hồ Chí Minh, Hồ Chí Minh, 71108",
//                     "Đường Dương Cát Lợi 67, Hồ Chí Minh, Hồ Chí Minh, 73206"
//                 ],
//                 "employee": "Nguyễn Diệp Anh, Trần Nam Anh, Hoàng Ngọc Bách",
//                 "licensePlate": "46AH153",
//                 "map": "https://serverurbanwatse.herokuapp.com/route/1",
//                 "route": [
//                     "distance: 275.1, instruction: Head southeast on Nguyễn Tư Giản",
//                     "distance: 612.6, instruction: Turn left onto Đường Phạm Văn Bạch",
//                     "distance: 91.0, instruction: Turn left onto Hẻm 993 Phạm Văn Bạch",
//                     "distance: 95.0, instruction: Turn right onto Hẻm 745 Quang Trung",
//                     "distance: 16.6, instruction: Turn left onto Hẻm 745/150 Quang Trung",
//                     "distance: 60.9, instruction: Turn left onto Hẻm 745/150 Quang Trung",
//                     "distance: 0.0, instruction: Arrive at Hẻm 745/150 Quang Trung, on the left"
//                 ]
//             },
//             "result": "ok"
//         },]

//     function startArticle(value) {
//         var b = document.getElementById("chatWindow");
//         var a = document.createElement("article");
//         a.appendChild(document.createTextNode(value));
//         b.appendChild(a);
//         console.log(value);
//     }

//     useEffect(() => {
//         const data = dataSource['message']
//         console.log(data);
//         dataSource.map((k, l) => {
//             startArticle(k);
//             // document.getElementById("chatWindow").innerHTML += `<article>${k}</article>`;
//         });
//     }, []);

//     return (
//         <section id ="chatWindow"></section>
//     )
// };