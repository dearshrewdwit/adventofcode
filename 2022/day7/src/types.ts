interface File {
  type: string;
  name: string;
  size: number;
}

interface Directory {
  type: string;
  name: string;
  contents: Array<Directory | File>;
  size: number;
}

interface FileSystem {
  head: string[];
  tree: Array<Directory>;
}

export {
  FileSystem,
  File,
  Directory
}
