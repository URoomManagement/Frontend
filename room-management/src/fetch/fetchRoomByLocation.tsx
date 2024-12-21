import { API_ROUTES } from "@/config/api";

const fetchRoomsByLocation = async(location:String) => {
    const url = API_ROUTES.roomLocation(location);
    console.log(url);
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
      return data; 
    } catch (error) {
      console.error("Error fetching rooms by location:", error);
      throw error;
    }
}

export default fetchRoomsByLocation;
  