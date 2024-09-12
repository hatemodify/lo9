import _ from './home.module.scss'
import { UNSPLASH_API } from '../api'



export default function intro({ bg }: { bg: string }) {
  console.log(bg)
  return (
    <section className={_.section_intro} style={{ backgroundImage: `url(${bg})` }}>
      <div className={_.wrap_intro}>
        <h2 className={_.tit_intro}>HELLO<br /> WEEKEND,<br />GOOD BYE WEEK</h2>
      </div>
    </section>
  )
}

