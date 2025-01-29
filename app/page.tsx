"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, Share2, Music2, Volume2, VolumeX } from "lucide-react"

const videos = [
  {
    id: 1,
    username: "@dancingqueen",
    description: "Check out this new dance trend! 💃 #dance #viral",
    music: "Running Up That Hill - Kate Bush",
    likes: "1.2M",
    comments: "4.5K",
    shares: "2.3K",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-girl-in-neon-sign-1232-large.mp4",
  },
  {
    id: 2,
    username: "@urbanexplorer",
    description: "City vibes at night 🌃 #urban #nightlife",
    music: "Midnight City - M83",
    likes: "856K",
    comments: "2.1K",
    shares: "1.5K",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-tree-with-yellow-flowers-1173-large.mp4",
  },
  {
    id: 3,
    username: "@naturelover",
    description: "Beautiful sunset by the beach 🌅 #nature #sunset",
    music: "Ocean Waves - Nature Sounds",
    likes: "2.3M",
    comments: "8.7K",
    shares: "4.2K",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-waves-in-the-water-1164-large.mp4",
  },
  {
    id: 4,
    username: "@streetartist",
    description: "Street performance in NYC 🎭 #streetart #nyc",
    music: "Street Life - Randy Crawford",
    likes: "987K",
    comments: "3.4K",
    shares: "2.8K",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-young-woman-missing-a-basketball-shot-43053-large.mp4",
  }
]

export default function Home() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [isMuted, setIsMuted] = useState(true)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  useEffect(() => {
    const handleScroll = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const video = entry.target as HTMLVideoElement
        if (entry.isIntersecting) {
          video.play()
        } else {
          video.pause()
          video.currentTime = 0
        }
      })
    }

    const observer = new IntersectionObserver(handleScroll, {
      threshold: 0.6,
    })

    videoRefs.current.forEach((video) => {
      if (video) {
        observer.observe(video)
      }
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  const toggleMute = () => {
    setIsMuted(!isMuted)
    videoRefs.current.forEach((video) => {
      if (video) {
        video.muted = !isMuted
      }
    })
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background pb-16 md:pl-16">
      <div className="relative h-[calc(100vh-4rem)] w-full max-w-[500px] snap-y snap-mandatory overflow-y-scroll">
        {videos.map((video, index) => (
          <div
            key={video.id}
            className="relative h-[calc(100vh-4rem)] w-full snap-start"
          >
            <video
              ref={(el) => (videoRefs.current[index] = el)}
              src={video.videoUrl}
              className="h-full w-full object-cover"
              loop
              playsInline
              muted={isMuted}
              controls={false}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
              <div className="mb-4">
                <h2 className="text-lg font-bold text-white">{video.username}</h2>
                <p className="text-sm text-white/90">{video.description}</p>
                <div className="mt-2 flex items-center text-sm text-white/80">
                  <Music2 className="mr-2 h-4 w-4" />
                  <span>{video.music}</span>
                </div>
              </div>
            </div>
            <div className="absolute bottom-20 right-4 flex flex-col items-center space-y-4">
              <Button 
                size="icon" 
                variant="ghost" 
                className="h-12 w-12 rounded-full bg-black/20 text-white hover:bg-black/40"
                onClick={toggleMute}
              >
                {isMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
              </Button>
              <Button size="icon" variant="ghost" className="h-12 w-12 rounded-full bg-black/20 text-white hover:bg-black/40">
                <Heart className="h-6 w-6" />
                <span className="mt-1 text-xs">{video.likes}</span>
              </Button>
              <Button size="icon" variant="ghost" className="h-12 w-12 rounded-full bg-black/20 text-white hover:bg-black/40">
                <MessageCircle className="h-6 w-6" />
                <span className="mt-1 text-xs">{video.comments}</span>
              </Button>
              <Button size="icon" variant="ghost" className="h-12 w-12 rounded-full bg-black/20 text-white hover:bg-black/40">
                <Share2 className="h-6 w-6" />
                <span className="mt-1 text-xs">{video.shares}</span>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}