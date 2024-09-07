import { Antict } from 'antict-repository';
import { Github } from 'github-repository';

export default function Page() {
  return (
    <div>
      <Github />
      <Antict />
    </div>
  );
}
