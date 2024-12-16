interface ReservationRequest {
    roomId: number;
    userId: number;
    purpose: string;
    startedAt: Date;
    endedAt: Date;
}
  
const createReservationByRoomAndId = async (reservation: ReservationRequest) => {
  const url = "http://localhost:8080/api/reservations";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reservation),
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
  