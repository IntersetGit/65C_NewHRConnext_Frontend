import React from 'react'
import { Button, Tooltip } from 'antd';
import { IoTrashBin, IoDuplicate, IoPencil } from 'react-icons/io5';
import './index.css'
import styled from 'styled-components';

const ItemTool = styled('div')`
position: relative;
width: 10%;
background-color: ${props => props.color ? props.color : "green"};
width: 100%;
height: 100%;
/* border-right: 1px solid; */
display: flex;
justify-content: center;
align-items: center;
`

type Props = {
    titleNodes: string,
    title: string,
    onAddChild?: any,
    onDelhild?: any,
    onEditChild?: any,
    color?: any,

}

export default function NodeStructure({ titleNodes, title, onAddChild, onDelhild, onEditChild, color = 'orange' }: Props) {
    return (
        <div className='card-tree' style={{ backgroundColor: color }}>
            <span>{titleNodes}: </span> <span>{title}</span>
            <div className='toolbox' >
                {onDelhild &&
                    <Tooltip title="ลบ">
                        <ItemTool color='red'>
                            <IoTrashBin onClick={onDelhild} style={{
                                fontSize: '18px',
                                color: 'white',
                            }} />
                        </ItemTool>
                    </Tooltip>
                }
                {onEditChild &&
                    <Tooltip title="แก้ไข"><ItemTool color='#F95'>
                        <IoPencil onClick={onEditChild} style={{
                            fontSize: '18px',
                            color: 'white',
                        }} />
                    </ItemTool></Tooltip>
                }
                {onAddChild &&
                    <Tooltip title="เพิ่ม"><ItemTool>
                        <IoDuplicate onClick={onAddChild} style={{
                            fontSize: '18px',
                            color: 'white',
                        }} />
                    </ItemTool>
                    </Tooltip>
                }


            </div>
        </div>
    )
}