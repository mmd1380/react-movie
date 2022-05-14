export const convertFromByteArrayToSrring = (item: ArrayBuffer) => {
  return 'data:image/jpeg;base64,' + btoa(new Uint8Array(item).reduce((data, byte) => data + String.fromCharCode(byte), ''));
}

export const dateFormat = (date: Date) => {
  const dateObject = new Date(date);
  const year = dateObject.getFullYear();
  let month: string | number = dateObject.getMonth();
  let day: string | number = dateObject.getDay();
  if(day < 10) {
    day = `0${day + 1}`
  } else {
    day++;
  }
  if(month < 10) {
    month = `0${month + 1}`
  } else {
    month++;
  }
  return `${year}-${month}-${day}`
}