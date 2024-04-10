import { SpotifyApi, AuthorizationCodeWithPKCEStrategy } from '@spotify/web-api-ts-sdk'

const auth = new AuthorizationCodeWithPKCEStrategy(
    'a8db7a861337459eb17dc0bcaa86f671',
    'http://localhost:5173',
    [
        'user-read-private',
        'user-read-email',
        'playlist-modify-public',
        'playlist-modify-private, user-read-playback-state, user-modify-playback-state'
    ]
)

const spotify = new SpotifyApi(auth)

export default spotify