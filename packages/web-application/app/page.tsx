"use client"
import { Github } from 'github-repository';
import { Antict } from "antict-repository";

export default function Page() {
  return (
    <div>
      <Antict />
      <Github />
    </div>
  );
}
