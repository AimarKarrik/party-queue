import type { SimplifiedArtist } from '@spotify/web-api-ts-sdk';

export function getAllArtists(artists: SimplifiedArtist[]) {
    try {
        return artists.map((artist) => artist.name).join(', ');
    } catch (error) {
        console.log('Error in Artists');
    }
}