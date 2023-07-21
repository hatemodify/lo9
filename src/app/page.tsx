import { rdb } from "@/app/firebase";
import { ref, set, get, child, push } from "firebase/database";
import { useEffect, useState } from 'react';
import { uid } from "uid";
import parse from 'html-react-parser'
import Link from 'next/link';


const fetchPost = async () => {
  const dbRef = ref(rdb);
  const res = await get(child(dbRef, `posting/`)).then((snapshot) => {
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


export default async function Home() {

  const data= await fetchPost()

  return (
    <main >
      <div>
        {
          data && Object.entries(data).map((posting: any) => (
            <Link href={`/detail/${posting[0]}`} key={posting[0]}>
              {posting[1].title}
              {parse(posting[1].contents)}
            </Link>
          ))
        }
      </div>
    </main>
  )
}
