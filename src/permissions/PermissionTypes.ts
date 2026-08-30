export enum AdaptivePermissionStatus {
  GRANTED = "GRANTED",
  DENIED = "DENIED",
  NOT_ASKED = "NOT_ASKED",
}


export interface AdaptivePermissionState {
  status: AdaptivePermissionStatus;
  allowUltraSaveMode: boolean;
}