import { API_ROUTES } from "@/config/api";

interface ReservationRequest {
    roomId: number;
    userId: number;
    purpose: string;
    startedAt: Date;
    endedAt: Date;
}
  
const createReservationByRoomAndId = async (reservation: ReservationRequest) => {
  const url = API_ROUTES.reservation.create;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reservation),
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`Failed to create reservation. Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Reservation created successfully:", data);
    return data;
  } catch (error) {
    console.error("Error creating reservation:", error);
    throw error;
  }
};

export default createReservationByRoomAndId;
  