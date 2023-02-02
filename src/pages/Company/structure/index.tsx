import React, { useState, useEffect, useRef } from 'react';
import { RiHotelLine } from 'react-icons/ri';
import { IoSwapVerticalOutline } from 'react-icons/io5';
import { useNavigate, useLocation } from 'react-router-dom';
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
  theme,
  Tree,
  TreeDataNode,
  Drawer,
} from 'antd';
import type { DataNode, TreeProps } from 'antd/es/tree';
import styled from 'styled-components';
import NodeStructure from './component/NodeStructure';
import { faker } from '@faker-js/faker';
import Swal from 'sweetalert2';
import { POSITION } from '../../../service/graphql/Position';
import { useMutation, useQuery } from '@apollo/client';
import { gql } from '../../../__generated__/gql';

const { TreeNode } = Tree;

const StyledTree = styled(Tree)`
  .ant-tree-list-holder {
    padding: 10px;
  }
  .ant-tree-title {
    width: 100%;
  }
  .ant-tree-treenode {
    align-items: center !important;
  }
  .ant-tree-switcher_close {
    align-self: auto !important;
  }
  .ant-tree-switcher_open {
    align-self: auto !important;
  }

  .ant-tree-treenode-disabled .ant-tree-node-content-wrapper {
    all: unset;
  }
  .ant-tree-node-content-wrapper {
    overflow: hidden;
  }
  .ant-tree-treenode-draggable.ant-tree-treenode-disabled
    .ant-tree-draggable-icon {
    visibility: hidden;
    display: none;
  }

  .ant-tree-indent-unit:before {
    position: absolute;
    top: 0;
    inset-inline-end: 12px;
    bottom: -4px;
    border-inline-end: 1px solid gray;
    content: '';
  }
  .ant-tree-switcher-leaf-line:before {
    position: absolute;
    top: 0;
    inset-inline-end: 12px;
    bottom: -4px;
    margin-inline-start: -1px;
    border-inline-end: 1px solid gray;
    content: '';
  }
  .ant-tree-switcher-leaf-line:after {
    position: absolute;
    width: 9.600000000000001px;
    height: 12px;
    border-bottom: 1px solid gray;
    content: '';
  }
  .drag-over-gap-top {
    border-top: 5px solid red;
  }
  .drag-over-gap-bottom {
    border-bottom: 5px solid red;
  }
`;
const StyledTreeCompany = styled(StyledTree)`
  .ant-tree-switcher-noop {
    display: none !important;
  }
`;

type AppProps = {
  number: string;
  title: string;
};

const x = 1;
const y = 1;
const z = 1;
const defaultData: DataNode[] = [];

const generateData = (
  _level: number,
  _preKey?: React.Key,
  _tns?: DataNode[],
) => {
  const preKey = _preKey || '0';
  const tns = _tns || defaultData;
  const randomName = faker.company.catchPhraseDescriptor();
  const children: React.Key[] = [];
  for (let i = 0; i < x; i++) {
    const key = `${preKey}-${i}`;
    tns.push({
      title: randomName,
      key,
    });
    if (i < y) {
      children.push(key);
    }
  }
  if (_level < 0) {
    return tns;
  }
  const level = _level - 1;
  children.forEach((key, index) => {
    tns[index].children = [];
    return generateData(level, key, tns[index].children);
  });
};
// generateData(z);

const convertDataToComponent = (data: any, level = 1) => {
  return data?.map((data: any, index: number) => {
    return {
      ['title']: data?.name,
      ['key']: data?.id,
      ['id']: data?.code,
      ['data']: data,
      ['children']: data['mas_positionlevel' + (level + 1)]
        ? convertDataToComponent(
            data['mas_positionlevel' + (level + 1)],
            level + 1,
          )
        : [],
    };
  });
};
const convertData = (data: any, level = 1) => {
  return data?.map((data: any, index: number) => {
    if (level + 1 == 4) {
      return {
        ['id_Position' + level]: data?.data?.id,
        ['name_Position' + level]: data?.title,
        ['level_Position' + level]: index + 1,
        ['code_position' + level]: data.id,
      };
    } else {
      return {
        ['id_Position' + level]: data?.data?.id,
        ['name_Position' + level]: data?.title,
        ['level_Position' + level]: index + 1,
        ['code_position' + level]: data.id,
        ['masPosition' + (level + 1)]: data.children
          ? convertData(data.children, level + 1)
          : [],
      };
    }
  });
};

