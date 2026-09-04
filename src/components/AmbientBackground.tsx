import React from "react";
import { StyleSheet, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";

import { Colors } from "../theme/colors";
import { useAdaptiveContext } from "battery-aware-adaptive-ui";


export default function AmbientBackground() {

  const { mode } = useAdaptiveContext();


  const balanced = mode === "Balanced";
  const powerSaver = mode === "Power Saver";
  const ultraSaver = mode === "Ultra Saver";


  // Maximum battery saving
  if (ultraSaver) {
    return (
      <View style={styles.ultraBackground} />
    );
  }


  return (
    <View style={StyleSheet.absoluteFill}>


      <LinearGradient
        colors={
          powerSaver
            ? ["#111111", "#222222"]
            : Colors.darkGradient
        }
        style={StyleSheet.absoluteFill}
      />


      {/* Performance: 3 blobs */}
      {!powerSaver && !balanced && (
        <>
          <View style={[styles.blob, styles.blob1]} />
          <View style={[styles.blob, styles.blob2]} />
          <View style={[styles.blob, styles.blob3]} />
        </>
      )}


      {/* Balanced: fewer and softer effects */}
      {balanced && (
        <>
          <View style={[styles.blob, styles.balancedBlob1]} />
          <View style={[styles.blob, styles.balancedBlob2]} />
        </>
      )}


      {/* Power Saver: no blobs */}


    </View>
  );
}



const styles = StyleSheet.create({


  ultraBackground:{
    ...StyleSheet.absoluteFillObject,
    backgroundColor:"#101010",
  },


  blob:{
    position:"absolute",
    borderRadius:999,
  },


  blob1:{
    width:220,
    height:220,
    backgroundColor:"rgba(124,92,255,0.25)",
    top:-40,
  },


  blob2:{
    width:180,
    height:180,
    backgroundColor:"rgba(79,209,255,0.18)",
    bottom:90,
    left:-50,
  },


  blob3:{
    width:160,
    height:160,
    backgroundColor:"rgba(255,95,178,0.14)",
    top:"42%",
    right:-30,
  },


  balancedBlob1:{
    width:180,
    height:180,
    backgroundColor:"rgba(124,92,255,0.15)",
    top:-30,
  },


  balancedBlob2:{
    width:120,
    height:120,
    backgroundColor:"rgba(79,209,255,0.10)",
    bottom:120,
    left:-40,
  },


});