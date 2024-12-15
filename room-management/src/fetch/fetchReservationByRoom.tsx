const fetchRoomWithReservations = async (roomId: string) => {
    const baseUrl = "http://localhost:8080/api/reservations/rooms"; 
    const url = `${baseUrl}/${roomId}`; 
  
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json", 
        },
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
      console.error("Error fetching room with reservations:", error);
      throw error;
    }
  };
  
  export default fetchRoomWithReservations;
  