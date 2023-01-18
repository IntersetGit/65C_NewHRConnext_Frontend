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
        year: 2020,
        holiday: 'วันเด็ก',
    },
    {
        key: '2',
        day: 2,
        month: 'กุมภาพันธ์',
        year: 2021,
        holiday: 'วันครู',
    },
    {
        key: '3',
        day: 3,
        month: 'มีนาคม',
        year: 2022,
        holiday: 'วันพระ',
    },
    {
        key: '4',
        day: 4,
        month: 'เมษายน',
        year: 2023,
        holiday: 'วันปีใหม่',
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
                <Radio.Group
                    onChange={({ target: { value } }) => {
                        setSelectionType(value);
                    }}
                    value={selectionType}
                >
                    <Radio value="checkbox">เลือกได้หลายรายการ</Radio>
                    <Radio value="radio">เลือกได้แค่หนึ่งรายการ</Radio>
                </Radio.Group>

                <Divider style={{ backgroundColor: token.token.colorPrimary }} />

                <Table
                    rowSelection={{
                        type: selectionType,
                        ...rowSelection,
                    }}
                    columns={columns}
                    dataSource={data}
                />
            </div>
        </>
    )
};

export default TableHoliday;