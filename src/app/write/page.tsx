'use client'
import React, { useEffect, useRef, useState } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { uid } from "uid"

import writePosting from '../middleware/write'
import { UNSPLASH_API } from '../api'
import { useRouter } from 'next/navigation'
declare const tinymce: any

export default function App() {
  const editorRef = useRef<any>(null)
  const [category, setCategory] = useState()
  const [title, setTitle] = useState<any>('')
  const accessKey = process.env.NEXT_PUBLIC_UNSPLASH_TOKEN
  const [thumbnail, setThumbnail] = useState<null | string>(null)
  const router = useRouter()

  const getRandomImage = async () => {
    try {
      const response = await fetch(UNSPLASH_API(), {
        headers: {
          'Authorization': `Client-ID ${accessKey}`
        }
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const data = await response.json()
      return data.urls.regular
    } catch (error) {
      console.error('Error fetching the random image:', error)
    }
  }



  const extractImageInfo = (content: any) => {
    const srcReg = /([^>"']*(?:base64)+[^>"']+)["']?[^>]*>/g
    const nameReg: any = /<img[^>]*title=[\"']?([^>\"']+)[\"']?[^>]*>/g
    const imageList = []
    let html
    while ((html = srcReg.exec(content))) {
      imageList.push({
        src: html[1],
        name: uid()
      })
    }
    return imageList
  }


  const write = () => {
    const contents = editorRef.current.getContent()
    const base64Array = extractImageInfo(contents)
    writePosting({ thumbnail, title, contents, base64Array }).then(() => router.push('/'))
  }



  useEffect(() => {
    getRandomImage().then((res) => {
      setThumbnail(res)
    })
  }, [])


  return (
    <>
      <input type='text' value={title} onChange={({ target }) => setTitle(target.value)} />
      <select>
        <option></option>
        <option></option>
        <option></option>
        <option></option>
      </select>
      <Editor
        apiKey='4xla9qsolodszeh9s950zz8kwsecx7f44hoq7ounwnbpzx8k'
        onInit={(evt, editor) => editorRef.current = editor}
        initialValue=""
        id='46343733611688976524318'
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount', 'codesample',
          ],
          toolbar: 'undo redo | blocks fontfamily fontsize forecolor backcolor| bold italic underline strikethrough | link emoticons image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent |  charmap | removeformat | codesample',
          content_style: 'body {font - family:Helvetica,Arial,sans-serif font-size:14px }',
          image_title: true,
          /* enable automatic uploads of images represented by blob or data URIs*/
          file_picker_types: 'image',
          file_picker_callback: function (cb, value, meta) {
            const input: any = document.createElement('input')
            input.setAttribute('type', 'file')
            input.setAttribute('accept', 'image/*')

            /*
              Note: In modern browsers input[type="file"] is functional without
              even adding it to the DOM, but that might not be the case in some older
              or quirky browsers like IE, so you might want to add it to the DOM
              just in case, and visually hide it. And do not forget do remove it
              once you do not need it anymore.
            */

            input.onchange = function () {
              const file = this.files[0]

              let reader: any = new FileReader()
              reader.onload = function () {
                const id = 'blobid' + new Date().getTime()
                const blobCache: any = tinymce.activeEditor.editorUpload.blobCache
                const base64 = reader.result.split(',')[1]
                const blobInfo = blobCache.create(id, file, base64)
                blobCache.add(blobInfo)
                cb(blobInfo.blobUri(), { title: file.name })
              }
              console.log(reader)
              reader.readAsDataURL(file)
            }

            input.click()
          },
        }}
      />
      <button onClick={write}>write</button>
    </>
  )
}