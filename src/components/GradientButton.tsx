import React, { useRef } from "react";

import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
  StyleProp,
} from "react-native";

import LinearGradient from "react-native-linear-gradient";

import { Colors } from "../theme/colors";
import { Shadows } from "../theme/shadows";

import { useAdaptiveContext } from "battery-aware-adaptive-ui";



type Props = {

  title:string;
  icon?:string;
  onPress?:()=>void;
  style?:StyleProp<ViewStyle>;
  colors?:string[];

};



export default function GradientButton({

 title,
 icon,
 onPress,
 style,
 colors = Colors.accentGradient,

}:Props){


 const scale = useRef(new Animated.Value(1)).current;


 const { mode } = useAdaptiveContext();


 const balanced = mode === "Balanced";
 const powerSaver = mode === "Power Saver";
 const ultraSaver = mode === "Ultra Saver";

const animate = (value:number) => {

  // Performance mode = full animation
  if (mode === "Performance") {

    Animated.spring(scale,{
      toValue:value,
      useNativeDriver:true,
      tension:220,
      friction:12,
    }).start();

  }


  // Balanced mode = softer animation
  else if (mode === "Balanced") {

    Animated.spring(scale,{
      toValue:value,
      useNativeDriver:true,
      tension:120,
      friction:18,
    }).start();

  }


  // Power Saver = very small animation
  else if (mode === "Power Saver") {

    Animated.spring(scale,{
      toValue:value,
      useNativeDriver:true,
      tension:80,
      friction:25,
    }).start();

  }


  // Ultra Saver = no animation
  else {

    scale.setValue(1);

  }

};

 return(

 <Animated.View
 style={[
 {
  transform:[
   {
    scale
   }
  ]
 },
 style
 ]}
 >


 <TouchableOpacity

 activeOpacity={0.92}

 onPress={onPress}

 onPressIn={()=>animate(0.97)}

 onPressOut={()=>animate(1)}

 >



 {
 ultraSaver ?


 (
  <TouchableOpacity
   style={styles.ultraButton}
   onPress={onPress}
  >

   <Text style={styles.text}>
    {title}
   </Text>


  </TouchableOpacity>
 )


 : powerSaver ?


 (
  <TouchableOpacity
   style={styles.powerButton}
   onPress={onPress}
  >

   <Text style={styles.text}>
    {title}
   </Text>

  </TouchableOpacity>
 )


 :


 (
 <LinearGradient

 colors={colors}

 style={
  balanced
  ? styles.balancedButton
  : styles.button
 }

 >


 {
 icon ?
 <Text style={styles.icon}>
  {icon}
 </Text>
 :
 null
 }


 <Text style={styles.text}>
 {title}
 </Text>


 <Text style={styles.arrow}>
 →
 </Text>


 </LinearGradient>
 )


 }



 </TouchableOpacity>


 </Animated.View>


 );


}



const styles=StyleSheet.create({


button:{
 height:58,
 borderRadius:18,
 paddingHorizontal:22,
 alignItems:"center",
 justifyContent:"center",
 flexDirection:"row",
 ...Shadows.glow,
},



balancedButton:{
 height:58,
 borderRadius:18,
 paddingHorizontal:22,
 alignItems:"center",
 justifyContent:"center",
 flexDirection:"row",
},



powerButton:{
 height:58,
 borderRadius:18,
 backgroundColor:"#555",
 alignItems:"center",
 justifyContent:"center",
 paddingHorizontal:22,
},



ultraButton:{
 height:58,
 borderRadius:18,
 backgroundColor:"#333",
 alignItems:"center",
 justifyContent:"center",
 paddingHorizontal:22,
},



icon:{
 fontSize:18,
 marginRight:8,
},



text:{
 color:Colors.white,
 fontSize:16,
 fontWeight:"900",
},



arrow:{
 color:Colors.white,
 fontSize:20,
 marginLeft:8,
 fontWeight:"900",
},



});