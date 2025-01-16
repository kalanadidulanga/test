"use client";

import useAxios from "@/hooks/useAxios";
import { useEffect, useState } from "react";

export default function Home() {
  const [cards, setCards] = useState<any[]>([]);
  const { fetch } = useAxios();

  const getSliders = async () => {
    try {
      const response = await fetch({
        url: "http://localhost:3000/api/sliders",
        method: "GET",
      });
      if (response.data.success) {
        console.log(response.data.data);
        setCards(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      // setIsSocialLoading(false);
    }
  };

  useEffect(() => {
    getSliders();
  }, []);
  return (
    <div>
      <div>
        {cards.map((card, index) => (
          <div key={index}>
            <img src={card.imageUrl} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
}
