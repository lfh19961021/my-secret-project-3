import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
    MovableCardWrapper,
    CardHeader,
    CardRightContent,
    CardTitle,
    Detail,
    Footer
} from 'react-trello/dist/styles/Base'
import InlineInput from 'react-trello/dist/widgets/InlineInput'
import CardTag from './Tag'
import DeleteButton from 'react-trello/dist/widgets/DeleteButton'

import TicketInfoDrawer from './TicketInfoDrawer'
import { Avatar, Typography, Tag, Descriptions } from 'antd';
import { UpOutlined, DownOutlined, MessageOutlined, UserOutlined, FlagOutlined, ClockCircleOutlined } from '@ant-design/icons';


import { Collapse } from 'react-collapse';
import moment from 'moment'

const { Title } = Typography;

class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpened: false,
            drawerVisible: false,
            statusColor: {
                submitted: "#D93954",
                assgined: "#2A5477",
                pendingForClose: "#2A9D8F",
                completed: "#D04A02"
            }
        }
    }

    toggleOpened = () => {
        this.setState({
            isOpened: !this.state.isOpened
        });
    }
    onDelete = e => {
        this.props.onDelete()
        e.stopPropagation()
    }


    showTicketInfo = e => {
        this.setState({
            drawerVisible: true
        });
    }

    closeTicketInfo = e => {
        this.setState({
            drawerVisible: false
        });
    }


    render() {
        const {
            showDeleteButton,
            style,
            tagStyle,
            onClick,
            onDelete,
            onChange,
            className,

            title,
            label,
            description,
            tags,
            cardDraggable,
            editable,
            t,

            content,
            id,
            requestor,
            color,
            status
        } = this.props

        const updateCard = (card) => {
            onChange({ ...card, id })
        }

        const getStatusColor = (status) => {
            return this.state.statusColor[status] || '#0F0F0F'
        }

        return (
            <MovableCardWrapper
                data-id={id}
                onClick={onClick}
                style={{ ...style, borderBottom: `4px solid ${getStatusColor(status)}` }}
                className={className}
            >
                <CardHeader style={{ marginBottom: '0' }}>
                    <CardTitle draggable={cardDraggable} >
                        <>
                            <Avatar style={{ backgroundColor: getStatusColor(status) }} size="large">
                                {requestor ? requestor?.substr(0, 1) : 'Df'}
                            </Avatar>
                            &nbsp; <Title level={5} style={{display: 'inline'}}>{requestor}</Title>
                        </>
                    </CardTitle>

                    <CardRightContent>
                        <Tag color={getStatusColor(status)} style={{ borderRadius: '24px', marginTop: 'auto', marginBottom: 'auto' }} className="myCard_tag">{`WL-${id}`}</Tag>
                    </CardRightContent>
                    {showDeleteButton && <DeleteButton onClick={this.onDelete} />}

                </CardHeader>




                <Collapse isOpened={this.state.isOpened} initialStyle={{ height: 0, overflow: 'hidden', transition: 'height 0.5s' }}>
                    <Detail style={{ padding: '16px 8px' }} onClick={this.showTicketInfo}>
                        <>
                            <Descriptions layout="horizontal" column={1} colon={false}>
                                <Descriptions.Item label={<MessageOutlined />} >{content.subject}</Descriptions.Item>
                                <Descriptions.Item label={<UserOutlined />}>{content.assignee}</Descriptions.Item>
                                <Descriptions.Item label={<FlagOutlined />}>{content.type}</Descriptions.Item>
                                <Descriptions.Item label={<ClockCircleOutlined />}>{content?.dueDate ? moment(content.dueDate).format('YYYY-MM-DD') : 'Df'}</Descriptions.Item>
                            </Descriptions>
                            <Typography.Text type="secondary">Updated on 2021-05-20</Typography.Text>
                        </>
                    </Detail>
                    <TicketInfoDrawer
                        onClose={this.closeTicketInfo}
                        visible={this.state.drawerVisible}
                        content={content}
                        card={{
                            id,
                            requestor,
                            color,
                            status,
                            content
                        }}
                    />
                </Collapse>

                <Footer onClick={this.toggleOpened} style={{ justifyContent: 'center', padding: '16px 16px 4px 16px' }}>
                    {this.state.isOpened ? <UpOutlined /> : <DownOutlined />}
                </Footer>

            </MovableCardWrapper>
        )
    }
}

Card.propTypes = {
    showDeleteButton: PropTypes.bool,
    onDelete: PropTypes.func,
    onClick: PropTypes.func,
    style: PropTypes.object,
    tagStyle: PropTypes.object,
    className: PropTypes.string,
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    label: PropTypes.string,
    description: PropTypes.string,
    tags: PropTypes.array,
    content: PropTypes.object,
    requestor: PropTypes.string,
    color: PropTypes.string,
    status: PropTypes.string,
    order: PropTypes.number,
}

Card.defaultProps = {
    showDeleteButton: true,
    onDelete: () => { },
    onClick: () => { },
    style: {},
    tagStyle: {},
    title: 'no title',
    description: '',
    label: '',
    tags: [],
    className: '',
    content: {},
    color: '#000',
    status: '',
    order: 999
}

export default Card