"use client"
import { Github } from 'github-repository';
import { Antict } from "antict-repository";
import { Theme } from 'theme';

export default function Page() {
  return (
    <div>
      <Antict />
      <Github />
      <Theme />
    </div>
  );
}
