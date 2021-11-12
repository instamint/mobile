import axios from "axios";
import { InstagramMedia, InstagramMediaResponse, InstagramSession } from "../../types";
import * as storage from "../../storage";
import { INSTAGRAM_API, INSTAGRAM_API_VERSION } from "../../configuration";

const FIELDS = 'id,media_type,media_url,username,timestamp'

let token = ''

export const getImages = async () => {
    const instagramSessionString = await storage.get("instagramSession")

    if(!instagramSessionString) return undefined

    const instagramSession:InstagramSession  = JSON.parse(instagramSessionString)
    token = instagramSession.token

    const mediaURL = `${INSTAGRAM_API}/${INSTAGRAM_API_VERSION}/${instagramSession.userId}/media?fields=${FIELDS}&access_token=${token}`
    const response = await axios.get<InstagramMediaResponse>(mediaURL)
    const dataResponse = response.data

    if (dataResponse && dataResponse.data) {
        //Get images from albums
        const albums = dataResponse.data.filter(x => x.media_type === 'CAROUSEL_ALBUM')
        let imagesFromAlbums: InstagramMedia[] = []

        if (albums.length > 0) {
            const promises = albums.map(x => getMediaFromParent(x.id))
            const results = await Promise.all(promises)
            imagesFromAlbums = results.reduce((acc: InstagramMedia[], x)=>x ? acc.concat(x) : acc, [])
        }

        //merge data
        const imagesMedia = dataResponse.data.filter(x => x.media_type === 'IMAGE')
        const mergedMedia = [...imagesMedia, ...imagesFromAlbums]

        return mergedMedia
    }

}

const getMediaFromParent = async (parent: string): Promise<InstagramMedia[] | undefined> => {
    const childrenMediaURL = `${INSTAGRAM_API}/${parent}/children?fields=${FIELDS}&access_token=${token}`
    const response = await axios.get<InstagramMediaResponse>(childrenMediaURL)
    const dataResponse = response.data

    if (dataResponse.data) {
        const images = dataResponse.data.filter((x) => x.media_type === 'IMAGE')
        return images
    }
}