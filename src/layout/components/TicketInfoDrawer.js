import { Drawer, Tabs, Form, Input, DatePicker, Select } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import FetchCard from '../../data/fetchCard';

import useStore from '../../store'

import moment from 'moment';

const { TabPane } = Tabs;
const { Option } = Select;
const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
};

const onTabChange = (key) => {
    console.log(key);
}

const initialValues = {
    status: '',
    subject: '',
    dueDate: undefined,
    type: '',
    territory: '',
    dmVersion: '',
    assignee: '',
    description: '',
}

function TicketInfoDrawer(props) {
    const fetchSetData = useStore(state => state.fetchSetData)
    // Form
    const [form] = Form.useForm();
    const [disabled, setDisabled] = useState(true)

    useEffect(() => {
        form.resetFields()
        form.setFieldsValue(
            {
                status: props?.card?.status,
                subject: props?.card?.content?.subject,
                dueDate: props?.card?.content?.dueDate && moment(props.card.content.dueDate),
                type: props?.card?.content?.type,
                territory: props?.card?.content?.territory,
                dmVersion: props?.card?.content?.dmVersion,
                assignee: props?.card?.content?.assignee,
                description: props?.card?.content?.description,
            })
    }, [props.card])

    const editOnclick = () => {
        if (!disabled) {
            saveEdit()
        } else {
            setDisabled(state => !state)
        }


    }

    const saveEdit = () => {
        form.validateFields()
            .then(values => {
                form.submit()
            })
    }

    const onCencel = () => {
        props.onClose && props.onClose()
        form.setFieldsValue(
            {
                status: props?.card?.status,
                subject: props?.card?.content?.subject,
                dueDate: props?.card?.content?.dueDate && moment(props.card.content.dueDate),
                type: props?.card?.content?.type,
                territory: props?.card?.content?.territory,
                dmVersion: props?.card?.content?.dmVersion,
                assignee: props?.card?.content?.assignee,
                description: props?.card?.content?.description,
            })
        setDisabled(true)
    }

    const onFinish = (values) => {
        console.log('onFinish', values);
        const card = {
            "id": props?.card?.id,
            "requestor": props?.card?.requestor,
            "color": props?.card?.color,
            "status": values.status,
            "content": {
                "subject": values.subject,
                "dueDate": values.dueDate.format(),
                "assignee": values.assignee,
                "type": values.type,
                "territory": values.territory,
                "dmVersion": values.dmVersion,
                "description": values.description,
                "lastModified": moment().format()
            }
        }
        console.log(card);

        FetchCard.updateCard(card).then((res) => {
            console.log(res);
            fetchSetData()
            setDisabled(true)
        }).catch(e => {
            onCencel()
        })
    };

    return (
        <Drawer
            title="Ticket Information"
            placement="right"
            closable={true}
            onClose={onCencel}
            visible={props.visible}
            width={'50%'}
            maskStyle={{ backgroundColor: '#00000000' }}
        >
            <Tabs defaultActiveKey="1" onChange={onTabChange} size='large' className='ticketInfoTab'>
                <TabPane tab="Basic Information" key="1">
                    <div style={{ textAlign: 'right' }}>
                        <EditOutlined style={{ fontSize: '24px', cursor: 'pointer', borderRadius: '8px', padding: '4px', color: disabled ? 'gray' : 'white', backgroundColor: disabled ? '#00000000' : 'black' }} onClick={editOnclick} />
                    </div>
                    <Form {...layout} form={form} name="control-hooks" onFinish={onFinish} style={{ margin: '8px 0' }}
                        initialValues={
                            initialValues
                        }>
                        <Form.Item name="status" label="Status" rules={[{ required: true }]}>
                            <Select
                                placeholder="Select one"
                                allowClear
                                disabled={disabled}
                            >
                                <Option value="assgined">Assgined</Option>
                                <Option value="submitted">Submitted</Option>
                                <Option value="completed">Completed</Option>
                                <Option value="pendingForClose">Pending For Close</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item name="subject" label="Subject" rules={[{ required: true }]}>
                            <Input disabled={disabled} />
                        </Form.Item>
                        <Form.Item name="dueDate" label="Due Date" rules={[{ required: true }]}>
                            <DatePicker style={{ width: '100%' }} disabled={disabled} />
                        </Form.Item>
                        <Form.Item name="type" label="Type" rules={[{ required: true }]}>
                            <Select
                                placeholder="Select one"
                                allowClear
                                disabled={disabled}
                            >
                                <Option value="Wishlist">Wishlist</Option>
                                <Option value="Others">Others</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item name="territory" label="Territory" rules={[{ required: true }]}>
                            <Select
                                placeholder="Select one"
                                allowClear
                                disabled={disabled}
                            >
                                <Option value="pwc_mekong">PwC Mekong</Option>
                                <Option value="others">Others</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item name="dmVersion" label="DM Version" rules={[{ required: true }]}>
                            <Input disabled={disabled} />
                        </Form.Item>
                        <Form.Item name="assignee" label="Assignee" rules={[{ required: true }]}>
                            <Input disabled={disabled} />
                        </Form.Item>
                        <Form.Item name="description" label="Description" rules={[{ required: true }]}>
                            <Input.TextArea
                                placeholder="Request details"
                                autoSize={{ minRows: 3, maxRows: 5 }}
                                disabled={disabled} />
                        </Form.Item>
                    </Form>
                    Edit History
                    <Input.TextArea
                        autoSize={{ minRows: 7, maxRows: 10 }}
                        disabled={disabled} disabled={disabled}
                    />

                </TabPane>
                <TabPane tab="Communication" key="2">
                    Content of Communication Pane
                </TabPane>
                <TabPane tab="Solution" key="3">
                    Content of Solution Pane
                </TabPane>
            </Tabs>
        </Drawer>
    )
}


export default TicketInfoDrawer