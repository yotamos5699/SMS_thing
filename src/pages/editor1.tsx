import dynamic from "next/dynamic";
const Editor = dynamic(() =>
  import("../editor1/editor/page").then((res) => res.Editor)
);
export default Editor;
