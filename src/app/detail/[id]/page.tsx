
import { ref, child, get } from "firebase/database";
import { rdb } from "../../firebase";
import parse from 'html-react-parser'



const fetchPost = async (id: string) => {
  const dbRef = ref(rdb);
  const res = await get(child(dbRef, `posting/${id}`)).then((snapshot) => {
    if (snapshot.exists()) {
      return snapshot.val()
    } else {
      console.log("No data available");
      return []
    }
  }).catch((error) => {
    console.error(error);
  });
  return res
}

export default async function Page({ params }: any) {
  const { id } = params
  const { title, contents, thumbnail } = await fetchPost(id)
  return (
    <div>
      <img src={thumbnail} alt='' />
      {parse(contents)}
    </div>
  )
}
