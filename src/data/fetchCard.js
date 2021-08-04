import fetchURI from './fetch'
class FetchCard {
    static async getCards() {
        const config = {
            uri: `http://localhost:3001/cards`,
            method: `GET`,
            headers: { "Accept": "application/json" },
            body: undefined,
            description: `Cards`
        }
        let output;
        await fetchURI(config)
            .then(result => {
                output = result
            })
            .catch(error => {
                throw error
            });
        return output;
    }
    static async postCard(card) {
        const config = {
            uri: `http://localhost:3001/cards`,
            method: `POST`,
            headers: {
                "Accept": "application/json",
                "Content-Type": 'application/json'
            },
            body: card,
            description: `Cards`
        }
        let output;
        await fetchURI(config)
            .then(result => {
                output = result
            })
            .catch(error => {
                throw error
            });
        return output;
    }
    static async deleteCard(cardID) {
        const config = {
            uri: `http://localhost:3001/cards/${cardID}`,
            method: `DELETE`,
            headers: {
                "Accept": "application/json"
            },
            body: undefined,
            description: `Cards`
        }
        let output;
        await fetchURI(config)
            .then(result => {
                output = result
            })
            .catch(error => {
                throw error
            });
        return output;
    }
    static async updateCard(card) {
        const config = {
            uri: `http://localhost:3001/cards/${card.id}`,
            method: `PUT`,
            headers: {
                "Accept": "application/json",
                "Content-Type": 'application/json'
            },
            body: card,
            description: `Cards`
        }
        let output;
        await fetchURI(config)
            .then(result => {
                output = result
            })
            .catch(error => {
                throw error
            });
        return output;
    }
}
export default FetchCard