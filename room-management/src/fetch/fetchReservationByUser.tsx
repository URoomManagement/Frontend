import { API_ROUTES } from "@/config/api";

const fetchRoomWithReservations = async (userId: number) => { 
    const url = API_ROUTES.reservation.user(userId); 
  
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
      const transformedData = data.map((reservation: any) => ({
        ...reservation,
        startedAt: new Date(reservation.startedAt),
        endedAt: new Date(reservation.endedAt),
      }));
      return transformedData;
    } catch (error) {
      console.error("Error fetching room with reservations:", error);
      throw error;
    }
  };
  
  export default fetchRoomWithReservations;
  