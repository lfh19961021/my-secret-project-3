import { useState, useEffect, useMemo } from 'react';
import { Table, Typography } from 'antd';
import Filter from './Filter'
import Sorter from './Sorter'
import TicketInfoDrawer from './TicketInfoDrawer'
import useStore from '../../store'
import _ from 'lodash'
import moment from 'moment';

const testdata = [
  {
    key: 1,
    name: 'John Brown sr.',
    children: [
      {
        key: 11,
        name: 'John Brown',
        age: 42,
        address: 'New York No. 2 Lake Park',
      },
    ],
  },
  {
    key: 2,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
];

const filterData = (dataList, filterList, columnID) => {
  let data = _.cloneDeep(dataList)
  for (let group of data) {
    let newChildren = _.filter(group.children, (v) => _.includes(filterList, v[columnID]));
    group['children'] = newChildren
  }
  return data
}

const sorterData = (dataList, orderList, columnList) => {
  let data = _.cloneDeep(dataList)
  for (let group of data) {
    let newChildren = _.orderBy(group.children, columnList, orderList)
    group['children'] = newChildren
  }
  return data
}

function ListView() {
  // Data, Filter and Sorter
  const data = useStore(state => state.data)
  const dataToListFormat = useStore(state => state.dataToListFormat)
  const [originDataList, setOriginDataList] = useState(dataToListFormat())
  const [sortedOriginDataList, setSortedOriginDataList] = useState(originDataList)
  const [dataList, setDataList] = useState(sortedOriginDataList)
  const filter = useStore(state => state.filter)
  const sorter = useStore(state => state.sorter)

  useEffect(() => {
    setOriginDataList(dataToListFormat())
  }, [data])
  useEffect(() => {
    setSortedOriginDataList(originDataList)
  }, [originDataList])

  const onFilterChange = () => {
    let data = _.cloneDeep(sortedOriginDataList)
    for (let currFilter of filter) {
      data = filterData(data, currFilter.checkedList, currFilter.column)
    }
    setDataList(data)
  }

  const onSorterChange = () => {
    let data = _.cloneDeep(originDataList)
    let orderList = []
    let columnList = []
    for (let currSorter of sorter) {
      if (!_.isEqual(currSorter.order, 'no')) {
        orderList.push(currSorter.order)
        columnList.push(currSorter.column)
      }
    }
    if (orderList.length > 0 && columnList.length > 0) {
      data = sorterData(data, orderList, columnList)
      setSortedOriginDataList(data)
    } else {
      setSortedOriginDataList(originDataList)
    }
  }

  useEffect(() => {
    onSorterChange()
    onFilterChange()
  }, [filter, sorter])

  useEffect(() => {
    onFilterChange()
  }, [sortedOriginDataList])



  // Ticket Info
  const [drawerVisible, setDrawerVisible] = useState(false)
  const [clickedContent, setClickedContent] = useState({})

  const showTicketInfo = e => {
    setDrawerVisible(true)
  }

  const closeTicketInfo = e => {
    setDrawerVisible(false)
  }

  const setAndShowInfo = (content) => {
    let card = {
      id: content.id,
      requestor: content.requestor,
      color: content.color,
      status: content.status,
      order: content.order,
      content: {
        assignee: content.assignee,
        description: content.description,
        dmVersion: content.dmVersion,
        dueDate: content.dueDate,
        lastModified: content.lastModified,
        subject: content.subject,
        territory: content.territory,
        type: content.type
      }
    }
    setClickedContent(card)
    showTicketInfo()
  }

  // Columns setting
  const columns = [
    {
      title: () => {
        return <div>
          <Sorter column='requestor' >Requestor</Sorter>
          <Filter originDataList={originDataList} column='requestor' />
        </div>;
      },
      dataIndex: 'requestor',
      key: 'requestor',
      render: (text, record, index) => {
        if (record.requestor && _.isEmpty(record.children)) {
          return <div onClick={() => { setAndShowInfo(record) }}>{text}</div>
        } else {
          return <Typography.Title level={5}>{text}</Typography.Title>
        }
      }
    },
    {
      title: () => {
        return <div>
          <Sorter column='subject' >Subject</Sorter>
        </div>;
      },
      dataIndex: 'subject',
      key: 'subject',
      render: (text, record, index) => {
        if (record.subject) {
          return <div onClick={() => { setAndShowInfo(record) }}>{text}</div>
        } else {
          return text
        }
      }
    },
    {
      title: () => {
        return <div>
          <Sorter column='tag' >Tag</Sorter>
          <Filter dataList={dataList} setDataList={setDataList} originDataList={originDataList} column='tag' />
        </div>;
      },
      dataIndex: 'tag',
      key: 'tag',
      render: (text, record, index) => {
        if (record.tag) {
          return <div onClick={() => { setAndShowInfo(record) }}>{text}</div>
        } else {
          return text
        }
      }
    },
    {
      title: () => {
        return <div>
          <Sorter column='dueDate' >Due Date</Sorter>
          <Filter dataList={dataList} setDataList={setDataList} originDataList={originDataList} column='dueDate' />
        </div>;
      },
      dataIndex: 'dueDate',
      key: 'dueDate',
      render: (text, record, index) => {
        if (record.dueDate) {
          return <div onClick={() => { setAndShowInfo(record) }}>{moment(text).format('YYYY-MM-DD')}</div>
        } else {
          return text
        }
      }
    },
    {
      title: () => {
        return <div>
          <Sorter column='lastModified'>Last Modified</Sorter>
          <Filter dataList={dataList} setDataList={setDataList} originDataList={originDataList} column='lastModified' />
        </div>;
      },
      dataIndex: 'lastModified',
      key: 'lastModified',
      render: (text, record, index) => {
        if (record.lastModified) {
          return <div onClick={() => { setAndShowInfo(record) }}>{moment(text).format('YYYY-MM-DD')}</div>
        } else {
          return text
        }
      }
    },
  ];

  return (
    <>
      <Table
        className={'listviewTable'}
        columns={columns}
        dataSource={dataList}
        rowClassName={(record) => {
          if (record.children) {
            return `listviewTableTitle ${record.key}`
          } else {
            return 'listviewTableRow'
          }
        }
        }
        pagination={false}
      />
      <TicketInfoDrawer
        onClose={closeTicketInfo}
        visible={drawerVisible}
        content={clickedContent}
        card={clickedContent}
      />
    </>
  );
}

export default ListView