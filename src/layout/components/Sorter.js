import { useState, useEffect } from 'react';
import { SortAscendingOutlined, SortDescendingOutlined, MinusOutlined } from '@ant-design/icons';
import useStore from '../../store'
import _ from 'lodash'

const sortModeEnum = ['no', 'asc', 'desc']
function ColumnSorter(props) {
    const [sortMode, setSortMode] = useState(sortModeEnum[0])
    const onClick = () => {
        const maxLength = sortModeEnum.length
        let newSortMode = _.indexOf(sortModeEnum, sortMode) + 1
        if (newSortMode >= maxLength) {
            newSortMode = 0
        }
        setSortMode(sortModeEnum[newSortMode])
    }

    const setSorter = useStore(state => state.setSorter)
    useEffect(() => {
        setSorter({ column: props.column, order: sortMode })
    }, [sortMode])

    return (
        <span onClick={onClick} style={{ cursor: 'pointer' }}>
            {props.children} &nbsp;
            {
                _.isEqual(sortMode, sortModeEnum[0]) ? <MinusOutlined /> :
                    _.isEqual(sortMode, sortModeEnum[1]) ? <SortAscendingOutlined /> :
                        _.isEqual(sortMode, sortModeEnum[2]) && <SortDescendingOutlined />
            }
        </span>
    )
}


export default ColumnSorter