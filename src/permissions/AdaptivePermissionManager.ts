import {
  Alert,
} from "react-native";

import {
  AdaptivePermissionStatus,
  AdaptivePermissionState,
} from "./PermissionTypes";


class AdaptivePermissionManager {

  private permissionState: AdaptivePermissionState = {
    status: AdaptivePermissionStatus.NOT_ASKED,
    allowUltraSaveMode: false,
  };


  getPermissionStatus(): AdaptivePermissionState {
    return this.permissionState;
  }


  requestPermission(): Promise<boolean> {

    return new Promise((resolve) => {


      Alert.alert(
        "Battery Aware Ultra Save Mode",
        "Your device has entered Ultra Save Mode. Enable adaptive battery saving features to reduce animations, rendering effects, and background activity?",
        [
          {
            text: "Cancel",
            style: "cancel",
            onPress: () => {
              this.permissionState = {
                status: AdaptivePermissionStatus.DENIED,
                allowUltraSaveMode: false,
              };
              resolve(false);
            },
          },

          {
            text: "Enable",
            onPress: () => {

              this.permissionState = {
                status: AdaptivePermissionStatus.GRANTED,
                allowUltraSaveMode: true,
              };

              resolve(true);

            },
          },

        ]
      );


    });

  }



  resetPermission(){

    this.permissionState = {
      status: AdaptivePermissionStatus.NOT_ASKED,
      allowUltraSaveMode:false,
    };

  }

}


export default new AdaptivePermissionManager();