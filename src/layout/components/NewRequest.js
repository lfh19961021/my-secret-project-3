import { useState } from 'react';
import { Button, Modal, Form, Input, DatePicker, Select, Typography } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import moment from 'moment';
import FetchCard from '../../data/fetchCard';
import useStore from '../../store'

import _ from 'lodash'

const { Option } = Select;
const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
};

function NewRequest(props) {
    const data = useStore(state => state.data)
    const fetchSetData = useStore(state => state.fetchSetData)

    const getExistID = () => {
        let idList = []
        for (let currLanes of data.lanes) {
            let tempIdList = _.map(currLanes.cards, currCard => currCard.id);
            idList.push(...tempIdList)
        }
        let uniqIdList = _.uniq(idList)
        return uniqIdList
    }

    const randomID = () => {
        return Math.floor(Math.random() * (999 - 100)) + 100
    }
    const randomUniqID = () => {
        let outputID = randomID()
        while (_.includes(getExistID(), outputID)) {
            console.log('not uni id!', outputID);
            outputID = randomID()
        }
        return outputID
    }
    // Modal
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        form.validateFields()
            .then(values => {
                form.submit()
                //setIsModalVisible(false);
            })
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setFetching(false)
    };

    // Form
    const [form] = Form.useForm();
    const [fetching, setFetching] = useState(false)
    const onFinish = (values) => {
        console.log('onFinish', values);
        const card = {
            "id": randomUniqID(),
            "requestor": "Fred FH Lau",
            "color": "#2A5477",
            "status": "assgined",
            "order": 999,
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
        setFetching(true)
        FetchCard.postCard(card).then((res) => {
            console.log(res);
            fetchSetData()
            handleCancel()
        }).catch(e => {
            handleCancel()
        })
    };

    return (
        <>
            <Button key="2" icon={<PlusCircleOutlined />} type='text' size='large' onClick={showModal}> New Request</Button>
            <Modal title="New Request" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} width={'600px'} footer={[
                <Button key="back" type="text" onClick={handleCancel} style={{ float: 'left' }}>
                    Cancel
                </Button>,
                <Button key="submit" type="ghost" onClick={handleOk} loading={fetching}>
                    Save
                </Button>,
                <Button
                    key="next"
                    type="primary"
                    onClick={handleOk}
                    loading={fetching}
                    style={{ backgroundColor: "#D04A02", borderColor: '#D04A02' }}
                >
                    Next
                </Button>]}>
                <Typography.Title level={4} style={{marginBottom: '16px'}}>Basic Infomation</Typography.Title>
                <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
                    {/* <Form.Item name="status" label="Status" rules={[{ required: true }]}>
                        <Select
                            placeholder="Select one"
                            allowClear
                        >
                            <Option value="submitted">Submitted</Option>
                            <Option value="assgined">Assgined</Option>
                            <Option value="pendingForClose">Pending For Close</Option>
                            <Option value="completed">Completed</Option>
                        </Select>
                    </Form.Item> */}
                    <Form.Item name="subject" label="Subject" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="dueDate" label="Due Date" rules={[{ required: true }]}>
                        <DatePicker style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item name="type" label="Type" rules={[{ required: true }]}>
                        <Select
                            placeholder="Select one"
                            allowClear
                        >
                            <Option value="Wishlist">Wishlist</Option>
                            <Option value="Others">Others</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="territory" label="Territory" rules={[{ required: true }]}>
                        <Select
                            placeholder="Select one"
                            allowClear
                        >
                            <Option value="pwc_mekong">PwC Mekong</Option>
                            <Option value="others">Others</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="dmVersion" label="DM Version" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="assignee" label="Assignee" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="description" label="Description" rules={[{ required: true }]}>
                        <Input.TextArea
                            placeholder="Request details"
                            autoSize={{ minRows: 3, maxRows: 5 }} />
                    </Form.Item>
                </Form>

            </Modal>
        </>
    )
}


export default NewRequest