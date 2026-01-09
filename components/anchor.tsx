import { ExternalLink } from 'lucide-react';
type ExternalAnchorProps = {
  href: string;
  children: React.ReactNode;
};

export function anchor({ href, children }: ExternalAnchorProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-700 inline-flex items-center gap-1 hover:underline"
    >
      {children}
      <ExternalLink size={16} />
    </a>
  );
}