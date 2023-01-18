import React, { useState } from 'react';
import { Divider, Radio, Table, theme } from 'antd';
import type { ColumnsType } from 'antd/es/table';

const { useToken } = theme;

interface DataType {
    key: React.Key;
    day: number;
    month: string;
    year: number;
    holiday: string;
}

const columns: ColumnsType<DataType> = [
    {
        title: 'วัน',
        dataIndex: 'day',
        align: 'center',
    },
    {
        title: 'เดือน',
        dataIndex: 'month',
        align: 'center',
    },
    {
        title: 'ปี',
        dataIndex: 'year',
        align: 'center',
    },
    {
        title: 'วันหยุด',
        dataIndex: 'holiday',
        render: (text: string) => <a>{text}</a>,
    },
];

const data: DataType[] = [
    {
        key: '1',
        day: 1,
        month: 'มกราคม',
        year: 2017,
        holiday: 'วันเด็ก',
    },
    {
        key: '2',
        day: 2,
        month: 'กุมภาพันธ์',
        year: 2018,
        holiday: 'วันครู',
    },
    {
        key: '3',
        day: 3,
        month: 'มีนาคม',
        year: 2019,
        holiday: 'วันพระ',
    },
    {
        key: '4',
        day: 4,
        month: 'เมษายน',
        year: 2020,
        holiday: 'วันปีใหม่',
    },
    {
        key: '5',
        day: 5,
        month: 'พฤษภาคม',
        year: 2021,
        holiday: 'วันแรงงานแห่งชาติ',
    },
    {
        key: '6',
        day: 6,
        month: 'มิถุนายน',
        year: 2022,
        holiday: 'วันวิสาขบูชา',
    },
    {
        key: '7',
        day: 7,
        month: 'กรกฎาคม',
        year: 2023,
        holiday: 'วันอาสาฬหบูชา',
    },
    {
        key: '8',
        day: 8,
        month: 'สิงหาคม',
        year: 2023,
        holiday: 'วันฉัตรมงคล',
    },
    {
        key: '9',
        day: 9,
        month: 'กันยายน',
        year: 2023,
        holiday: 'วันสงกรานต์',
    },
    {
        key: '10',
        day: 10,
        month: 'ตุลาคม',
        year: 2023,
        holiday: 'วันแม่แห่งชาติ',
    },

];

const rowSelection = {
    // onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
    //     console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    // },
    // getCheckboxProps: (record: DataType) => ({
    //     disabled: record.name === 'Disabled User',
    //     name: record.name,
    // }),
};

const TableHoliday: React.FC = () => {
    const token = useToken();
    const [selectionType, setSelectionType] = useState<'checkbox' | 'radio'>('checkbox');

    return (
        <>
            <div>
                {/* <Radio.Group
                    onChange={({ target: { value } }) => {
                        setSelectionType(value);
                    }}
                    value={selectionType}
                >
                    <Radio value="checkbox">เลือกได้หลายรายการ</Radio>
                    <Radio value="radio">เลือกได้แค่หนึ่งรายการ</Radio>
                </Radio.Group> */}

                <Table
                    rowSelection={{
                        type: selectionType,
                        ...rowSelection,
                    }}
                    columns={columns}
                    dataSource={data}
                    // pagination={{ pageSize: 5 }}
                    pagination={false}
                // scroll={{ x: '45vh', y: '35vh', }}
                />
            </div>
        </>
    )
};

export default TableHoliday;