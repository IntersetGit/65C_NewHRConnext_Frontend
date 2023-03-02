import React from 'react';
import ReactDOM from 'react-dom/client';
import { Divider, Form, Card } from 'antd';
import { GiReceiveMoney } from 'react-icons/gi';
const payslip: React.FC = () => {
  return (
    <>
      <div className="flex text-3xl ml-2 pt-4">
        <GiReceiveMoney />
        <div className="ml-2 text-xl">สลิปเงินเดือน</div>
      </div>
      <Divider />
      <Card>
        <Form title="55555">
          <Form.Item name="">
            <h2 className="text-center">
              บริษัท อินเตอร์ เซต รีเสิรซ์ แอนด์ โซลูชั่น จำกัด
            </h2>
          </Form.Item>
          <Form.Item name="">
            <h2 className="text-center">
              3300/119 ตึกช้าง อาคารบี ชั้น 23 ถนนพหลโยธิน แขวงจอมพล เขตจตุจักร
              กรุงเทพฯ 10900
            </h2>
          </Form.Item>

          <table className="table">
            <tr>
              <th className="text-center">ใบแจ้งเงินเดือน (PAY SLIP)</th>
            </tr>
          </table>

          <table className="table">
            <tr>
              <th>รายได้</th>
              <th>รายหัก</th>
              <th></th>
            </tr>
            <tr>
              <td>Alfreds Futterkiste</td>
              <td>Maria Anders</td>
              <td>Germany</td>
            </tr>
            <tr>
              <td>Centro comercial Moctezuma</td>
              <td>Francisco Chang</td>
              <td>Mexico</td>
            </tr>
            <tr>
              <td>Ernst Handel</td>
              <td>Roland Mendel</td>
              <td>Austria</td>
            </tr>
            <tr>
              <td>Island Trading</td>
              <td>Helen Bennett</td>
              <td>UK</td>
            </tr>
            <tr>
              <td>Laughing Bacchus Winecellars</td>
              <td>Yoshi Tannamuri</td>
              <td>Canada</td>
            </tr>
            <tr>
              <td>Magazzini Alimentari Riuniti</td>
              <td>Giovanni Rovelli</td>
              <td>Italy</td>
            </tr>
          </table>
        </Form>
      </Card>
    </>
  );
};
export default payslip;
