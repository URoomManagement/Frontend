import { API_ROUTES } from "@/config/api";

const deleteRoomById = async (reservationId: number) => {
    const url = API_ROUTES.reservation.delete(reservationId);
  
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
  