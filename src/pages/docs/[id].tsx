"use client";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import { Editor } from "react-draft-wysiwyg";
import { Dispatch, SetStateAction, useState } from "react";
import dynamic from "next/dynamic";
import { AtomicBlockUtils } from "draft-js";
import { EditorState } from "draft-js";
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((module) => module.Editor),
  {
    ssr: false,
  }
);

function Doc() {
  const [docConfig, setDocConfig] = useState({
    w: 329,
    h: 800,
  });
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const handleEditorChanges = (editorState: any) => {
    console.log({ editorState });
    setEditorState(editorState);
  };
  const uploadCallback = (file: any) => {
    return new Promise((resolve, reject) => {
      if (file) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          resolve({ data: { link: e.target.result } });
        };
        reader.readAsDataURL(file);
      }
    });
  };
  //   const uploadImageCallBack = async (file) => {
  //     const imgData = await apiClient.uploadInlineImageForArticle(file);
  //     return Promise.resolve({ data: {
  //       link: `${process.env.NEXT_PUBLIC_API_URL}${imgData[0].formats.small.url}`
  //     }});
  //   }
  //   async function uploadImageCallBack(file: any) {
  //     return new Promise((resolve, reject) => {
  //       const xhr = new XMLHttpRequest();
  //       //   xhr.open("POST", "https://api.imgur.com/3/image");
  //       //   xhr.setRequestHeader("Authorization", "Client-ID ##clientid##");
  //       //   const data = new FormData();
  //       //   data.append("image", file);
  //       //   xhr.send(data);
  //       //   xhr.addEventListener("load", () => {
  //       //     const d = xhr.responseText;
  //       //     console.log({ d });
  //       //     const response = JSON.parse(xhr.responseText);
  //       //     console.log(response);
  //       setEditorState(prev:)
  //       resolve({ image: file });
  //     });
  //     //   xhr.addEventListener("error", () => {
  //     //     const error = xhr.responseText;
  //     //     console.log(error);
  //     //     reject(error);
  //     //   });
  //     // });
  //   }

  return (
    <div className="flex w-full flex-col">
      <ToolsHeader docConfig={docConfig} setDocConfig={setDocConfig} />
      <div className="PB-16 bg-[#F8F9FA]">
        <Editor
          toolbar={{
            // options: ["image"],
            inline: { inDropdown: true },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: true },
            image: {
              uploadEnabled: true,
              uploadCallback: uploadCallback,
              previewImage: true,
              inputAccept: "image/gif,image/jpeg,image/jpg,image/png,image/svg",
              alt: { present: false, mandatory: false },
              defaultSize: {
                height: "auto",
                width: "auto",
              },
            },
          }}
          // image: {
          //   uploadCallback: uploadCallback,
          //   alt: { present: true, mandatory: true },
          // },
          //   }}
          toolbarClassName="sticky top-0 z-50 !justify-center mx-auto"
          editorClassName={`mt-6 bg-white shadow-lg max-w-${
            docConfig.w > 200 && docConfig.w < 3000
              ? "[" + docConfig.w + "px]"
              : "5xl"
          }mx-auto mb-12 border p-10 `}
          onContentStateChange={handleEditorChanges}
        />
      </div>
    </div>
  );
}

export default Doc;

interface ToolBarHeader {
  docConfig: {
    w: number;
    h: number;
  };
  setDocConfig: Dispatch<
    SetStateAction<{
      w: number;
      h: number;
    }>
  >;
}

const ToolsHeader = ({ docConfig, setDocConfig }: ToolBarHeader) => {
  return (
    <div className="sticky top-0 flex w-full bg-gray-600  shadow-md ">
      {/* <Button>
        <i className="fas fa-heart text-white" />
      </Button> */}
      <div className="flex w-1/4 flex-row-reverse items-center gap-2 text-white">
        <p>גובה</p>
        <input
          value={docConfig.h}
          onChange={(e) => {
            setDocConfig({ ...docConfig, h: parseInt(e.target.value) });
          }}
          className="h-3/4 w-1/3 rounded-lg text-center font-bold text-gray-700"
          type="number"
        />
      </div>
      <div className="flex w-1/4 flex-row-reverse items-center gap-2 text-white">
        <p>רוחב</p>
        <input
          value={docConfig.w}
          onChange={(e) => {
            setDocConfig({ ...docConfig, w: parseInt(e.target.value) });
          }}
          className="h-3/4 w-1/3 rounded-lg text-center font-bold text-gray-700"
          type="number"
        />
      </div>
    </div>
  );
};
