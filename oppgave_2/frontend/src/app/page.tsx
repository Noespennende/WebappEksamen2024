"use client";

import EventCards from "@/components/EventCards";
import HomePageSort from "@/components/HomePageSort";
import Link from "next/link";
import React from "react";


export default function Home() {
  return (
    <section id="homePage">
      <HomePageSort/>
      <Link href="/opprett/arrangement" className="button" id="createEventButton">Opprett arrangement</Link>
      <EventCards/>
    </section>
  )
}

