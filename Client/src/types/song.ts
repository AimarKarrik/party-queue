interface Thumbnail {
    url: string;
    width: number;
    height: number;
}

interface ShortBylineRun {
    text: string;
    navigationEndpoint: {
        clickTrackingParams: string;
        commandMetadata: {
            webCommandMetadata: {
                url: string;
                webPageType: string;
                rootVe: number;
                apiUrl: string;
            };
        };
        browseEndpoint: {
            browseId: string;
            canonicalBaseUrl: string;
        };
    };
}

interface Length {
    accessibility: {
        accessibilityData: {
            label: string;
        };
    };
    simpleText: string;
}

export default interface Song {
    id: string;
    type: string;
    thumbnail: {
        thumbnails: Thumbnail[];
    };
    title: string;
    channelTitle: string;
    shortBylineText: {
        runs: ShortBylineRun[];
    };
    length: Length;
    isLive: boolean;
}