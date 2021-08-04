import React from 'react'
import PropTypes from 'prop-types'
import InlineInput from 'react-trello/dist/widgets/InlineInput'
import { Title, LaneHeader, RightContent } from 'react-trello/dist/styles/Base'
import { Typography } from 'antd';
import LaneMenu from './LaneMenu'

const LaneHeaderComponent = ({
    updateTitle, canAddLanes, onDelete, onDoubleClick, editLaneTitle, label, title, titleStyle, labelStyle, t, laneDraggable, color, cards
}) => {
    return (
        <LaneHeader onDoubleClick={onDoubleClick} editLaneTitle={editLaneTitle} style={{ borderBottom: `4px solid ${color}` }} className='laneHeader'>
            <Title draggable={laneDraggable} style={titleStyle} className='laneTitle'>
                <Typography.Title level={5}>{`${title} (${cards.length})`}</Typography.Title>
            </Title>


            {/* {label && (
                <RightContent>
                    <span style={labelStyle}>{label}</span>
                </RightContent>
            )} */}


            {canAddLanes && <LaneMenu t={t} onDelete={onDelete} />}
        </LaneHeader>
    )
}

LaneHeaderComponent.propTypes = {
    updateTitle: PropTypes.func,
    editLaneTitle: PropTypes.bool,
    canAddLanes: PropTypes.bool,
    laneDraggable: PropTypes.bool,
    label: PropTypes.string,
    title: PropTypes.string,
    onDelete: PropTypes.func,
    onDoubleClick: PropTypes.func,
    t: PropTypes.func.isRequired,
    color: PropTypes.string,
    cards: PropTypes.array,
}

LaneHeaderComponent.defaultProps = {
    updateTitle: () => { },
    editLaneTitle: false,
    canAddLanes: false,
    color: '#000',
    cards: [],
}

export default LaneHeaderComponent;