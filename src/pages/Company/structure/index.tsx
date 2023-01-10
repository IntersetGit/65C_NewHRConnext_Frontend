import React, { useState, useEffect, useRef } from 'react';
import { RiCommunityLine } from 'react-icons/ri';
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
    TreeDataNode
} from 'antd';
import type { DataNode, TreeProps } from 'antd/es/tree';
import styled from 'styled-components';

const { TreeNode } = Tree

const StyledTree = styled(Tree)`
 .ant-tree-list-holder{
   padding: 10px;
 }
  .ant-tree-title{
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
  .ant-tree-treenode-draggable.ant-tree-treenode-disabled .ant-tree-draggable-icon {
    visibility: hidden;
    display: none;
}
`
const StyledTreeCompany = styled(StyledTree)`
    .ant-tree-switcher-noop {
        display: none !important;
    }
`

type AppProps = {
    number: string;
    title: string;
};

const OnRenderedNumberComponents = ({ number, title }: AppProps): JSX.Element => {
    return (
        <div key={number} style={{ border: '1px solid', borderRadius: 10, height: 50, width: '100%', backgroundColor: 'aquamarine', padding: 10, display: 'flex', alignItems: 'center' }}>
            <span>ระดับ : {number ?? number}</span> <span>{title ?? title}</span>
        </div>
    )
}

const x = 2;
const y = 1;
const z = 1;
const defaultData: DataNode[] = [];

const generateData = (_level: number, _preKey?: React.Key, _tns?: DataNode[]) => {
    const preKey = _preKey || '0';
    const tns = _tns || defaultData;

    const children: React.Key[] = [];
    for (let i = 0; i < x; i++) {
        const key = `${preKey}-${i}`;
        tns.push({
            title:
                <div draggable style={{ border: '1px solid', borderRadius: 10, height: 50, width: '100%', backgroundColor: 'aquamarine', padding: 10, display: 'flex', alignItems: 'center' }}>
                    <span>ระดับ : </span> <span>{key}</span>
                </div>
            , key
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
generateData(z);
// console.log('defaultData :>> ', defaultData);

const CompanyStructure: React.FC = () => {
    const { useToken } = theme;
    const token = useToken();
    const [treestructure, serTreestructure] = useState(defaultData);
    const [treecompany, setTreecompany] = useState([
        {
            title: <OnRenderedNumberComponents title='ฝ่าย' number={"1"} />, key: "1" ,data:{title:'ฝ่าย',number:"1"}
        },
        {
            title: <OnRenderedNumberComponents title='แผนก' number={"2"} />, key: "2",data:{title:'แผนก',number:"2"}
        },
        {
            title: <OnRenderedNumberComponents title='สาขา' number={"3"} />, key: "3",data:{title:'สาขา',number:"3"}
        }
    ]);
    const [expandedKeys] = useState(['0-0', '0-0-0', '0-0-0-0']);

    const onDragEnter: TreeProps['onDragEnter'] = (info) => {
        // console.log(info);
        // expandedKeys 需要受控时设置
        // setExpandedKeys(info.expandedKeys)
    };

    const onDrop: TreeProps['onDrop'] = (info) => {
        console.log(info);
        const dropKey = info.node.key;
        const dragKey = info.dragNode.key;
        const dropPos = info.node.pos.split('-');
        const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);

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
            loop(data, dropKey, (item) => {
                item.children = item.children || [];
                // where to insert 示例添加到头部，可以是随意位置
                item.children.unshift(dragObj);
            });
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
        serTreestructure(data);
    };
    const onDropCompany: TreeProps['onDrop'] = (info) => {
        console.log(info);
        const dropKey = info.node.key;
        const dragKey = info.dragNode.key;
        const dropPos = info.node.pos.split('-');
        const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);

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
            loop(data, dropKey, (item) => {
                item.children = item.children || [];
                // where to insert 示例添加到头部，可以是随意位置
                item.children.unshift(dragObj);
            });
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
        console.log('setTreecompany', data)
        setTreecompany(data);
    };
    const renderTreeNodes = (data: any) => {
        return data?.map((item: any) => {
            if (item?.children) {
                return (
                    <TreeNode title={item.title} key={item.key} data={item} >
                        {renderTreeNodes(item.children)}
                        <TreeNode disabled key={Math.floor(Math.random() * 300)} title={
                            <Button
                                type="primary"
                                size='large'
                                style={{
                                    width: '100%',
                                    backgroundColor: token.token.colorPrimary,
                                }}
                            >
                                เพิ่มตำแหน่งใหม่
                            </Button>} />
                    </TreeNode>
                )
            }
            return (<TreeNode key={item.key} {...item} data={item}></TreeNode>)
        })
    }

    return (
        <React.Fragment>
            <div>
                <div className="relative flex flex-row items-center">
                    <div className="flex flex-row items-center text-4xl">
                        <RiCommunityLine />
                    </div>
                    <span className="ml-4 text-lg tracking-wide truncate">
                        ข้อมูลบริษัท / โครงสร้างบริษัท
                    </span>
                </div>
                <Divider style={{ backgroundColor: token.token.colorPrimary }} />
            </div>

            <Row style={{ height: '100%' }}>
                <Col span={8} style={{ borderRight: '1px solid blue', padding: '0px 10px' }}>
                    <h3>แสดงชื่อบริษัท/สาขา</h3>
                    <div style={{ margin: '10px 10px' }}>
                        <span >ระดับโครงสร้างองค์กร</span>
                        <div className='box-dragdrop' style={{ margin: '10px 0px' }}>

                            <StyledTreeCompany
                                className="draggable-tree"
                                draggable
                                blockNode
                                multiple
                                onDrop={onDropCompany}
                            // treeData={gData}
                            >
                                {renderTreeNodes(treecompany)}
                                <TreeNode disabled key={Math.floor(Math.random() * 300)} title={
                                    <Button
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
                                } />
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
                        draggable
                        blockNode
                        // checkable
                        multiple
                        showLine
                        onDragEnter={onDragEnter}
                        onDrop={onDrop}
                    // treeData={gData}
                    >
                        {renderTreeNodes(treestructure)}
                        <TreeNode disabled key={Math.floor(Math.random() * 300)} title={
                            <Button
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
                        } />
                    </StyledTree>
                </Col>
            </Row>

        </React.Fragment>
    )
}

export default CompanyStructure