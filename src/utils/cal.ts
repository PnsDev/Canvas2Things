import ical from "node-ical";
import Assignment, { convertUTCToLocal, generateCallBackURL } from "../utils/misc";

export function parseCalendar(rawICS: string) {
    const classMap: Map<string, Map<string, Assignment>> = new Map();
    const parsedCal = ical.sync.parseICS(rawICS);

    console.log("Parsing calendar...");

    for (let k in parsedCal) {
        if (!k.startsWith("event")) continue;

        let event: any = parsedCal[k];

        // Get class name form patter of "Assignment Name [Class Name]"
        const className = event.summary.match(/\[(.*)\]/)[1];

        // Create the assignment to be added
        const assignmentTBA = new Assignment(
            event.uid.split("-").pop(),
            event.summary.replace(`[${className}]`, "").trim(),
            event.datetype === "date" ? false : true,
            // Convert date to local time using the timezone env variable
            convertUTCToLocal(event.start),
            event.description ? event.description.toLowerCase().includes("zoom") : "",
            event.url,
            event.description ? event.description : ""
        );

        if (!classMap.has(className)) classMap.set(className, new Map());
        const targetClass = classMap.get(className);
        if (!targetClass) return "";

        // Create the assignment (or replace it if it already exists)
        if (targetClass.has(assignmentTBA.uid) && !k.includes("override")) continue;
        targetClass.set(assignmentTBA.uid, assignmentTBA);
    }

    // All classes and assignments are now in the classMap
    // Now we need to convert them to tasks
    console.log("Converting to tasks...");
    let tasks = [];
    for (let [className, assignments] of classMap) {
        // Create the project
        let finalProject: any = {
            type: "project",
            attributes: {
                title: className,
                items: [],
            },
        };

        // Add the project to the tasks
        for (let assignment of assignments.values()) {
            finalProject.attributes.items.push(assignment.toTask());
        }

        // Add the project to the tasks
        tasks.push(finalProject);
    }

    console.log("Writing to file temp...");
    return generateCallBackURL("things", "json", { data: tasks });
}