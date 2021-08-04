import Board from "react-trello";
import dummyData from '../../data/data'
import MyLaneHeader from './LaneHeader'
import MyCard from './Card'
import useStore from '../../store'
import FetchCard from '../../data/fetchCard';
import _ from 'lodash'

function TrelloBoard() {
    const data = useStore(state => state.data)
    const fetchSetData = useStore(state => state.fetchSetData)

    const components = {
        LaneHeader: MyLaneHeader,
        Card: MyCard,
    }

    const onCardDelete = (cardId, laneId) => {
        FetchCard.deleteCard(cardId).then((res) => {
            console.log(res);
            fetchSetData()
        }).catch(e => {
        })
    }

    const onCardMoveAcrossLanes = (fromLaneId, toLaneId, cardId, index) => {
        const moveObj = {
            id: cardId,
            status: toLaneId,
            order: index
        }
        console.log(moveObj);
        if (_.isEqual(fromLaneId, toLaneId)) {
            // FetchCard.updateCard(moveObj).then((res) => {
            //     console.log(res);
            //     fetchSetData()
            // }).catch(e => {
            // })
        }else{
            FetchCard.updateCard(moveObj).then((res) => {
                console.log(res);
                fetchSetData()
            }).catch(e => {
            })
        }
    }

    const cardDragClass = 'myCardDragging'


    return (
        <Board data={{ ...data, cardDragClass }} draggable components={components} onCardDelete={onCardDelete} onCardMoveAcrossLanes={onCardMoveAcrossLanes}
            cardDragClass='myCardDragging'
        />
    )
}


export default TrelloBoard