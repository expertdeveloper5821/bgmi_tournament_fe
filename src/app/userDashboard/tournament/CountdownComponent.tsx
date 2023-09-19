'use client';
const CountdownComponent = (dateAndTime: string, roomUuid: string, setVisibleRooms: React.Dispatch<React.SetStateAction<string[]>>) => {
  if (dateAndTime && roomUuid) {
    setInterval(() => {
      const REDUCE_TIME = 15 * 60 * 1000;
      const currentTime = new Date().getTime();
      let dateNumber = new Date(dateAndTime).getTime();
      const reducedTime = new Date(dateNumber - REDUCE_TIME).getTime();
      if (currentTime >= reducedTime) {
        setVisibleRooms(prevRooms => [...prevRooms, roomUuid])
      }
    }, 60000)
  }
};

export default CountdownComponent;