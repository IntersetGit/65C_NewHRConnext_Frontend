import React, { useState } from 'react';
import { Divider, Radio, Table, theme } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { HOLIDAY_YEAR } from '../../../service/graphql/Holiday';
import { useQuery, useMutation } from '@apollo/client';

const { useToken } = theme;

interface DataType {
    key: React.Key;
    day: number;
    month: string;
    year: number;
    holiday_name: string;
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
        render: (record) => {
            return (
                <div>
                    {
                        record === 1
                            ? 'มกราคม'
                            : record === 2
                                ? 'กุมภาพันธ์'
                                : record === 3
                                    ? 'มีนาคม'
                                    : record === 4
                                        ? 'เมษายน'
                                        : record === 5
                                            ? 'พฤษภาคม'
                                            : record === 6
                                                ? 'มิถุนายน'
                                                : record === 7
                                                    ? 'กรกฎาคม'
                                                    : record === 8
                                                        ? 'สิงหาคม'
                                                        : record === 9
                                                            ? 'กันยายน'
                                                            : record === 10
                                                                ? 'ตุลาคม'
                                                                : record === 11
                                                                    ? 'พฤศจิกายน'
                                                                    : 'ธันวาคม'
                    }
                </div>
            );
        },
    },
    {
        title: 'ปี',
        dataIndex: 'year',
        align: 'center',
    },
    {
        title: 'วันหยุด',
        dataIndex: 'holiday_name',
        render: (text: string) => <a>{text}</a>,
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
    // const [HolidayYear] = useMutation(HOLIDAY_YEAR);
    const { data } = useQuery(HOLIDAY_YEAR)

    console.log(data)

    return (
        <>
            <div>
                <Table
                    rowKey={'id'}
                    rowSelection={{
                        type: selectionType,
                        ...rowSelection,
                    }}
                    columns={columns}
                    dataSource={data?.GetHoliDayYear as any}
                    // pagination={{ pageSize: 5 }}
                    pagination={false}
                // scroll={{ x: '45vh', y: '35vh', }}
                />
            </div>
        </>
    )
};

export default TableHoliday;