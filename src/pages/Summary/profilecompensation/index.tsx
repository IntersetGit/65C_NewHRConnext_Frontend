import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Select,
  Space,
  Table,
  theme,
  Dropdown,
  Menu,
  Avatar,
  Drawer,
  DatePicker,
  InputNumber,
} from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker';
import { AntDesignOutlined, MoreOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2';
import { GiReceiveMoney } from 'react-icons/gi';
import type { ColumnsType } from 'antd/es/table';
import edit from '../../../assets/Edit.png';
import Slip from '../../../assets/Slip.png';
import View from '../../../assets/View.png';
import Del from '../../../assets/Del.png';

import dayjs from 'dayjs';
import { generatePath, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';

import {
  FETCH_AllSALARY_USER,
  FETCH_ExpenseCompany,
  FETCH_GETALLBOOKBANK_LOG,
  FETCH_Filter_BOOKBANK_ADMIN,
  FETCH_Show_PervspUser,
  Create_UpdateSalary,
  FETCH_SALARY_SLIP,
  Delete_Salary,
} from '../../../service/graphql/Summary';

import { FETCH_GETALL_POSITION } from '../../../service/graphql/Position';
import { getFilePath } from '../../../util';

const { useToken } = theme;

const Compensation: React.FC = () => {
  const token = useToken();
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [formshow] = Form.useForm();
  const sumIncome = Form.useWatch('total_income', form);
  const sumExpense = Form.useWatch('total_expense', form);
  const navigate = useNavigate();
  const [drawerType, setDrawerType] = useState(1);
  const [selectedRow, setselectedRow] = useState<any>();
  const [filter, setFilter] = useState<any[]>([]);

  const location = useLocation();
  let propsstate = location.state as any;
  //console.log(propsstate);

  const { data: position_data } = useQuery(FETCH_GETALL_POSITION);
  const {
    data: TableDataSalary,
    refetch,
    called,
  } = useQuery(FETCH_AllSALARY_USER, {
    variables: { userId: propsstate?.userId },
  });
  const { data: ExpenseComData, refetch: refetch2 } =
    useQuery(FETCH_ExpenseCompany);
  const { data: book_bank_data, refetch: refetch3 } = useQuery(
    FETCH_GETALLBOOKBANK_LOG,
    {
      variables: { userId: propsstate?.userId },
    },
  );
  const { data: Filter_BookBank, refetch: refetch4 } = useQuery(
    FETCH_Filter_BOOKBANK_ADMIN,
    {
      variables: { userId: propsstate?.userId },
    },
  );
  const { data: Show_PervspUser, refetch: refetch5 } = useQuery(
    FETCH_Show_PervspUser,
    {
      notifyOnNetworkStatusChange: true,
    },
  );
  // console.log('firstfirstfirstfirstfirstfirstfirst', Show_PervspUser)
  const [create_update_salary] = useMutation(Create_UpdateSalary);
  const [createSlip] = useMutation(FETCH_SALARY_SLIP, {
    notifyOnNetworkStatusChange: true,
  });
  const [deleteSalary] = useMutation(Delete_Salary);

  useEffect(() => {
    const arr: any[] = [];
    TableDataSalary?.salary?.salary?.forEach((e) => {
      if (arr.find((_e) => _e.value === e?.years)) return;
      arr.push({ label: e?.years, value: e?.years });
    });
    // console.log(arr);
    setFilter(arr);
  }, [called]);

  useEffect(() => {
    refetch();
    refetch2();
    refetch3();
    refetch4();
  }, []);

  useEffect(() => {
    form.setFieldValue('net', sumIncome - sumExpense);
  }, [sumIncome, sumExpense]);

  const onchangeselect = () => {
    refetch({ years: formshow.getFieldValue('years') });
  };

  const showDrawer = (type: any) => {
    setOpen(true);
    setDrawerType(type);
  };

  const onClose = () => {
    form.resetFields();
    setOpen(false);
  };

  const genarateMenu = (record: any) => {
    let month_s = dayjs(record.date).format('MM');
    let year_s = dayjs(record.date).format('YYYY');
    let cal_date_salary_s = dayjs(record.cal_date_salary).format('MM');
    let cal_year_s = dayjs(record.cal_date_salary).format('YYYY');
    // console.log('1month_s', month_s)
    // console.log('2cal_date_salary_s', cal_date_salary_s)
    return [
      {
        key: 'view',
        label: 'ดูข้อมูล',
        icon: <img style={{ width: '17px', height: '17px' }} src={View} />,
        onClick: (e: any) => onMenuClick(e, record),
      },
      {
        key: 'edit',
        label: 'แก้ไข',
        disabled:
          dayjs(record.unix).unix() <= record.date && month_s < cal_date_salary_s && year_s <= cal_year_s,
        icon: <img style={{ width: '17px', height: '17px' }} src={edit} />,
        onClick: (e: any) => onMenuClick(e, record),
      },
      {
        key: 'view_slip',
        label: 'ดูสลิปเงินเดือน',
        icon: <img style={{ width: '18px', height: '18px' }} src={Slip} />,
        onClick: (e: any) => onMenuClick(e, record),
      },
      {
        key: 'delete',
        label: 'ลบข้อมูล',
        icon: <img style={{ width: '20px', height: '20px' }} src={Del} />,
        onClick: (e: any) => onMenuClick(e, record),
      }, // ทำไว้ลบข้อมูลตอนเทส แต่ตอน deploy ไม่ต้องเปิด
    ];
  };

  const onMenuClick = (event: any, record: any) => {
    const { key } = event;
    if (key === 'edit') {
      showDrawer(2);
      setselectedRow(record);
      // console.log('recordrecordrecordrecordrecord', record)
      form.setFieldsValue({
        ...record,
        date: record.date ? dayjs(record.date) : undefined,
        base_salary:
          Show_PervspUser?.show_pervspUser?.[0]?.bookbank_log?.[0]?.base_salary,
        vat_per:
          Show_PervspUser?.show_pervspUser?.[0]?.companyBranch
            ?.expense_company?.[0]?.vat_per,
        ss_per:
          Show_PervspUser?.show_pervspUser?.[0]?.companyBranch
            ?.expense_company?.[0]?.ss_per,
        provident_emp:
          Show_PervspUser?.show_pervspUser?.[0]?.bookbank_log?.[0]
            ?.provident_emp,
        commission: record.commission ? record.commission : 0,
        position_income: record.position_income ? record.position_income : 0,
        special_income: record.special_income ? record.special_income : 0,
        ot: record.ot ? record.ot : 0,
        other_income: record.other_income ? record.other_income : 0,
        travel_income: record.travel_income ? record.travel_income : 0,
        bursary: record.bursary ? record.bursary : 0,
        welfare_money: record.welfare_money ? record.welfare_money : 0,
        bonus: record.bonus ? record.bonus : 0,
        miss: record.miss ? record.miss : 0,
        ra: record.ra ? record.ra : 0,
        late: record.late ? record.late : 0,
        other: record.other ? record.other : 0,
      });
      refetch5({
        userId: propsstate?.userId,
        date: record.date ? dayjs(record.date) : (undefined as any),
      });
    } else if (key === 'view') {
      showDrawer(3);
      form.setFieldsValue({
        ...record,
        date: record.date ? dayjs(record.date) : undefined,
        base_salary:
          Show_PervspUser?.show_pervspUser?.[0]?.bookbank_log?.[0]?.base_salary,
        vat_per:
          Show_PervspUser?.show_pervspUser?.[0]?.companyBranch
            ?.expense_company?.[0]?.vat_per,
        ss_per:
          Show_PervspUser?.show_pervspUser?.[0]?.companyBranch
            ?.expense_company?.[0]?.ss_per,
        provident_emp:
          Show_PervspUser?.show_pervspUser?.[0]?.bookbank_log?.[0]
            ?.provident_emp,
        commission: record.commission ? record.commission : 0,
        position_income: record.position_income ? record.position_income : 0,
        special_income: record.special_income ? record.special_income : 0,
        ot: record.ot ? record.ot : 0,
        other_income: record.other_income ? record.other_income : 0,
        travel_income: record.travel_income ? record.travel_income : 0,
        bursary: record.bursary ? record.bursary : 0,
        welfare_money: record.welfare_money ? record.welfare_money : 0,
        bonus: record.bonus ? record.bonus : 0,
        miss: record.miss ? record.miss : 0,
        ra: record.ra ? record.ra : 0,
        late: record.late ? record.late : 0,
        other: record.other ? record.other : 0,
      });
      refetch5({
        userId: propsstate?.userId,
        date: record.date ? dayjs(record.date) : (undefined as any),
      });
      setselectedRow(record);
    } else if (key === 'view_slip') {
      // navigate(`payslip`);
      // console.log(record)
      createSlip({
        variables: { date: record.date, userId: record.userId },
      }).then((rec) => {
        window.open(rec.data?.SalarySlip?.path as string, '_blank');
      });
    } else if (key === 'delete') {
      Swal.fire({
        title: `ยืนยันการลบข้อมูลคำนวณเงินเดือน`,
        icon: 'warning',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonColor: token.token.colorPrimary,
        denyButtonColor: '#ea4e4e',
        confirmButtonText: 'ตกลง',
        denyButtonText: `ยกเลิก`,
      }).then(async (result) => {
        if (result.isConfirmed) {
          deleteSalary({
            variables: {
              salaryid: record.id,
              userId: record.userId,
            },
          })
            .then((val) => {
              if (val.data?.DeleteSalary?.status) {
                Swal.fire(`ลบข้อมูลคำนวณเงินเดือนสำเร็จ!`, '', 'success');
                refetch();
                refetch2();
                refetch3();
                refetch4();
              }
            })
            .catch((err) => {
              Swal.fire(`ลบข้อมูลคำนวณเงินเดือนไม่สำเร็จ!`, '', 'error');
              console.error(err);
            });
        }
      });
    }
  };

  const onSubmitForm = (value: any) => {
    //console.log('คำนวณ', value);
    drawerType === 1
      ? Swal.fire({
        title: `ยืนยันการคำนวณเงินเดือน`,
        icon: 'warning',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonColor: token.token.colorPrimary,
        denyButtonColor: '#ea4e4e',
        confirmButtonText: 'ตกลง',
        denyButtonText: `ยกเลิก`,
      }).then(async (result) => {
        if (result.isConfirmed) {
          var calsum = 0;
          if (value.date !== undefined) {
            let cal1 = Show_PervspUser?.show_pervspUser?.[0]
              ?.bookbank_log?.[0]?.base_salary as any;
            let cal2 = Show_PervspUser?.show_pervspUser?.[0]
              ?.bookbank_log?.[0]?.provident_com as any;
            calsum = cal1 * (cal2 / 100);
          }
          var sentIdMasBank = '';
          if (value.date !== undefined) {
            let IDMasBank = Filter_BookBank?.filter_bookbank_admin?.[0]
              ?.mas_bank?.id as any;
            sentIdMasBank = IDMasBank;
          }
          let sentData = {
            ...value,
            userId: propsstate?.userId,
            provident_company: calsum,
            mas_bankId: sentIdMasBank,
            vat: parseFloat(value.vat),
          };
          delete sentData.base_salary;
          delete sentData.vat_per;
          delete sentData.provident_emp;
          delete sentData.ss_per;

          create_update_salary({
            variables: {
              data: sentData,
            },
          })
            .then((val) => {
              console.log(val);
              if (val.data?.Createandupdatesalary?.status) {
                Swal.fire(`คำนวณเงินเดือนสำเร็จ!`, '', 'success');
                refetch();
                refetch2();
                refetch3();
                refetch4();
                refetch5();
                form.resetFields();
              }
            })
            .catch((err) => {
              Swal.fire({
                title: 'คำนวณเงินเดือนไม่สำเร็จ!',
                text: `ไม่สามารถคำนวณเงินเดือนได้ กรุณาตั้งค่าการคำนวณเงินเดือน (ตั้งค่าการหักภาษีและประกันสังคม)`,
                icon: 'error',
              });
              console.error(err);
            });
        }
      })
      : Swal.fire({
        title: `ยืนยันการแก้ไขคำนวณเงินเดือน`,
        icon: 'warning',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonColor: token.token.colorPrimary,
        denyButtonColor: '#ea4e4e',
        confirmButtonText: 'ตกลง',
        denyButtonText: `ยกเลิก`,
      }).then(async (result) => {
        if (result.isConfirmed) {
          var calsum = 0;
          if (value.date !== undefined) {
            let cal1 = Show_PervspUser?.show_pervspUser?.[0]
              ?.bookbank_log?.[0]?.base_salary as any;
            let cal2 = Show_PervspUser?.show_pervspUser?.[0]
              ?.bookbank_log?.[0]?.provident_com as any;
            calsum = cal1 * (cal2 / 100);
          }
          var sentIdMasBank = '';
          if (value.date !== undefined) {
            let IDMasBank = Filter_BookBank?.filter_bookbank_admin?.[0]
              ?.mas_bank?.id as any;
            sentIdMasBank = IDMasBank;
          }
          let sentData = {
            ...value,
            userId: propsstate?.userId,
            provident_company: calsum,
            mas_bankId: sentIdMasBank,
            id: selectedRow?.id,
            vat: parseFloat(value.vat),
          };
          delete sentData.base_salary;
          delete sentData.vat_per;
          delete sentData.provident_emp;
          delete sentData.ss_per;
          create_update_salary({
            variables: {
              data: sentData,
            },
          })
            .then((val) => {
              console.log(val);
              if (val.data?.Createandupdatesalary?.status) {
                Swal.fire(`แก้ไขข้อมูลคำนวณเงินเดือนสำเร็จ!`, '', 'success');
                refetch();
                refetch2();
                refetch3();
                refetch4();
                refetch5();
                form.resetFields();
              }
              form.resetFields();
            })
            .catch((err) => {
              Swal.fire(`แก้ไขข้อมูลคำนวณเงินเดือนไม่สำเร็จ!`, '', 'error');
              console.error(err);
              form.resetFields();
            });
        }
      });
    setOpen(false);
  };
  useEffect(() => {
    form.setFieldsValue({
      base_salary:
        Show_PervspUser?.show_pervspUser?.[0]?.bookbank_log?.[0]?.base_salary,
      vat_per:
        Show_PervspUser?.show_pervspUser?.[0]?.companyBranch
          ?.expense_company?.[0]?.vat_per,
      ss_per:
        Show_PervspUser?.show_pervspUser?.[0]?.companyBranch
          ?.expense_company?.[0]?.ss_per,
      provident_emp:
        Show_PervspUser?.show_pervspUser?.[0]?.bookbank_log?.[0]?.provident_emp,
    });
    const valueall = form.getFieldsValue();
    //console.log('Show_PervspUser', Show_PervspUser)
    if (valueall.date !== undefined) {
      let Vat_item = Show_PervspUser?.show_pervspUser
        ? Show_PervspUser?.show_pervspUser?.[0]?.companyBranch
          ?.expense_company?.[0]?.check_vat
        : ([] as any);
      // let Val_item_cal = Vat_item.map(i => column[''] ? parseFloat(column['']) : 0).reduce((val, a) => val + a, 0)
      let Val_item_cal = Vat_item.map((i) =>
        valueall[i] ? parseFloat(valueall[i]) : 0,
      ).reduce((val, a) => val + a, 0);
      //console.log('Val_item_cal', Val_item_cal)
    }
    onChangeFormvalue({ base_salary: '' }, valueall);
    const SS_CAl = () => {
      let SSCal =
        parseFloat(form.getFieldValue('base_salary')) *
        (parseFloat(form.getFieldValue('ss_per')) / 100);
      if (SSCal >= 750) {
        form.setFieldValue('social_security', 750);
        SSCal = 750;
      } else {
        form.setFieldValue('social_security', SSCal);
      }

      let provident_EMPCal =
        parseFloat(form.getFieldValue('base_salary')) *
        (parseFloat(form.getFieldValue('provident_emp')) / 100);
      form.setFieldValue('provident_employee', provident_EMPCal);

      let vatCal =
        parseFloat(form.getFieldValue('base_salary')) *
        (parseFloat(form.getFieldValue('vat_per')) / 100);
      form.setFieldValue('vat', vatCal ? vatCal : 0);
      // let = ExpenseComData?.expense_company?.check_vat
      // ExpenseComData?.expense_company?.check_vat?.
      // .map(i=>map[i] ? parseFloat(map[i]) : 0).reduce((val, a) => val + a, 0);
      let summinus1 = vatCal + SSCal + provident_EMPCal;
      form.setFieldValue('total_expense', summinus1);
    };
    SS_CAl();
  }, [Show_PervspUser]);
  const onChangeDate = (date) => {
    // console.log(date.format("YYYY-MM-DD"));
    // const result = dayjs(pickDate).format("YYYY-MM-DD") as any
    // console.log(result);
    // setPickDate(date)
    refetch5({ userId: propsstate?.userId, date: date });
    //console.log("RRRRRRR", Show_PervspUser)
    // if (propsstate?.userId === propsstate?.userId)
  };

  // const disabledDate: RangePickerProps['disabledDate'] = (current) => {
  //   let size: any = TableDataSalary?.salary?.salary?.length;
  //   const date: any = TableDataSalary?.salary?.salary?.[size - 1]?.date;
  //   // console.log("1234564897984512156", date);
  //   return current && current < dayjs(new Date(date)).add(1, 'month');
  // };

  const disabledDate: RangePickerProps['disabledDate'] = (current) => {

    let getAllMonth: any = TableDataSalary?.salary?.salary && TableDataSalary?.salary?.salary.map((item) => dayjs(new Date(item?.date)));
    var yesDay = false;
    getAllMonth.forEach((day) => current.isSame(day, 'month') && (yesDay = true))
    // console.log(current.format("MM/YYYY"), dayjs(new Date(date)).format("MM/YYYY"), current.isSame(dayjs(new Date(date)), 'month'));
    return yesDay;
  };


  const columns: ColumnsType<any> = [
    {
      title: 'เดือน/ปี',
      key: 'date',
      align: 'center',
      render: (text: any, record: any) =>
        text
          ? (dayjs(`${record.month}/${record.years}`, 'MM/YYYY').format(
            'MMMM' + ' ' + 'YYYY',
          ) as any)
          : '',
    },
    {
      title: 'รายได้รวม',
      key: 'total_income',
      dataIndex: 'total_income',
      align: 'center',
      render: (record) => {
        return <div>{record.toFixed(2) ?? '-'} </div>;
      },
    },
    {
      title: 'รายหักรวม',
      key: 'total_expense',
      dataIndex: 'total_expense',
      align: 'center',
      render: (record) => {
        return <div>{record.toFixed(2) ?? '-'} </div>;
      },
    },
    {
      title: 'รายได้สุทธิ',
      key: 'net',
      dataIndex: 'net',
      align: 'center',
      render: (record) => {
        return <div>{record.toFixed(2) ?? '-'}</div>;
      },
    },
    {
      title: 'สถานะ',
      key: 'mas_salary_statusId',
      dataIndex: 'mas_salary_statusId',
      align: 'center',
      render: (record) => {
        if (record == '765d31b6-ab63-11ed-afa1-0242ac120002') {
          return 'คำนวณสำเร็จ';
        }
      },
    },
    {
      title: 'Action',
      key: 'Action',
      align: 'center',
      render: (_: any, record: any) => (
        <Dropdown
          menu={{
            items: genarateMenu(record),
          }}
          arrow
        >
          <MoreOutlined />
        </Dropdown>
      ),
    },
  ];

  const onChangeFormvalue = (column, all) => {
    //console.log('column,all', column, all);
    if (
      Object.keys(column)[0] in
      {
        date: '',
      }
    ) {
      form.setFieldsValue({
        base_salary: undefined,
        commission: undefined,
        position_income: undefined,
        special_income: undefined,
        ot: undefined,
        other_income: undefined,
        travel_income: undefined,
        bursary: undefined,
        welfare_money: undefined,
        bonus: undefined,
      });
      onChangeDate(column.date);
    }
    const sum = () => {
      let sumval =
        parseFloat(all.base_salary ? all.base_salary : 0) +
        parseFloat(all.commission ? all.commission : 0) +
        parseFloat(all.position_income ? all.position_income : 0) +
        parseFloat(all.special_income ? all.special_income : 0) +
        parseFloat(all.ot ? all.ot : 0) +
        parseFloat(all.other_income ? all.other_income : 0) +
        parseFloat(all.travel_income ? all.travel_income : 0) +
        parseFloat(all.bursary ? all.bursary : 0) +
        parseFloat(all.welfare_money ? all.welfare_money : 0) +
        parseFloat(all.bonus ? all.bonus : 0);
      //console.log(sumval);
      form.setFieldValue('total_income', sumval);
    };

    const minus = () => {
      let sumval =
        parseFloat(all.base_salary ? all.base_salary : 0) +
        parseFloat(all.commission ? all.commission : 0) +
        parseFloat(all.position_income ? all.position_income : 0) +
        parseFloat(all.special_income ? all.special_income : 0) +
        parseFloat(all.ot ? all.ot : 0) +
        parseFloat(all.other_income ? all.other_income : 0) +
        parseFloat(all.travel_income ? all.travel_income : 0) +
        parseFloat(all.bursary ? all.bursary : 0) +
        parseFloat(all.welfare_money ? all.welfare_money : 0) +
        parseFloat(all.bonus ? all.bonus : 0);
      //console.log(sumval);
      if (all.date !== undefined) {
        let Vat_item = Show_PervspUser?.show_pervspUser
          ? Show_PervspUser?.show_pervspUser?.[0]?.companyBranch
            ?.expense_company?.[0]?.check_vat
          : ([] as any);
        var Val_item_cal = Vat_item.map((i) =>
          all[i] ? parseFloat(all[i]) : 0,
        ).reduce((val, a) => val + a, 0);
        // console.log('Val_item_calLLLLLLL', Val_item_cal)
      }
      let vatCal =
        parseFloat(Val_item_cal) *
        (parseFloat(form.getFieldValue('vat_per')) / 100);
      form.setFieldValue('vat', vatCal.toFixed(2) ? vatCal.toFixed(2) : 0);
      let SSCal = parseFloat(all.base_salary) * (parseFloat(all.ss_per) / 100);
      if (SSCal >= 750) {
        form.setFieldValue('social_security', 750);
        SSCal = 750;
      } else {
        form.setFieldValue('social_security', SSCal);
      }

      let provident_EMPCal =
        parseFloat(form.getFieldValue('base_salary')) *
        (parseFloat(form.getFieldValue('provident_emp')) / 100);
      form.setFieldValue('provident_employee', provident_EMPCal);

      let minusVal =
        parseFloat(all.miss ? all.miss : 0) +
        parseFloat(all.ra ? all.ra : 0) +
        parseFloat(all.late ? all.late : 0) +
        parseFloat(all.other ? all.other : 0);

      let sumExAll = vatCal + provident_EMPCal + SSCal + minusVal;
      //console.log(sumExAll);
      form.setFieldValue('total_expense', sumExAll);
    };

    if (
      Object.keys(column)[0] in
      {
        base_salary: '',
        commission: '',
        position_income: '',
        special_income: '',
        ot: '',
        other_income: '',
        travel_income: '',
        bursary: '',
        welfare_money: '',
        bonus: '',
      }
    ) {
      sum();
    }
    if (
      Object.keys(column)[0] in
      {
        // vat: '',
        // social_security: '',
        // provident_emp: '',
        base_salary: '',
        commission: '',
        position_income: '',
        special_income: '',
        ot: '',
        other_income: '',
        travel_income: '',
        bursary: '',
        welfare_money: '',
        bonus: '',
        miss: '',
        ra: '',
        late: '',
        other: '',
      }
    ) {
      minus();
    }
  };
  return (
    <>
      <div className="flex text-3xl ml-2 pt-4">
        <GiReceiveMoney />
        <div className="ml-2 text-xl">
          ข้อมูลเงินเดือน ( ค่าล่วงเวลา ค่าบริหาร เบี้ยขยัน และ อื่น ๆ )
        </div>
      </div>

      <Divider />

      <Card className="shadow-xl">
        <Row gutter={16}>
          <Col xs={24} sm={24} md={4} lg={4} xl={4}>
            <div>
              <Avatar
                size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                icon={<AntDesignOutlined />}
                src={getFilePath() + propsstate?.avatar}
              ></Avatar>
            </div>
          </Col>

          <Col xs={24} sm={24} md={4} lg={4} xl={4}>
            <div className="text-lg font-bold">
              <u className="text-blue-800">
                {propsstate?.profile?.prefix_th}{' '}
                {propsstate?.profile?.firstname_th}{' '}
                {propsstate?.profile?.lastname_th}
              </u>
              <div className="mt-4">
                {propsstate?.Position_user?.[0]?.mas_positionlevel3?.name ??
                  'ไม่มีตำแหน่งงาน'}
              </div>
            </div>
          </Col>
        </Row>

        <Form form={formshow} size="middle">
          <Row gutter={16}>
            <Col xs={24} sm={24} md={24} lg={9} xl={6}>
              <Form.Item
                name="base_salary"
                colon={false}
                label={'ฐานเงินเดือน'}
                initialValue={propsstate?.bookbank_log[0]?.base_salary ? propsstate?.bookbank_log[0]?.base_salary : 0.00}
              >
                <Input
                  allowClear
                  disabled
                ></Input>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={24} md={24} lg={9} xl={6}>
              <Form.Item
                name="bank_number"
                colon={false}
                label={'เลขบัญชี'}
                style={{ marginLeft: '24px' }}
                initialValue={propsstate?.bookbank_log[0]?.bank_number ? propsstate?.bookbank_log[0]?.bank_number : 'ไม่มีเลขบัญชี'}
              >
                <Input
                  allowClear
                  disabled
                ></Input>
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={24} lg={9} xl={6}>
              <Form.Item
                name="bank"
                colon={false}
                label={'ธนาคาร'}
                style={{ marginLeft: '32px' }}
                initialValue={propsstate?.bookbank_log[0]?.mas_bank?.name ? propsstate?.bookbank_log[0]?.mas_bank?.name : 'ไม่มีบัญชีธนาคาร'}
              >
                <Input
                  allowClear
                  disabled
                ></Input>
              </Form.Item>
            </Col>
          </Row>

          <Row
            gutter={16}
            style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <Col xs={24} sm={24} md={24} lg={9} xl={6}>
              <Form.Item
                name="years"
                colon={false}
                label={'ปี'}
                style={{ marginLeft: '66px' }}
              >
                <Select
                  allowClear
                  options={filter}
                  onChange={onchangeselect}
                ></Select>
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={24} lg={4} xl={4}>
              <Space>
                <Form.Item>
                  <Button
                    type="primary"
                    style={{ backgroundColor: token.token.colorPrimary }}
                    onClick={() => {
                      showDrawer(1);
                      // form.setFieldsValue({
                      //     base_salary: Show_PervspUser?.[0]?.bookbank_log?.base_salary,
                      //     vat_per: Show_PervspUser?.[0]?.companyBranch?.expense_company?.vat_per,
                      //     ss_per: Show_PervspUser?.[0]?.companyBranch?.expense_company?.ss_per,
                      //     provident_emp: Show_PervspUser?.[0]?.bookbank_log?.provident_emp,
                      // });
                    }}
                  >
                    คำนวณเงินเดือน
                  </Button>
                </Form.Item>
              </Space>
            </Col>
          </Row>
        </Form>
      </Card>
      <Card className="shadow-xl mt-4">
        <Table
          rowKey={'id'}
          columns={columns}
          scroll={{ x: 1500 }}
          dataSource={TableDataSalary?.salary?.salary as any}
        />
      </Card>

      <Drawer
        title={`${drawerType === 1
          ? 'คำนวณเงินเดือน'
          : drawerType === 2
            ? 'แก้ไขคำนวณเงินเดือน'
            : 'เงินเดือน'
          }`}
        onClose={onClose}
        open={open}
        // afterOpenChange={setPer}
        width={500}
      >
        <div className="text-lg font-bold">
          <u style={{ color: token.token.colorPrimary }}>
            {propsstate?.profile?.prefix_th} {propsstate?.profile?.firstname_th}{' '}
            {propsstate?.profile?.lastname_th}
          </u>
          <div className="mt-4">
            {propsstate?.Position_user?.[0]?.mas_positionlevel3?.name ??
              'ไม่มีตำแหน่งงาน'}
          </div>
        </div>

        <Form
          layout="horizontal"
          onValuesChange={onChangeFormvalue}
          form={form}
          onFinish={onSubmitForm}
        >
          <Row>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Form.Item
                name="date"
                label={'เดือน/ปี'}
                className=" ml-[82px] mt-6"
                rules={[
                  {
                    required: true,
                    message: 'โปรดเลือกเดือน/ปี !',
                  },
                ]}
              >
                {drawerType == 1 ? (
                  <DatePicker
                    picker="month"
                    format={'MM/YYYY'}
                    disabledDate={disabledDate}
                  />
                ) : (
                  <DatePicker
                    picker="month"
                    format={'MM/YYYY'}
                    disabledDate={disabledDate}
                    disabled={drawerType === 3 ? true : false}
                  />
                )}
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <div className="text-[18px] ">
                <u>รายรับ</u>
              </div>
            </Col>
          </Row>

          <Row>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Form.Item
                name="base_salary"
                label={'ฐานเงินเดือน'}
                className="ml-[52px]"
                initialValue={0.00}
              >
                <InputNumber
                  step="0.01"
                  disabled style={{ width: '100%' }}
                  formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Form.Item
                name="commission"
                label={'ค่าคอมมิชชั่น'}
                className="ml-[52px]"
                initialValue={0}
              >
                <InputNumber
                  style={{ width: '100%' }}
                  disabled={drawerType === 3 ? true : false}
                  // formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + value?.toString().includes(".") ? `.${value?.toString()?.split('.')[1]}` : ''}
                  formatter={(value) => {
                    return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                  }}
                  parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}

                />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Form.Item
                name="position_income"
                label={'ค่าตำแหน่ง'}
                className="ml-[63px]"
                initialValue={0}
              >
                <InputNumber
                  style={{ width: '100%' }}
                  disabled={drawerType === 3 ? true : false}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Form.Item
                name="special_income"
                label={'เงินพิเศษ'}
                className="ml-[72px]"
                initialValue={0}
              >
                <InputNumber
                  style={{ width: '100%' }}
                  disabled={drawerType === 3 ? true : false}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Form.Item name="ot" label={'ค่าล่วงเวลา'} className="ml-[59px]" initialValue={0.00}>
                <InputNumber
                  style={{ width: '100%' }}
                  disabled={drawerType === 3 ? true : false}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Form.Item
                name="other_income"
                label={'รายได้อื่น'}
                className="ml-[72px]"
                initialValue={0}
              >
                <InputNumber
                  style={{ width: '100%' }}
                  disabled={drawerType === 3 ? true : false}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Form.Item
                name="travel_income"
                label={'ค่าเดินทาง'}
                className="ml-[64px]"
                initialValue={0}
              >
                <InputNumber
                  style={{ width: '100%' }}
                  disabled={drawerType === 3 ? true : false}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Form.Item
                name="bursary"
                label={'เงินอุดหนุน'}
                className="ml-[60px]"
                initialValue={0}
              >
                <InputNumber
                  style={{ width: '100%' }}
                  disabled={drawerType === 3 ? true : false}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Form.Item
                name="welfare_money"
                label={'เงินสวัสดิการ'}
                className="ml-[47px]"
                initialValue={0}
              >
                <InputNumber
                  style={{ width: '100%' }}
                  disabled={drawerType === 3 ? true : false}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Form.Item name="bonus" label={'เงินโบนัส'} className="ml-[73px]" initialValue={0}>
                <InputNumber
                  style={{ width: '100%' }}
                  disabled={drawerType === 3 ? true : false}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Form.Item
                name="total_income"
                label={'รายได้รวม'}
                className="ml-[65px]"
                initialValue={0}
              >
                <InputNumber style={{ width: '100%' }} disabled />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <div className="text-[18px] ">
                <u>รายหัก</u>
              </div>
            </Col>
          </Row>

          <Row>
            <Col xs={24} sm={24} md={24} lg={24} xl={24} className="ml-12">
              <Space>
                <Form.Item name="vat_per" label={'ภาษี'} className="ml-[54px]" initialValue={0}>
                  <InputNumber className="w-16" disabled
                    formatter={(value) => `${value}%`}
                    parser={(value) => value!.replace('%', '')} />
                </Form.Item>

                <Form.Item name="vat" className="ml-[1px] w-full">
                  <InputNumber disabled className="w-[222px]" />
                </Form.Item>
              </Space>
            </Col>
          </Row>

          <Row>
            <Col xs={24} sm={24} md={24} lg={24} xl={24} className="ml-[53px]">
              <Space>
                <Form.Item name="ss_per"
                  label={'ประกันสังคม'}
                  initialValue={0}
                >
                  <InputNumber className="w-16" disabled
                    formatter={(value) => `${value}%`}
                    parser={(value) => value!.replace('%', '')}
                  />
                </Form.Item>

                <Form.Item name="social_security" className="ml-[0.5px] w-full">
                  <InputNumber disabled className="w-[222px]" />
                </Form.Item>
              </Space>
            </Col>
          </Row>

          <Row>
            <Col xs={24} sm={24} md={24} lg={24} xl={24} className="ml-[53px]">
              <Space>
                <Form.Item name="provident_emp" label={'กองทุนสะสม'} initialValue={0}>
                  <InputNumber className="w-16" disabled
                    formatter={(value) => `${value}%`}
                    parser={(value) => value!.replace('%', '')}
                  />
                </Form.Item>

                <Form.Item
                  name="provident_employee"
                  className="ml-[0.5px] w-full"
                >
                  <InputNumber disabled className="w-[222px]" />
                </Form.Item>
              </Space>
            </Col>
          </Row>

          <Row>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Form.Item name="miss" label={'ขาด'} className="ml-[102px]" initialValue={0}>
                <InputNumber
                  style={{ width: '100%' }}
                  disabled={drawerType === 3 ? true : false}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Form.Item name="ra" label={'ลา'} className="ml-[111px]" initialValue={0}>
                <InputNumber
                  style={{ width: '100%' }}
                  disabled={drawerType === 3 ? true : false}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Form.Item name="late" label={'มาสาย'} className="ml-[86px]" initialValue={0}>
                <InputNumber
                  style={{ width: '100%' }}
                  disabled={drawerType === 3 ? true : false}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Form.Item name="other" label={'อื่น ๆ'} className="ml-[95px]" initialValue={0}>
                <InputNumber
                  style={{ width: '100%' }}
                  disabled={drawerType === 3 ? true : false}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Form.Item
                name="total_expense"
                label={'รายหักรวม'}
                className="ml-[61px]"
                initialValue={0}
              >
                <InputNumber style={{ width: '100%' }} disabled />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Form.Item
                name="net"
                label={'รวมรายรับสุทธิ'}
                className="font-bold ml-[36px]"
                initialValue={0}
              >
                <InputNumber
                  disabled
                  style={{ background: '#CCFFFF', width: '100%' }}
                />
              </Form.Item>
            </Col>
          </Row>

          {drawerType === 1 && (
            <Row>
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Form.Item>
                  <Space
                    style={{
                      display: 'flex',
                      justifyContent: 'right',
                      marginTop: '10px',
                    }}
                  >
                    <Button
                      type="primary"
                      style={{
                        backgroundColor: token.token.colorPrimary,
                        width: '100px',
                      }}
                      htmlType="submit"
                      size="large"
                    >
                      คำนวณ
                    </Button>
                    <Button
                      size="large"
                      style={{ width: '100px' }}
                      onClick={onClose}
                    >
                      กลับ
                    </Button>
                  </Space>
                </Form.Item>
              </Col>
            </Row>
          )}

          {drawerType === 2 && (
            <Row>
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Form.Item>
                  <Space
                    style={{
                      display: 'flex',
                      justifyContent: 'right',
                      marginTop: '10px',
                    }}
                  >
                    <Button
                      type="primary"
                      style={{
                        backgroundColor: token.token.colorPrimary,
                        width: '100px',
                      }}
                      htmlType="submit"
                      size="large"
                    >
                      คำนวณ
                    </Button>
                    <Button
                      size="large"
                      style={{ width: '100px' }}
                      onClick={onClose}
                    >
                      กลับ
                    </Button>
                  </Space>
                </Form.Item>
              </Col>
            </Row>
          )}
        </Form>
      </Drawer>
    </>
  );
};

export default Compensation;
