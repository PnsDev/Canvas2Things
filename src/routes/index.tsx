import "./index.css";

import { createSignal } from "solid-js";
import { createDropzone, createFileUploader, UploadFile } from "@solid-primitives/upload";
import { parseCalendar } from "~/utils/cal";

export default function Home() {
    const [thingsJSON, setThingsJSON] = createSignal("");
    const [loading, setLoading] = createSignal(false);
    const { selectFiles } = createFileUploader({ multiple: false, accept: "text/calendar" });

    const findUsableFile = (files: UploadFile[]) => {
        let icsFile = undefined;
        for (let file of files) {
            if (file.file.type !== "text/calendar") continue;
            icsFile = file;
            break;
        }
    
        // If no ics file was found, return undefined
        if (icsFile === undefined) return undefined;
    
        setLoading(true);
    
        const reader = new FileReader();
        reader.readAsText(files[0].file);
        reader.onload = (event) => {
            if (event.target === null) {
                console.log("Error reading file");
                setLoading(false);
                return;
            }
            
            let res = parseCalendar(event.target.result as string);
            if (res === "") setLoading(false);
            setThingsJSON(res);
        };
    }

    // Read the files locally
    const handleClickEvent = () => {
        if (loading()) return;
        selectFiles(files => findUsableFile(files));
    }

    const { setRef: dropzoneRef } = createDropzone({
        onDrop: files => {
            if (loading()) return;
            findUsableFile(files);
        }
    });

    return (
        <main class="flex flex-col min-h-[100vh] justify-between">
            <div>
                <div class="mt-[64px] max-w-[500px] mx-auto">
                    <div class="flex justify-center">
                        <img src="/logos/canvas.svg" class="w-[98px] sm:w-[128px]"/>
                        <img src="/plus.svg" class="w-[61px] sm:w-[80px] ml-[18px] mr-[20px] sm:ml-[75px] sm:mr-[88px]"/>
                        <img src="/logos/things.svg" class="w-[88px] sm:w-[115px]"/>
                    </div>
                    <div class="text-center mt-[46px] sm:mt-[34px] mx-[41px]">
                        <h1 class="font-bold text-[31px] text-[#2B323B] px-1 sm:px-0">
                            Add Canvas to Things 3
                        </h1>
                        <p class="font-regular max-w-[486px] text-[16px] text-[#44474B] mt-[16px]">
                            Upgrade your scheduling experience with seamless Canvas Calendar integration for Things 3. Convert zoom calls and deadlines effortlessly, into things tasks. <strong>Things URLs need to be enabled</strong>.<br />🔒 All data is processed locally!
                        </p>
                    </div>
                </div>
                <div
                    ref={dropzoneRef}
                    class="mx-[41px] min-w-[309px] min-h-[266px] max-w-[565px] max-h-[310px] sm:mx-auto rounded-[11px] border-[3px] border-[#727C89] border-dashed mt-[38px] text-center font-medium pb-[20px] dropzone">
                    {
                        loading() === false ?
                            <div>
                                <svg width={128} height={118} class="mx-auto mt-[20px]">
                                    <image href="/folder/back.svg" width={19.63} height={58.5} x={107.1} y={53} />
                                    <image href="/folder/calendar.svg" width={72.23} height={77.13} x={51} y={6.5} class="calendar" />
                                    <image href="/folder/front.svg" width={119.6} height={82.43} x={0} y={35} />
                                </svg>
                                <h1 class="text-[22px] mt-[10px] text-[#44474B] px-[40px] sm:px-0">Get started by adding your ICS calendar</h1>
                                <button class="w-[105px] h-[33px] bg-[#4F91FB] text-white text-[19px] rounded-[11px] mt-[12px] hover:scale-[1.06] hover:bg-[#5f9bfc] ease-in-out duration-300" onClick={handleClickEvent}>Upload</button>
                            </div> :
                            <div>
                                {thingsJSON() === "" ?
                                    <div>
                                        <svg width={116} height={89} class="mx-auto mt-[40px]">
                                            <image href="/folder/flat.svg" width={115.8} height={88.28} x={0} y={0} />
                                            <image href="load.svg" width={40} height={40} x={38} y={30} />
                                        </svg>
                                        <h1 class="text-[22px] mt-[20px] text-[#44474B]">Processing your calendar...</h1>
                                    </div>
                                    :
                                    <div>
                                        <svg width={116} height={89} class="mx-auto mt-[40px]">
                                            <image href="/folder/flat.svg" width={115.8} height={88.28} x={0} y={0} />
                                            <image href="check.svg" width={45} height={40} x={38} y={30} />
                                        </svg>
                                        <div class="text-center mt-[13px]">
                                            <button
                                                onClick={() => window.open(thingsJSON())}
                                                class="w-[176px] h-[42px] bg-[#4F91FB] text-white text-[19px] rounded-[11px] hover:scale-[1.06] hover:bg-[#5f9bfc] ease-in-out duration-300">
                                                Add Things 3
                                            </button>
                                            <p class="text-[#9299A4] text-[15px] mt-[11px]">You’re almost done!<br />Click the button to add</p>
                                        </div>
                                    </div>
                                }
                            </div>
                    }
                </div>
            </div>
            <footer class="text-[#727C89] text-[18px] mb-[3px] mt-[7px] text-center">
                <p>
                    Made with
                    <span class="inline-flex align-text-bottom">

                        <svg xmlns="http://www.w3.org/2000/svg" fill="#EC8681" viewBox="0 0 24 24" stroke-Width={1.5} stroke="#EC8681" class="w-[18px] h-[18px] mx-[5px] pb-[2px]">
                            <path stroke-Linecap="round" stroke-Linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                            <animateTransform
                                id="beat"
                                attributeName="transform"
                                type="scale"
                                values="1; 1.5; 1.25; 1.5; 1.5; 1;"
                                dur="1s"
                                begin="1s;beat.end+2s"
                            />
                        </svg>
                    </span>
                    <a href="https://github.com/PnsDev">by <span class="underline underline-offset-4">PnsDev</span></a>
                </p>
            </footer>
        </main>
    );
}
