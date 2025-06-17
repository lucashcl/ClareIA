"use client";

import { useState } from "react";
import { Search, BookOpen, Upload, Home, Settings } from "lucide-react";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarInput,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";

type Summary = {
  id: string;
  title: string;
  date: string;
};

type Discipline = {
  name: string;
  summaries: Summary[];
};

type RevisionSidebarProps = {
  periods: {
    name: string;
    disciplines: Discipline[];
  }[];
};

export function RevisionSidebar({ periods }: RevisionSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSummary, setActiveSummary] = useState<string | null>(null);

  // Update the filteredAcademicPeriods to sort summaries by date (most recent first)
  const filteredAcademicPeriods = periods
    .map((period) => ({
      ...period,
      disciplines: period.disciplines
        .map((discipline) => ({
          ...discipline,
          summaries: discipline.summaries
            .filter((summary) =>
              summary.title.toLowerCase().includes(searchQuery.toLowerCase()),
            )
            .sort(
              (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
            ),
        }))
        .filter((discipline) => discipline.summaries.length > 0),
    }))
    .filter((period) => period.disciplines.length > 0);

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <BookOpen className="h-6 w-6" />
          <h1 className="text-xl font-bold">ClareIA</h1>
        </div>
        <div className="px-2 pb-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <SidebarInput
              placeholder="Pesquisar resumo..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  className="hover:bg-secondary transition"
                  tooltip="Upload"
                  asChild
                >
                  <Link href="/upload">
                    <Upload className="h-4 w-4" />
                    <span>Enviar resumo</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {filteredAcademicPeriods.map((period) => (
          <SidebarGroup key={period.name}>
            <SidebarGroupLabel>{period.name}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {period.disciplines.map((discipline) => (
                  <SidebarMenuItem key={discipline.name}>
                    <SidebarMenuButton>
                      <BookOpen className="h-4 w-4" />
                      <span>{discipline.name}</span>
                    </SidebarMenuButton>
                    <SidebarMenuSub>
                      {discipline.summaries.map((summary) => (
                        <SidebarMenuSubItem key={summary.id}>
                          <SidebarMenuSubButton
                            isActive={activeSummary === summary.id}
                            onClick={() => setActiveSummary(summary.id)}
                            asChild
                          >
                            <Link
                              href={`/resumos/${summary.id}`}
                              className="flex flex-col items-start"
                            >
                              <span className="text-sm">{summary.title}</span>
                              {/* <span className="text-xs text-muted-foreground">
                                {new Date(summary.date).toLocaleDateString()}
                              </span> */}
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
