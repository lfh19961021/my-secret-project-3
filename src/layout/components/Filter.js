import { useState, useEffect } from 'react';
import { Popconfirm, Checkbox } from 'antd';
import { FilterOutlined } from '@ant-design/icons';
import useStore from '../../store'
import _ from 'lodash'

function getfiltersArray(dataList, columnName) {
    let notuniValue = []
    for (let currList of dataList) {
        let temp = _.map(currList.children, columnName)
        notuniValue.push(...temp)
    }
    let uniqValue = _.uniq(notuniValue)
    return uniqValue;
}

function ColumnFilter(props) {

    const plainOptions = getfiltersArray(props.originDataList, props.column);
    const defaultCheckedList = plainOptions;

    const [checkedList, setCheckedList] = useState(defaultCheckedList);
    const [indeterminate, setIndeterminate] = useState(false);
    const [checkAll, setCheckAll] = useState(true);

    const [befreConfirmCheckedList, setBefreConfirmCheckedList] = useState(checkedList);
    const [befreConfirmIndeterminate, setBefreConfirmIndeterminate] = useState(indeterminate);
    const [befreConfirmCheckAll, setBefreConfirmCheckAll] = useState(checkAll);

    const filter = useStore(state => state.filter)
    const setFilter = useStore(state => state.setFilter)

    useEffect(()=>{

    },[filter])

    function confirm(e) {
        setBefreConfirmCheckedList(checkedList)
        setBefreConfirmIndeterminate(indeterminate)
        setBefreConfirmCheckAll(checkAll)
        setFilter({column: props.column, checkedList: checkedList})


        //props.setDataList(filterData(props.originDataList, checkedList, props.column))
    }

    function cancel(e) {
        setCheckedList(befreConfirmCheckedList)
        setIndeterminate(befreConfirmIndeterminate)
        setCheckAll(befreConfirmCheckAll)
    }

    const onCheckChange = list => {
        setCheckedList(list);
        setIndeterminate(!!list.length && list.length < plainOptions.length);
        setCheckAll(list.length === plainOptions.length);
    };

    const onCheckAllChange = e => {
        setCheckedList(e.target.checked ? plainOptions : []);
        setIndeterminate(false);
        setCheckAll(e.target.checked);
    };
    return (
        <Popconfirm
            title={
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
                        Check all
                    </Checkbox>
                    <Checkbox.Group options={plainOptions} value={checkedList} onChange={onCheckChange} style={{ display: 'flex', flexDirection: 'column' }} />
                </div>
            }
            placement="right"
            onConfirm={confirm}
            onCancel={cancel}
            okText="OK"
            cancelText="Cancel"
            icon={<FilterOutlined style={{ color: 'black' }}
            />}
        >
            <FilterOutlined style={{ float: 'right', 
            backgroundColor: `${!befreConfirmCheckAll ? 'white' : '#00000000'}`, 
            color: `${!befreConfirmCheckAll ? 'black' : 'white'}`,
            padding: '4px', borderRadius: '100%' }} />
        </Popconfirm>
    )
}


export default ColumnFilter