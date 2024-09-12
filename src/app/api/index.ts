const UNSPLASH_API = (params?: string) =>
	`https://api.unsplash.com/photos/random?w=${params}`

const searchImage = (keyword?: string) =>
	`https://api.unsplash.com/search/photos?page=1&query=${keyword}&per_page=30&orientation=landscape`

export { UNSPLASH_API, searchImage }
