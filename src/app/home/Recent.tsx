import React from 'react'
import _ from './home.module.scss'
import { rdb } from "../firebase"
import { ref, get, child } from "firebase/database"
import parse from 'html-react-parser'
import Link from 'next/link';
import Image from 'next/image'

  const accessKey = process.env.NEXT_PUBLIC_UNSPLASH_TOKEN

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


export default async function Recent() {
  const data = await fetchPost()
  return (
    <section className={_.section_recent}>
      <h3 className={_.recent_header}>Latest Updates</h3>
      <ol className={_.recent_posts}>
        {
          data && Object.entries(data).map((posting: any) => (
            <li className={_.post_item} key={posting[0]}>
              <Link href={`/detail/${posting[0]}`} key={posting[0]}>
                <figure className={_.post_thumb}>
                  <img src={posting[1].thumbnail} alt='a' />
                </figure>
                <div className={_.post_info}>
                  {(posting[1].title)}
                </div>
              </Link>
            </li>
          ))
        }
      </ol>
    </section>
  )
}
