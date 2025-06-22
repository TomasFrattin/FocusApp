import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import {
  PlayIcon,
  PauseIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
} from "@heroicons/react/24/outline";
import { Rnd } from "react-rnd";

const MusicPlayer = () => {
  const audioRef = useRef(null);
  const prevVolumeRef = useRef(50);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);
  const [position, setPosition] = useState({ x: 100 + Math.random() * 150, y: 300 + Math.random() * 150 });

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.muted = false;
      const restored = prevVolumeRef.current || 50;
      setVolume(restored);
      audio.volume = restored / 100;
    } else {
      prevVolumeRef.current = volume;
      audio.muted = true;
      setVolume(0);
      audio.volume = 0;
    }

    setIsMuted(!isMuted);
  };

  useEffect(() => {
    if (volume === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
  }, [volume]);

  const handleDragStop = (e, d) => {
    setPosition({ x: d.x, y: d.y }); // Actualiza la posición cuando el arrastre termina
  };

  return (
    <Rnd
      position={position}
      onDragStop={handleDragStop}
      bounds="window"
      dragHandleClassName="drag-handle"
      className="absolute bg-[#3f3f3f] opacity-85 pt-1 pb-2 pl-2 pr-2 rounded-lg shadow-lg"
      enableResizing={false}
      maxWidth={160}
      maxHeight={55}
    >
      <div className="h-full flex flex-col justify-between">
        <div className="drag-handle w-full flex justify-center cursor-move pb-1">
          <div
            className="mt-1 w-20 h-2 rounded-full bg-[#252525] cursor-move"
            style={{
              boxShadow: "0 0 4px rgba(0,0,0,0.2)",
            }}
          />
        </div>

        {/* Espaciador si querés más separación o contenido arriba */}

        <div className="flex items-center gap-1 justify-center">
          <button onClick={togglePlay}>
            {isPlaying ? (
              <PauseIcon className="h-7 w-7 text-white" />
            ) : (
              <PlayIcon className="h-7 w-7 text-white" />
            )}
          </button>

          <button onClick={toggleMute}>
            {isMuted ? (
              <SpeakerXMarkIcon className="h-7 w-7 text-white" />
            ) : (
              <SpeakerWaveIcon className="h-7 w-7 text-white" />
            )}
          </button>

          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={handleVolumeChange}
            className="w-20"
          />
        </div>
      </div>

      <audio ref={audioRef} src="/sounds/Lo-Fi.mp3" preload="auto" />
    </Rnd>
  );
};

export default MusicPlayer;
