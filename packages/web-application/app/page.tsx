'use client';

import { Antict } from 'antict-repository';
import { Github } from 'github-repository';
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
