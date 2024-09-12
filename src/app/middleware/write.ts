import { ref, uploadString, getDownloadURL } from 'firebase/storage'
import { storage, rdb } from '../firebase'
import { ref as dbRef, set } from 'firebase/database'
import { uid } from 'uid'
import { redirect } from 'next/navigation'

const newImageData: any[] = []

const uploadImage = async (arr: any[], newArr: any[], data: any) => {
	for (const item of arr) {
		const id = uid()
		const storageRef = ref(storage, `posting/${id}_${item.name}`)
		await uploadString(storageRef, item.src, 'data_url').then(
			async (snapshot) => {
				await getDownloadURL(ref(storage, `posting/${id}_${item.name}`)).then(
					async (url) => {
						newArr.push(url)
					}
				)
			}
		)
	}

	return replaceUrl(newArr, data)
}

const replaceUrl = (arr: any[], data: any) => {
	const regex = /(data:image\/[^;]+;base64[^"]+)/
	arr.forEach((item: any) => {
		data = data.replace(regex, `${item}`)
	})
	return data
}

export default function writePosting(_req: any) {
	const uuid = uid()
	uploadImage(_req.base64Array, newImageData, _req.contents).then((res) => {
		set(dbRef(rdb, 'posting/' + uuid), {
			title: _req.title,
			thumbnail: _req.thumbnail,
			contents: res,
		}).then(() => {
			return 'success'
		})
	})
}
