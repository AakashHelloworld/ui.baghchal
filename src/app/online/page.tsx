import { Suspense } from "react";
import Board from "./_components/Board";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
  } from "@/components/ui/resizable"
export default function Game() {
    return (<>
      {/* <ResizablePanelGroup direction='horizontal' className='w-[100%] h-[100%]'>
      <ResizablePanel> */}
      <Suspense>
            <Board />
      </Suspense>
        {/* </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>
            <Tree />
         </ResizablePanel>
    </ResizablePanelGroup>  */}
    </>)
}