const CompanyStructure: React.FC = () => {
  const { useToken } = theme;
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [formEdit] = Form.useForm();
  const token = useToken();
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [dataStructure, setDataStructure] = useState<any>(undefined);
  const { data, loading, refetch } = useQuery(POSITION);
  const [treestructure, setTreestructure] = useState([
    {
      title: 'เทคโนโลยี',
      key: '35b0913b-27a2-44ad-9153-bef2bfdae75d',
      id: 's1',
      children: [],
    },
    {
      title: 'ไอที',
      key: 'f440e39b-1b3a-4d52-ae82-bf9e0e02163f',
      id: 's2',
      children: [
        {
          title: 'บริหาร',
          key: '560605ff-3797-4217-86bd-737d63444ed2',
          id: 'b1',
          children: [],
        },
      ],
    },
  ]);
  const [treecompany, setTreecompany] = useState([
    {
      title: 'ฝ่าย',
      key: '1456',
      data: { title: 'ฝ่าย', id: '1', color: '#FFE1BA' },
    },
    {
      title: 'แผนก',
      key: '245',
      data: { title: 'แผนก', id: '2', color: '#FFC9B7' },
    },
    {
      title: 'ตำแหน่ง',
      key: '3213',
      data: { title: 'ตำแหน่ง', id: '3', color: '#FAAAAE' },
    },
  ]);

  const CREATEPOSITION = gql(`
    mutation CreatedPosition($data: [CreatedAndUpdatePosition!]) {
        CreatedPosition(data: $data) {
          message
          status
        }
      }`);
  const EDITPOSITION = gql(`
    mutation EditPosition($data: [CreatedAndUpdatePosition!]) {
        EditPosition(data: $data) {
          message
          status
        }
      }`);
  const [CreatedPosition] = useMutation(CREATEPOSITION);
  const [EditPosition] = useMutation(EDITPOSITION);

  // const [expandedKeys] = useState(['0-0-1']);

  useEffect(() => {
    // console.log('getMasPositon', data?.getMasPositon)
    // console.log('convertDataToComponent(getMasPositon) :>> ', convertDataToComponent(data?.getMasPositon));
    setTreestructure(convertDataToComponent(data?.getMasPositon));
  }, [loading]);
  const onDragEnter: TreeProps['onDragEnter'] = (info) => {
    // console.log("onDrageEnter");
    // expandedKeys
    // setExpandedKeys(info.expandedKeys)
  };

  const onDrop: TreeProps['onDrop'] = (info) => {
    console.log(info);
    const dropKey = info.node.key;
    const dragKey = info.dragNode.key;
    const dropPos = info.node.pos.split('-');
    const dropPosition =
      info.dropPosition - Number(dropPos[dropPos.length - 1]);
    const dragNodePos = info.dragNode.pos.split('-');
    const checkKeyAdd = dropKey.toString().split(' ');
    console.log('dropPos', dropPos, dragNodePos);
    // console.log('checkKeyAdd', checkKeyAdd)
    // console.log('showinfo', dropKey, dropPos, dropPosition)
    if (checkKeyAdd[0] == 'add') return;

    if (dropPos.length > treecompany.length) {
      if (!info.dropToGap) {
        return;
      }
    }
    let dropPosNew = dropPosition == 0 ? [...dropPos, dropPosition] : dropPos;
    console.log('dropPosNew', dropPosNew);

    if (dropPosNew.length !== dragNodePos.length) {
      // if (!info.dropToGap) {
      //     return;
      // }
      return;
    }

    // ------------------------------
    const loop = (
      data: DataNode[],
      key: React.Key,
      callback: (node: DataNode, i: number, data: DataNode[]) => void,
    ) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].key === key) {
          return callback(data[i], i, data);
        }
        if (data[i].children) {
          loop(data[i].children!, key, callback);
        }
      }
    };
    const data = [...treestructure];

    // Find dragObject
    let dragObj: DataNode;
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    if (!info.dropToGap) {
      // Drop on the content
      console.log('info.dropToGap1');

      loop(data, dropKey, (item) => {
        item.children = item.children || [];
        // where to insert
        item.children.unshift(dragObj);
      });
    } else if (
      ((info.node as any).props.children || []).length > 0 && // Has children
      (info.node as any).props.expanded && // Is expanded
      dropPosition === 1 // On the bottom gap
    ) {
      console.log('info.dropToGap2');
      loop(data, dropKey, (item) => {
        item.children = item.children || [];
        // where to insert
        item.children.unshift(dragObj);
        // in previous version, we use item.children.push(dragObj) to insert the
        // item to the tail of the children
      });
    } else {
      console.log('info.dropToGap3');
      let ar: DataNode[] = [];
      let i: number;
      loop(data, dropKey, (_item, index, arr) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        ar.splice(i!, 0, dragObj!);
      } else {
        ar.splice(i! + 1, 0, dragObj!);
      }
    }
    setTreestructure(data);
  };
  const onDropCompany: TreeProps['onDrop'] = (info) => {
    console.log(info);
    const dropKey = info.node.key;
    const dragKey = info.dragNode.key;
    const dropPos = info.node.pos.split('-');
    const dropPosition =
      info.dropPosition - Number(dropPos[dropPos.length - 1]);

    const checkKeyAdd = dropKey.toString().split(' ');
    // console.log('checkKeyAdd', checkKeyAdd)
    // console.log('showinfo', dropKey,dropPos,dropPosition)
    if (checkKeyAdd[0] == 'add') return;

    const loop = (
      data: DataNode[],
      key: React.Key,
      callback: (node: DataNode, i: number, data: DataNode[]) => void,
    ) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].key === key) {
          return callback(data[i], i, data);
        }
        if (data[i].children) {
          loop(data[i].children!, key, callback);
        }
      }
    };
    const data = [...treecompany];

    // Find dragObject
    let dragObj: DataNode;
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    if (!info.dropToGap) {
      // Drop on the content
      // loop(data, dropKey, (item) => {
      //     item.children = item.children || [];
      //     // where to insert
      //     item.children.unshift(dragObj);
      // });
      return;
    } else if (
      ((info.node as any).props.children || []).length > 0 && // Has children
      (info.node as any).props.expanded && // Is expanded
      dropPosition === 1 // On the bottom gap
    ) {
      loop(data, dropKey, (item) => {
        item.children = item.children || [];
        // where to insert 示例添加到头部，可以是随意位置
        item.children.unshift(dragObj);
        // in previous version, we use item.children.push(dragObj) to insert the
        // item to the tail of the children
      });
    } else {
      let ar: DataNode[] = [];
      let i: number;
      loop(data, dropKey, (_item, index, arr) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        ar.splice(i!, 0, dragObj!);
      } else {
        ar.splice(i! + 1, 0, dragObj!);
      }
    }
    console.log('setTreecompany', data);
    setTreecompany(data);
  };
  const renderTreeNodes = (data: any, keys: any) => {
    return data?.map((item: any, index: any) => {
      let keysindex = `${keys}-${index.toString()}`;
      let keysindexadd = keysindex.split('-');
      let text: any = '';
      keysindexadd.forEach((number: string) => {
        text += (text && '-') + number;
      });
      // console.log('text', text);
      if (item?.children) {
        return (
          <TreeNode
            title={
              <div
                style={{
                  border: '1px solid',
                  borderRadius: 10,
                  height: 50,
                  width: '100%',
                  backgroundColor: item.data?.color,
                  padding: 10,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <span>ระดับ {index + 1} : </span> <span>{item.title}</span>
              </div>
            }
            key={item.key}
            data={item}
          >
            {renderTreeNodes(item.children, keysindex)}
            <TreeNode
              disabled
              key={`add ${keysindex}`}
              title={
                <Button
                  onClick={() => addChildStructure(text)}
                  type="primary"
                  size="large"
                  style={{
                    width: '100%',
                    backgroundColor: token.token.colorPrimary,
                  }}
                >
                  เพิ่มตำแหน่งใหม่
                </Button>
              }
            />
          </TreeNode>
        );
      }
      return (
        <TreeNode
          key={item.key}
          title={
            <div
              style={{
                border: '1px solid',
                borderRadius: 10,
                height: 50,
                width: '100%',
                backgroundColor: item.data?.color,
                padding: 10,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <span>ระดับ {index + 1}: </span> <span>{item.title}</span>
            </div>
          }
          data={item}
        ></TreeNode>
      );
    });
  };

  const renderTreeNodesStructure = (data: any, keys: any) => {
    return data?.map((item: any, index: any) => {
      let keysindex = `${keys}-${index.toString()}`;
      let keysindexadd = keysindex.split('-');
      let titlenode = treecompany[keysindexadd['length'] - 2]?.title;
      let titlebuttonadd = treecompany[keysindexadd['length'] - 1]?.title;
      let isNotChildeAndLast =
        treecompany['length'] == keysindexadd['length'] - 1 ? true : false;
      let colorBy = treecompany[keysindexadd['length'] - 2]?.data?.color;
      // console.log('isNotChildeAndLast', keysindexadd['length']-1, isNotChildeAndLast);
      let text: any = '';
      keysindexadd.forEach((number: string) => {
        text += (text && '-') + number;
      });
      // console.log('text', text);
      if (item?.children?.length > 0) {
        return (
          <TreeNode
            title={
              <NodeStructure
                color={colorBy}
                titleNodes={titlenode}
                title={item.title}
                onDelhild={() => delChildStructure(text)}
                onEditChild={() => EditChildStructure(text)}
              />
            }
            key={item.key}
            data={item}
          >
            {renderTreeNodesStructure(item.children, keysindex)}
            <TreeNode
              disabled
              key={`add ${keysindex}`}
              title={
                <Button
                  onClick={() => addChildStructure(text)}
                  type="primary"
                  size="large"
                  style={{
                    width: '100%',
                    backgroundColor: token.token.colorPrimary,
                  }}
                >
                  เพิ่ม {titlebuttonadd} ใหม่
                </Button>
              }
            />
          </TreeNode>
        );
      }
      return (
        <TreeNode
          key={item.key}
          title={
            <NodeStructure
              color={colorBy}
              titleNodes={titlenode}
              title={item?.title}
              onDelhild={() => delChildStructure(text)}
              onEditChild={() => EditChildStructure(text)}
              onAddChild={
                !isNotChildeAndLast
                  ? () => addChildStructure(text, true)
                  : false
              }
            />
          }
          data={item}
        ></TreeNode>
      );
    });
  };
  const delChildStructure = (key: any, child = false) => {
    Swal.fire({
      title: 'คุณต้องการลบ?',
      text: 'โปรดตรวจสอบให้แน่ใจว่าคุณต้องการลบโนดต่อไปนี้!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ลบ!',
      cancelButtonText: 'ยกเลิก',
    }).then((result) => {
      if (result.isConfirmed) {
        let KeysPosition = key.toString().split('-');
        let kut = KeysPosition.slice(1);
        let a: any = treestructure;
        let current: any = a;
        for (let i = 0; i < kut.length - 1; i++) {
          let index = kut[i];
          current = current[index]?.children || current[index];
        }
        let deleteIndex = kut[kut.length - 1];
        current.splice(deleteIndex, 1);
        setTreestructure([...a]);
        Swal.fire('ลบข้อมูลสำเร็จ!', '', 'success');
      }
    });
  };
  const addChildStructure = (key: any, child = false) => {
    setOpen(true);
    setDataStructure({ key, child } as any);
  };
  const EditChildStructure = (key: any, child = false) => {
    setOpen2(true);
    setDataStructure({ key, child } as any);
    let KeysPosition = key?.toString().split('-');
    let kut = KeysPosition.slice(1);
    let current: any = treestructure;
    for (let i = 0; i < kut.length; i++) {
      let index = parseInt(kut[i], 10);
      if (i == kut.length - 1) {
        current = current[index];
      } else {
        current = current[index].children || current[index];
      }
    }
    formEdit.setFieldsValue({ name_th: current.title, number: current.id });
  };
  const onAddChildStructure = (value: any) => {
    form.resetFields();
    const { key, child } = dataStructure;
    const randomName = faker.company.catchPhraseDescriptor();
    const randomUid = faker.datatype.uuid();
    let KeysPosition = key?.toString().split('-');
    let kut = KeysPosition.slice(1);
    // console.log('addChildStructure', KeysPosition);
    // console.log('kut', kut);
    let a: any = treestructure;
    let current: any = a;
    for (let i = 0; i < kut.length; i++) {
      let index = kut[i];
      if (kut.length - 1 == i && child) {
        current = current[index].children = [];
      } else {
        current = current[index].children || current;
      }
    }
    // console.log('current', current)
    current?.push({ title: value?.name_th, key: randomUid, id: value?.number });
    setTreestructure([...a]);
    setOpen(false);
  };
  const onEditChildStructure = (value: any) => {
    formEdit.resetFields();
    const { key, child } = dataStructure;
    const randomUid = faker.datatype.uuid();
    let KeysPosition = key?.toString().split('-');
    let kut = KeysPosition.slice(1);
    let a: any = treestructure;
    let current: any = a;
    for (let i = 0; i < kut.length; i++) {
      let index = parseInt(kut[i], 10);
      if (i == kut.length - 1) {
        current[index].title = value.name_th;
        current[index].key = randomUid;
        current[index].id = value?.number;
      } else {
        current = current[index].children || current[index];
      }
    }
    setTreestructure([...a]);
    setOpen2(false);
  };
  const addChildCompany = (key: any) => {
    const randomName = faker.commerce.department();
    const randomUid = faker.datatype.uuid();
    let KeysPosition = key.toString().split('-');
    let kut = KeysPosition.slice(1);
    // console.log('addChildStructure', kut);
    // console.log('treestructure', treestructure);
    let a: any = treecompany;
    let current: any = a;
    for (let i = 0; i < kut.length; i++) {
      let index = kut[i];
      current = current[index].children || current;
    }
    console.log('current', current);
    current.push({ title: randomName, key: randomUid });
    setTreecompany([...a]);
  };

  const onSaveStructure = async () => {
    const ConvertData = convertData(treestructure);
    console.log('treestructure :>> ', treestructure);
    console.log('ConvertData :>> ', ConvertData);

    const filtertAdd = (data: any, level = 1) => {
      let value: any[] = [];
      for (const item of data as any) {
        if (item.id_Position1 === undefined) {
          console.log(
            `id_Position1 is undefined for item ${item.name_Position1}`,
          );
          value.push(item);
          return value;
        }
        if (item.masPosition2) {
          for (const subItem2 of item.masPosition2) {
            if (subItem2.id_Position2 === undefined) {
              console.log(
                `id_Position2 is undefined for item ${subItem2.name_Position2}`,
              );
              value.push({ ...subItem2, positionlevel1_id: item.id_Position1 });
              return value;
            }
            if (item.masPosition3) {
              for (const subItem3 of item.masPosition3) {
                if (subItem3.id_Position3 === undefined) {
                  console.log(
                    `id_Position3 is undefined for item ${subItem3.name_Position3}`,
                  );
                  value.push({
                    ...subItem3,
                    positionlevel2_id: subItem2.id_Position2,
                  });
                  return value;
                }
              }
            }
          }
        }
      }
      return value;
    };
    const filtertEdit = (data: any, level = 1) => {
      return data?.filter((data: any, index: number) => {
        if (data['id_Position' + level] !== undefined) {
          if (data['masPosition' + (level + 1)]) {
            filtertEdit(data.children, level + 1);
          }
          return data;
        }
      });
    };

    let Adddata = filtertAdd(ConvertData);
    let Editdata = filtertEdit(ConvertData);
    console.log('Adddata Editdata :>> ', Adddata, Editdata);
    let dataAdd = await CreatedPosition({
      variables: {
        data: Adddata,
      },
    });
    let dataEdit = await EditPosition({
      variables: {
        data: Editdata,
      },
    });
    console.log('dataAdd', dataAdd);
  };
  return (
    <React.Fragment>
      <div>
        <div className="relative flex flex-row items-center">
          <div className="flex flex-row items-center text-4xl">
            <RiHotelLine />
          </div>
          <span className="ml-4 text-lg tracking-wide truncate">
            ข้อมูลบริษัท / โครงสร้างบริษัท
          </span>
        </div>
        <Divider style={{ backgroundColor: token.token.colorPrimary }} />
      </div>

      <Row style={{ height: '100%' }}>
        <Col
          span={8}
          style={{ borderRight: '1px solid blue', padding: '0px 10px' }}
        >
          <h3>แสดงชื่อบริษัท/สาขา</h3>
          <div style={{ margin: '10px 10px' }}>
            <span>ระดับโครงสร้างองค์กร</span>
            <div className="box-dragdrop" style={{ margin: '10px 0px' }}>
              <StyledTreeCompany
                className="draggable-tree"
                // draggable
                blockNode
                multiple
                onDrop={onDropCompany}
                key={'tree-company'}
                // treeData={gData}
              >
                {renderTreeNodes(treecompany, '0')}
                {/* <TreeNode disabled key={"add"} title={
                                    <Button
                                        onClick={() => addChildCompany(0)}
                                        type="primary"
                                        size='large'
                                        style={{
                                            marginBottom: '10px',
                                            width: '100%',
                                            backgroundColor: token.token.colorPrimary,
                                        }}
                                    >
                                        เพิ่มตำแหน่งใหม่
                                    </Button>
                                } /> */}
              </StyledTreeCompany>
            </div>
          </div>
        </Col>
        <Col span={16} style={{ padding: '0px 10px' }}>
          <h3>โครงสร้างองค์กร</h3>

          <StyledTree
            className="draggable-tree"
            // defaultExpandAll
            // defaultExpandedKeys={expandedKeys}
            draggable={{
              icon: (
                <IoSwapVerticalOutline
                  style={{
                    fontSize: '18px',
                    stroke: '#000',
                  }}
                />
              ),
            }}
            blockNode
            // checkable
            multiple
            showLine
            onDragEnter={onDragEnter}
            onDrop={onDrop}
            key={'tree-structure'}
          >
            {renderTreeNodesStructure(treestructure, '0')}
            <TreeNode
              disabled
              key={'add'}
              title={
                <Button
                  onClick={() => addChildStructure(0)}
                  type="primary"
                  size="large"
                  style={{
                    marginBottom: '10px',
                    width: '100%',
                    backgroundColor: token.token.colorPrimary,
                  }}
                >
                  เพิ่ม ฝ่าย ใหม่
                </Button>
              }
            />
          </StyledTree>
          <div
            style={{
              margin: 'auto auto',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Button
              type="primary"
              size="large"
              style={{
                width: '49%',
                marginBottom: '10px',
                backgroundColor: '#FF8713',
              }}
              onClick={() => navigate(-1)}
            >
              ยกเลิก
            </Button>
            <Button
              type="primary"
              size="large"
              style={{
                width: '49%',
                marginBottom: '10px',
                backgroundColor: token.token.colorPrimary,
              }}
              onClick={onSaveStructure}
            >
              บันทึก
            </Button>
          </div>
        </Col>
      </Row>
      <Drawer
        title="เพิ่ม"
        placement="right"
        onClose={() => setOpen(false)}
        open={open}
      >
        <Form form={form} layout="vertical" onFinish={onAddChildStructure}>
          <Form.Item label="รหัส" name="number">
            <Input />
          </Form.Item>
          <Form.Item label="ชื่อโครงสร้างภาษาไทย" name="name_th">
            <Input />
          </Form.Item>
          <Button
            htmlType="submit"
            type="primary"
            style={{
              width: '100%',
              backgroundColor: token.token.colorPrimary,
            }}
          >
            บันทึก
          </Button>
        </Form>
      </Drawer>
      <Drawer
        title="แก้ไข"
        placement="right"
        onClose={() => setOpen2(false)}
        open={open2}
      >
        <Form form={formEdit} layout="vertical" onFinish={onEditChildStructure}>
          <Form.Item label="รหัส" name="number">
            <Input />
          </Form.Item>
          <Form.Item label="ชื่อโครงสร้างภาษาไทย" name="name_th">
            <Input />
          </Form.Item>
          <Button
            htmlType="submit"
            type="primary"
            style={{
              width: '100%',
              backgroundColor: token.token.colorPrimary,
            }}
          >
            บันทึก
          </Button>
        </Form>
      </Drawer>
    </React.Fragment>
  );
};

export default CompanyStructure;
