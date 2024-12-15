const fetchRoomsByLocation = async(location:String) => {
    const baseUrl = "http://localhost:8080/api/rooms/location"; 
    const url = `${baseUrl}?location=${location}`;
    console.log(url);
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
      return data; 
    } catch (error) {
      console.error("Error fetching rooms by location:", error);
      throw error;
    }
}

export default fetchRoomsByLocation;
  