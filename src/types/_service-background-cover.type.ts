export enum EServiceBackgroundCoverType {
	IMAGE_PNG = 'ImagePng',
	VIDEO_GIF = 'VideoGif'
}
export type TServiceBackgroundCover = {
	id: string
	url: string
	type: EServiceBackgroundCoverType
}

