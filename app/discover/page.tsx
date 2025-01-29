"use client"

import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search } from "lucide-react"

const categories = ["Trending", "Comedy", "Dance", "Food", "Sports", "Music"]

const trendingVideos = [
  {
    id: 1,
    thumbnail: "https://images.unsplash.com/photo-1516684732162-798a0062be99?w=400&h=600&fit=crop",
    views: "2.5M",
    title: "Amazing dance moves! 💃",
  },
  {
    id: 2,
    thumbnail: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=600&fit=crop",
    views: "1.8M",
    title: "Cooking with passion 🍳",
  },
]

export default function Discover() {
  return (
    <div className="min-h-screen bg-background p-4 pb-20 md:pl-20">
      <div className="mx-auto max-w-4xl">
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search"
            className="pl-10"
          />
        </div>

        <Tabs defaultValue="trending">
          <TabsList className="mb-6 flex w-full space-x-2 overflow-x-auto">
            {categories.map((category) => (
              <TabsTrigger
                key={category}
                value={category.toLowerCase()}
                className="flex-shrink-0"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="trending" className="mt-0">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {trendingVideos.map((video) => (
                <Card
                  key={video.id}
                  className="group relative overflow-hidden rounded-lg"
                >
                  <div
                    className="aspect-[3/4] bg-cover bg-center"
                    style={{ backgroundImage: `url(${video.thumbnail})` }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                    <p className="text-sm font-medium text-white">{video.title}</p>
                    <p className="text-xs text-white/80">{video.views} views</p>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}