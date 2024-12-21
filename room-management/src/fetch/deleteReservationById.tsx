const deleteRoomById = async (reservationId: number) => {
    const baseUrl = "http://localhost:8080/api/reservations"; 
    const url = `${baseUrl}/${reservationId}`; 
  
    try {
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          });
      
          if (!response.ok) {
            throw new Error(`Failed to delete reservation. Status: ${response.status}`);
          }
      
          console.log(`Reservation ${reservationId} deleted successfully.`);
        } catch (error) {
          console.error("Error deleting reservation:", error);
          throw error;
        }
    };
  
  export default deleteRoomById;
  