import Component, { PageEl } from '@/components/Libs/Component';
import Copy from '@/components/Libs/Copy';
import Router from 'next/router'
import Window from '@/components/Libs/Window';
import TextBox from '@/components/Libs/TextBox';
import Icon2Titles from '@/components/Libs/Icon2Titles';
import Icon3Titles from '@/components/Libs/Icon3Titles';


export default p => Component(p, Page);
const Page: PageEl = (props, state, refresh, getProps) => {

  let styles = global.styles


  return (
    <div style={{ direction: "ltr", minHeight: "11vh", }}>
      <br-x />
      <Window title={"ShirazWeather"} 
      style={{ minHeight: 280, margin: 10, width: "calc(100% - 20px)",
        backgroundImage:'url("https://cdn.ituring.ir/research/4/cloud1.jpg")'
       }}>
        {/* <pre style={{ direction: "ltr" }}>{JSON.stringify(props.data.current_condition[0].FeelsLikeC, null, 2)}</pre> */}



        
        <c-x>

          <br-xx/>
          <br-xx/>

          <f-18>Weather:</f-18>



          <f-cse>

            <f-cc style={{height:80, width:300, backgroundColor:"white", borderRadius:5}}>
            <img src='https://cdn.ituring.ir/research/4/temp.jpg'
          style={{ height: 30, objectFit: "contain" }} />
          <span>FeelsLike:{props.feelslikec} °C</span>

            </f-cc>

            <f-cc style={{height:80, width:300, backgroundColor:"white", borderRadius:5}}>
            <img src='https://cdn.ituring.ir/research/4/dropp.jpg'
          style={{ height: 30, objectFit: "contain" }} />
          <span>Humidity:{props.humidity} %RH</span>

            </f-cc>

          </f-cse>

          <br-xx/>
          <br-xx/>

          <f-cse style={{width:"100%",}}>

            <f-16 style={{color:"black"}}>
          <br-x/>
          <br-x/>
          <br-x/>
          <br-x/>
          <br-x/>
          <br-x/>
          <br-x/>
          <br-x/>
          <br-x/>
          <br-x/>
          <br-x/>
          <br-x/>
          <br-x/>
          <br-x/>
          


        prepared by the 127 research team

            </f-16>

          </f-cse>




        </c-x>
        

        
        
        


      </Window>
    </div>
  )
}


export async function getServerSideProps(context) {


  var session = await global.SSRVerify(context)
  var { uid, name, image, imageprop, lang, cchar,
    unit, workspace, servid, servsecret,
    usedquota, quota, quotaunit, status, regdate, expid,
    role, path, devmod, userip, } = session;

  let data = await (await fetch("https://cdn.ituring.ir/research/api/weather")).json()

  let feelslikec = data.current_condition[0].FeelsLikeC
  let humidity = data.current_condition[0].humidity



  return {
    props: {
      data: global.QSON.stringify({
        session,
        feelslikec,
        humidity,

        // nlangs,
      })
    },
  }
}