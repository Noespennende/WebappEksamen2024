"use client";

import EventCards from "@/components/EventCards";
import HomePageSort from "@/components/HomePageSort";
import { useOccasion } from "@/hooks/useOccasion";
import { Month, OccasionCategory } from "@/types/Types";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import React, { useEffect, useState } from "react";


export default function Home() {

  const {data, status, getSorted} = useOccasion()

  const router = useRouter();
  const searchParams = useSearchParams();
  
  const handleMonthDropdownClick = (month: string) => {
    const params = new URLSearchParams(searchParams?.toString() || "");
    params.set("month", month);
    router.push(`?${params.toString()}`);
  }

  const handleYearInput = (yearInput: number) => {
    const params = new URLSearchParams(searchParams?.toString() || "");
    params.set("year", yearInput.toString());
    router.push(`?${params.toString()}`);
  }

  const handleCategorySelect = (category: string) => {
    const params = new URLSearchParams(searchParams?.toString() || "");
    params.set("category", category);
    router.push(`?${params.toString()}`);
  }
  
  useEffect(() => {
  }, [data])

  useEffect(() => {
    getSorted(searchParams)
  }, [searchParams])

  return (
    <section id="homePage">
      <HomePageSort onMonthSort={handleMonthDropdownClick} onYearSort={handleYearInput} onCategorySort={handleCategorySelect}/>
      <Link href="/opprett/arrangement" className="button" id="createEventButton">Opprett arrangement</Link>
      {status.loading ? <div className="loader"></div> : 
      <EventCards occasionList={data}/>}
    </section>
  )
}

