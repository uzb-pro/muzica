import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import "./MusicId.scss"; 

const API_URL = "http://localhost:7878";

const MusicId = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const audioRef = useRef(null); // Musiqa pleer uchun useRef

  useEffect(() => {
    const fetchMusicData = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/products/${id}`);
        setData(res.data);
      } catch (err) {
        setError("Ma'lumotni yuklashda xatolik yuz berdi!");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMusicData();
    }
  }, [id]);

  // Musiqani avtomatik ijro qilish
  useEffect(() => {
    if (data?.music && audioRef.current) {
      const playAudio = async () => {
        try {
          await audioRef.current.play();
        } catch (err) {
          console.warn("Avtomatik ijroga ruxsat berilmadi:", err);
        }
      };

      playAudio();
    }
  }, [data]);

  if (loading) return <p>Yuklanmoqda...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!data) return <p>Ma'lumot topilmadi!</p>;

  return (
    <header>
      <div className="cart-page">
        <section className="hero">
          <div className="container">
            <div className="hero__wrapper">
              {/* Rasm chiqarish */}
              {data.image && (
                <div className="hero__image">
                  <img src={`${API_URL}/${data.image}`} alt={data.name} />
                </div>
              )}

              {/* Kontent bo‘limi */}
              <div className="hero__content">
                <h1>{data.name}</h1>

                {/* Musiqa player */}
                {data.music ? (
                  <div className="music-player">
                    <audio controls>
                      <source src={`http://localhost:7878/${data.music}`} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                ) : (
                  <p>Musiqa mavjud emas</p>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </header>
  );
};

export default MusicId;
