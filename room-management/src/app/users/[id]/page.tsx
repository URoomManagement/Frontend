"use client";

import Navbar from "@/components/navbar/Navbar";
import { useParams } from "next/navigation";
  
const User = () => {
    const params = useParams();
    return (
        <>
            <Navbar />
            <div className="pt-20">
                <h1>Dynamic Page</h1>
                <p>The ID is: {params.id}</p>
            </div>
        </>
        
    );
}

export default User;
  