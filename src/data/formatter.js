class Formatter {
    static async toLane(data) {
        let laneData = {
            "lanes": [
                {
                    "id": "submitted",
                    "title": "Submitted",
                    "color": "#D93954",
                    "cards": []
                },
                {
                    "id": "assgined",
                    "title": "Assgined",
                    "color": "#2A5477",
                    "cards": []
                },
                {
                    "id": "pendingForClose",
                    "title": "Pending for Close",
                    "color": "#2A9D8F",
                    "cards": []
                },
                {
                    "id": "completed",
                    "title": "Completed",
                    "color": "#D04A02",
                    "cards": []
                },

            ]
        }
        for (let currCard of data) {
            switch (currCard.status) {
                case 'submitted':
                    laneData.lanes[0].cards.push(currCard)
                    break;
                case 'assgined':
                    laneData.lanes[1].cards.push(currCard)
                    break;
                case 'pendingForClose':
                    laneData.lanes[2].cards.push(currCard)
                    break;
                case 'completed':
                    laneData.lanes[3].cards.push(currCard)
                    break;
                default:
                    break;
            }
        }
        return laneData
    }
}
export default Formatter