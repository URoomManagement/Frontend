import { API_ROUTES } from "@/config/api";

const fetchRoomWithReservations = async (roomId: number) => {
    const url = API_ROUTES.reservation.room(roomId); 
  
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json", 
        },
        credentials: "include",
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();

      const transformedReservations = data.reservations.map((reservation: any) => ({
        ...reservation,
        startedAt: new Date(reservation.startedAt),
        endedAt: new Date(reservation.endedAt),
      }));
  
      return {
        roomLocation: data.roomLocation,
        roomName: data.roomName,
        roomInfo: data.roomInfo,
        reservations: transformedReservations,
      };
    } catch (error) {
      throw error;
    }
  };
  
  export default fetchRoomWithReservations;
  