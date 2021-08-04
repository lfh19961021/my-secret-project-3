import create from 'zustand'
import _ from 'lodash'
import dummydata from './data/data'
import FetchCard from './data/fetchCard';
import Formatter from './data/formatter';

const useStore = create((set, get) => ({
    data: dummydata,
    setData: (data) => set({ data }),
    fetchSetData: () => {
        FetchCard.getCards().then(output => {
            Formatter.toLane(output.data).then(formattedLaneData => {
                window.glog(formattedLaneData, 'formattedLaneData')
                get().setData(formattedLaneData)
            })
        })
    },
    dataToListFormat: () => {
        let list = []
        const data = get().data
        for (let currData of data.lanes) {
            let listobj = {}
            listobj['id'] = currData.id

            listobj['key'] = currData.id
            listobj['requestor'] = currData.title
            listobj['color'] = currData.color
            listobj['children'] = []
            for (let currCard of currData.cards) {
                let cardobj = {}
                cardobj['id'] = currCard.id

                cardobj['key'] = currCard.id
                cardobj['requestor'] = currCard.requestor
                cardobj['description'] = currCard.content.description
                cardobj['tag'] = currCard.content.type
                cardobj['dueDate'] = currCard.content.dueDate
                cardobj['lastModified'] = currCard.content.lastModified || 'Test last Modified'

                cardobj['type'] = currCard.content.type
                cardobj['status'] = currCard.status
                cardobj['color'] = currCard.color
                cardobj['assignee'] = currCard.content.assignee
                cardobj['subject'] = currCard.content.subject
                cardobj['territory'] = currCard.content.territory
                cardobj['dmVersion'] = currCard.content.dmVersion
                cardobj['order'] = currCard.content.order

                listobj['children'].push(cardobj)
            }
            list.push(listobj)
        }
        return list
    },
    filter: [],
    setFilter: (filter) => {
        set(state => {
            let oldFilter = _.cloneDeep(state.filter)
            let pair = _.find(oldFilter, (currOldFilter) => { return _.includes(filter.column, currOldFilter.column) })

            if (pair) {
                pair.checkedList = filter.checkedList
            } else {
                oldFilter.push(filter);
            }
            return { filter: oldFilter }
        })
    },
    sorter: [],
    setSorter: (sorter) => {
        set(state => {
            let oldSorter = _.cloneDeep(state.sorter)
            let pair = _.find(oldSorter, (currOldSorter) => { return _.includes(sorter.column, currOldSorter.column) })

            if (pair) {
                pair.order = sorter.order
            } else {
                oldSorter.push(sorter);
            }
            return { sorter: oldSorter }
        })
    },
    // filterData: (filterList, columnID) => {
    //     let data = _.cloneDeep(get().data)
    //     for (let group of data.lanes) {
    //         let newCards = _.filter(group.cards, (v) => _.includes(filterList, v[columnID]));
    //         group['cards'] = newCards
    //     }
    //     get().setData(data)
    // }
}))

const unsubscribe_data = useStore.subscribe(newState => console.log(newState, 'data'), newState => newState.data)
const unsubscribe_filter = useStore.subscribe(newState => console.log(newState, 'filter'), newState => newState.filter)
const unsubscribe_sorter = useStore.subscribe(newState => console.log(newState, 'sorter'), newState => newState.sorter)

export default useStore