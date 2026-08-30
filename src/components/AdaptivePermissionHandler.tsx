import React, { useEffect } from "react";

import {
  useAdaptiveMode,
} from "battery-aware-adaptive-ui";

import AdaptivePermissionManager from "../permissions/AdaptivePermissionManager";


export default function AdaptivePermissionHandler() {


  const mode = useAdaptiveMode();



  useEffect(() => {


    if (mode === "Ultra Saver") {

      const askPermission = async () => {

        await AdaptivePermissionManager.requestPermission();

      };


      askPermission();

    }


  }, [mode]);



  return null;

}