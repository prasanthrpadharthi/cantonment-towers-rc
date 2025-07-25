"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ClassicTheme } from "./themes/classic-theme"
import { ModernTheme } from "./themes/modern-theme"
import { FestivalTheme } from "./themes/festival-theme"
import { Palette, Sparkles, PartyPopper } from "lucide-react"

export function ThemeTabs() {
  return (
    <div className="min-h-screen">
      <Tabs defaultValue="classic" className="w-full">
        <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b">
          <div className="container mx-auto px-4">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 my-4">
              <TabsTrigger value="classic" className="flex items-center gap-2">
                <Palette className="h-4 w-4" />
                Classic SG
              </TabsTrigger>
              <TabsTrigger value="modern" className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Modern
              </TabsTrigger>
              <TabsTrigger value="festival" className="flex items-center gap-2">
                <PartyPopper className="h-4 w-4" />
                Festival
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        <TabsContent value="classic" className="mt-0">
          <ClassicTheme />
        </TabsContent>

        <TabsContent value="modern" className="mt-0">
          <ModernTheme />
        </TabsContent>

        <TabsContent value="festival" className="mt-0">
          <FestivalTheme />
        </TabsContent>
      </Tabs>
    </div>
  )
}
