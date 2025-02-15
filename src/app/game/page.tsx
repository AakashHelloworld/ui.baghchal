import Board from "./_components/Board";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
  } from "@/components/ui/resizable"
import Tree from "./_components/Tree";
export default function Game() {
    return (<>
      {/* <ResizablePanelGroup direction='horizontal' className='w-[100%] h-[100%]'> */}
      {/* <ResizablePanel> */}
            {/* <Board /> */}
        {/* </ResizablePanel> */}
        {/* <ResizableHandle /> */}
        {/* <ResizablePanel> */}
            <Tree />
        {/* </ResizablePanel>
    </ResizablePanelGroup> */}
    </>)
}