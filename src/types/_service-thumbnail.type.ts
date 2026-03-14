export enum EServiceThumbnailType {
	IMAGE_PNG = 'ImagePng',
	VIDEO_GIF = 'VideoGif'
}
export type TServiceThumbnail = {
	id: string
	url: string
	type: EServiceThumbnailType
}

