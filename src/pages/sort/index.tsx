import React, { useEffect, useState } from 'react';
import styles from './index.less';
import { useRequest,useNavigate } from '@umijs/max';
import { getsort, searchsort } from '@/services/user'
import {Image } from 'antd-mobile'
export default function Page() {
  const navigate = useNavigate()
  const [first, setfirstatt] = useState(0)
  const [second, secondatt] = useState(1)
  const [third, thirdatt] = useState(1)
  const [active, setactive] = useState([0,1,0])
  const { data: cdata, error, loading ,run:exarun} = useRequest(() => {
    return getsort();
  }, {
    cacheKey: 'data',
  });
  const { data: detdata, loading: detloading ,run} = useRequest(() => {
    return searchsort(first, second, third);
  }, {
    cacheKey: 'data2',
  });
  const gete1 = (e:any) => {

    setfirstatt(e.target.childNodes[1].innerHTML)
  }
  const gete2 = (e:any) => {
    console.log(e.target.childNodes[2].innerHTML);
    secondatt(e.target.childNodes[2].innerHTML)
  }
  const gete3 = (e:any) => {
    console.log(e.target.childNodes[1].innerHTML);
    thirdatt(e.target.childNodes[1].innerHTML)
  }
  useEffect(() => {
    run()
    setactive([first, second, third])
  }, [first, second, third])
  useEffect(()=>{
    run();
    exarun()
   },[])
  const todetaill= (e:any,title)=>{
    console.log(e);
    navigate(`/chapter?id=${e}&title=${title}`)
  }
  return (
    <div className={styles.bigbox}>
      <div className={styles.sortlist}>
        <ul className={styles.s1} onClick={(e) => gete1(e)}>
          {cdata && cdata.tags && cdata.tags.map((item:any) => {
            return <li key={item.title}  style={{borderBottom: (item.tag_id==active[0]) ? "1px solid red" : "none"}}>{item.title}<span style={{ display: 'none' }}>{item.tag_id}</span></li>
          })}
        </ul>
        <hr style={{  clear: 'both' }}></hr>
        <ul className={styles.s1} onClick={(e) => gete2(e)}>
          {cdata && cdata.update_status.map(item => {
            return <li key={item.code}  style={{borderBottom: (item.code==active[1]) ? "1px solid red" : "none"}}>{item.description} <span style={{ display: 'none' }}>{item.code}</span></li>
          })}
        </ul>
        <div style={{ clear: 'both' }}></div>
        <ul className={styles.s1} onClick={(e) => gete3(e)}>
          <li  style={{borderBottom: (active[2]==1) ? "1px solid red" : "none"}}>推荐 <span style={{ display: 'none' }}>1</span></li>
          <li  style={{borderBottom: (active[2]==2) ? "1px solid red" : "none"}}>最火热 <span style={{ display: 'none' }}>2</span></li>
          <li  style={{borderBottom: (active[2]==3) ? "1px solid red" : "none"}}>新上架 <span style={{ display: 'none' }}>3</span></li>
        </ul>
      </div>
      <br></br>
      <div>
        <ul className={styles.detailsortlist}>
        
            {detdata && detdata.topics.map((item) => {
              return <li key={item.id} className={styles.innersort} onClick={(e)=>todetaill(item.id,item.title)}>
                <Image src={item.vertical_image_url} width={100} height={120} fit='fill' />
                {item.title} <br></br>{item.sub_title}
             </li>
            })}
          
        </ul>

      </div>

    </div>
  );
}
