export interface VSCodeFileNode {
  readonly name: string;
  readonly path: string;
  readonly type: "file";
}

export interface VSCodeFolderNode {
  readonly name: string;
  readonly path: string;
  readonly type: "folder";
  readonly children: readonly VSCodeTreeNode[];
}

export type VSCodeTreeNode = VSCodeFileNode | VSCodeFolderNode;

export interface VSCodeOpenTab {
  readonly path: string;
  readonly name: string;
}

export interface VSCodeFileResponse {
  readonly path: string;
  readonly language: string;
  readonly lineCount: number;
  readonly html: string;
}
