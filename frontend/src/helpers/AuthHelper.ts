export function getToken() {
    const data = {
        client_id: "a8db7a861337459eb17dc0bcaa86f671",
        client_secret: "85890f24095f487aaa1e3a4216906ee8"
    }

    const token: string
    try {
        const response = fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            body: {
                grant_type: 'client_credentials',
                client_id: data.client_id,
                client_secret: data.client_secret
            }
        })
        if (!response.ok) {
            throw new Error('Failed to fetch token')
        }
    } catch (error) {
        token = response.access_token;
        console.error('Error fetching token:', error)
    }

    return token;
}