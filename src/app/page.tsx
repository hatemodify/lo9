import Intro from './home/Intro'
import Recent from "./home/Recent"
import { searchImage, UNSPLASH_API } from "./api";



const accessKey = process.env.NEXT_PUBLIC_UNSPLASH_TOKEN
const weatherKeywords = [
  "sunny day",
  "rainy",
  "snowy mountain",
  "clear blue sky",
  "foggy morning",
  "light drizzle",
  "thunderstorm",
  "overcast sky",
  "windy day",
  "autumn leaves",
  "sunset over the ocean",
  "misty forest",
  "frosty trees",
  "desert heat",
]
const keyword = weatherKeywords[Math.floor(Math.random() * weatherKeywords.length)]
const getBgImage = async (keyword: string) => {
  try {
    const response = await fetch(searchImage(keyword), {
      headers: {
        'Authorization': `Client-ID ${accessKey}`
      }
    })

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const data = await response.json()
    const mostLikedItem = data.results.reduce((maxItem: any, currentItem: any) => {
      return currentItem.likes > maxItem.likes ? currentItem : maxItem
    }, data.results[0]);

    return mostLikedItem.urls.regular

  } catch (error) {
    console.error('Error fetching the random image:', error)
  }
}
export default async function Home() {
  const bg = await getBgImage(keyword).then((res) => res)
  return (
    <main >
      <Intro bg={bg} />
      <Recent />
    </main>
  )
}
