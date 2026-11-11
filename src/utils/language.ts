export type LanguageKey =
  | 'c'
  | 'cpp'
  | 'python'
  | 'java'
  | 'assembly'
  | 'shell'
  | 'go'
  | 'rust'
  | 'javascript'
  | 'typescript'
  | 'csharp'
  | 'sql'
  | 'r'
  | 'other';

export function toLanguageKey(name: string): LanguageKey {
  switch (name.trim().toLowerCase()) {
    case 'c':
      return 'c';
    case 'c++':
    case 'cpp':
      return 'cpp';
    case 'python':
      return 'python';
    case 'java':
      return 'java';
    case 'assembly':
    case 'asm':
      return 'assembly';
    case 'shell':
    case 'bash':
    case 'sh':
      return 'shell';
    case 'go':
    case 'golang':
      return 'go';
    case 'rust':
      return 'rust';
    case 'javascript':
    case 'js':
      return 'javascript';
    case 'typescript':
    case 'ts':
      return 'typescript';
    case 'c#':
    case 'csharp':
      return 'csharp';
    case 'sql':
      return 'sql';
    case 'r':
      return 'r';
    default:
      return 'other';
  }
}