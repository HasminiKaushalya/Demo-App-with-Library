import React from "react";
import {
  ImageBackground,
  ImageSourcePropType,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";

import LinearGradient from "react-native-linear-gradient";
import Video, { ReactVideoSource } from "react-native-video";

import { Colors } from "../theme/colors";
import { useAdaptiveContext } from "battery-aware-adaptive-ui";


type Stat = {
  value: string;
  label: string;
};


type Props = {
  title: string;
  subtitle: string;
  image?: ImageSourcePropType;
  videoSource?: ReactVideoSource | any;
  video?: any;
  stats?: Stat[];
  height?: number;
};



export default function HeroBanner({
  title,
  subtitle,
  image,
  videoSource,
  video,
  stats,
  height = 250,
}: Props) {


  const { mode } = useAdaptiveContext();


  const activeVideo = videoSource || video;


  const isPowerSaver =
    mode === "Power Saver";


  const isUltraSaver =
    mode === "Ultra Saver";



  const content = (

    <LinearGradient

      colors={
        isUltraSaver
          ?
          [
            "rgba(0,0,0,0.55)",
            "rgba(15,15,15,0.95)"
          ]
          :
          [
            "rgba(0,0,0,0.05)",
            "rgba(11,16,32,0.45)",
            "rgba(11,16,32,0.85)"
          ]
      }

      style={styles.overlay}

    >


      <View style={styles.content}>


        <Text style={styles.title}>
          {title}
        </Text>


        <Text style={styles.subtitle}>
          {subtitle}
        </Text>



        {
          stats &&

          <View style={styles.statsRow}>

            {
              stats.map((item,index)=>(

                <View
                  key={index}
                  style={styles.stat}
                >

                  <Text style={styles.statValue}>
                    {item.value}
                  </Text>


                  <Text style={styles.statLabel}>
                    {item.label}
                  </Text>


                </View>

              ))
            }

          </View>

        }


      </View>


    </LinearGradient>

  );




  /*
    VIDEO MODE

    Android:
      react-native-video

    Web:
      HTML5 video
  */


  if(activeVideo && !isUltraSaver){


    return (

      <View
        style={[
          styles.wrap,
          {height}
        ]}
      >


        {
          Platform.OS === "web"

          ?

          <video

            src={
              typeof activeVideo === "number"
                ? undefined
                : activeVideo
            }

            style={
              styles.webVideo
            }

            autoPlay={
              !isPowerSaver
            }

            loop

            muted

            playsInline

          />


          :


          <Video

            source={activeVideo}

            style={
              StyleSheet.absoluteFillObject
            }

            resizeMode="cover"

            repeat

            muted

            paused={isPowerSaver}

            controls={false}

            playInBackground={false}

            playWhenInactive={false}

            disableFocus

          />

        }



        {content}


      </View>

    );

  }






  /*
    ULTRA SAVER
    Static image only
  */


  return (

    <ImageBackground


      source={
        image ||
        require("../assets/images/career-luxury.webp")
      }


      style={[
        styles.wrap,
        {height}
      ]}


      imageStyle={
        styles.image
      }


    >


      {content}


    </ImageBackground>

  );

}




const styles = StyleSheet.create({


  wrap: {

    borderRadius:30,

    overflow:"hidden",

    marginBottom:22,

  },



  image: {

    borderRadius:30,

  },



  webVideo: {

    position:"absolute",

    width:"100%",

    height:"100%",

    objectFit:"cover",

  } as any,



  overlay: {

    flex:1,

    justifyContent:"flex-end",

  },



  content: {

    padding:22,

  },



  title: {

    color:Colors.white,

    fontSize:28,

    fontWeight:"900",

    letterSpacing:-0.8,

  },



  subtitle: {

    color:"rgba(255,255,255,0.82)",

    fontSize:14,

    lineHeight:21,

    marginTop:8,

    maxWidth:"92%",

  },



  statsRow: {

    flexDirection:"row",

    marginTop:18,

  },



  stat: {

    flex:1,

    marginRight:10,

    borderRadius:18,

    padding:12,

    backgroundColor:"rgba(255,255,255,0.12)",

  },



  statValue: {

    color:Colors.white,

    fontSize:18,

    fontWeight:"900",

  },



  statLabel: {

    color:"rgba(255,255,255,0.75)",

    fontSize:11,

    marginTop:3,

    fontWeight:"700",

  },


});