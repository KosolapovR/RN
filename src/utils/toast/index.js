export const getSuccessToastConfig = ({message}) => ({
  message: message,
  intent: 'SUCCESS',
  toastStyles: {
    bg: '#6eab27',
    borderRadius: 5,
    borderColor: '#6eab27',
  },
  color: 'white',
  iconColor: 'white',
  iconSize: 25,
  iconFamily: 'Ionicons',
  iconName: 'ios-checkmark-circle-outline',
  closeButtonStyles: {
    px: 4,
    bg: '#6eab27',
    borderRadius: 16,
  },
  closeIconColor: 'white',
  hideAccent: true,
});

export const getWarningToastConfig = ({message}) => ({
  message: message,
  intent: 'SUCCESS',
  toastStyles: {
    bg: '#F89F0B',
    borderRadius: 5,
    borderColor: '#F89F0B',
  },
  color: 'white',
  iconColor: 'white',
  iconSize: 25,
  iconFamily: 'Ionicons',
  iconName: 'ios-alert-circle-outline',
  closeButtonStyles: {
    px: 4,
    bg: '#F89F0B',
    borderRadius: 16,
  },
  closeIconColor: 'white',
  hideAccent: true,
});

export const getErrorToastConfig = ({message}) => ({
  message: message,
  intent: 'ERROR',
  toastStyles: {
    bg: '#ED3D56',
    borderRadius: 5,
    borderColor: '#ED3D56',
  },
  color: 'white',
  iconColor: 'white',
  iconSize: 25,
  iconFamily: 'Ionicons',
  iconName: 'ios-alert-circle-outline',
  closeButtonStyles: {
    px: 4,
    bg: '#ED3D56',
    borderRadius: 16,
  },
  closeIconColor: 'white',
  hideAccent: true,
});
