
export function generateCallBackURL(scheme: string, action: string, params: any) {
    let result = "";
    for (let key in params) {
        if (typeof params[key] === "object") {
            const jsonString = JSON.stringify(params[key]).replace(
                /"([^"]+)_([^"]+)":/g,
                '"$1-$2":'
            );
            result += `${key}=${encodeURIComponent(jsonString)}&`;
        } else {
            result += `${key}=${encodeURIComponent(params[key])}&`;
        }
    }
    result = result.slice(0, -1); // remove last &
    return `${scheme}://x-callback-url/${action}?${result}`;
}

export default class Assignment {
    uid: string;
    name: string;
    ping: boolean;
    dueDate: Date;
    isZoom: boolean;
    link: string;
    details: string;

    constructor(uid: string, name: string, ping: boolean, dueDate: Date, isZoom: boolean, link: string, details: string) {
        this.uid = uid;
        this.name = name;
        this.ping = ping; // Unused for now
        this.dueDate = dueDate;
        this.isZoom = isZoom;
        this.link = link;
        this.details = details;
    }

    toTask(): any {
        let finalWhen;
        // If it's a zoom meeting, use date and time (make the time 30m before the meeting)
        if (this.isZoom) {
            let tempDate = new Date(this.dueDate);
            tempDate.setMinutes(tempDate.getMinutes() - 30);
            // By using date and time we set a reminder 30m before the meeting
            finalWhen =
                tempDate.toISOString().split("T")[0] + "@" +
                tempDate
                    .toISOString()
                    .split("T")[1]
                    .split(":")
                    .slice(0, 2)
                    .join(":");
        }

        // Else use date only and make it 4 days before the assignment is due E.g. 2018-02-21
        else {
            let tempDate = new Date(this.dueDate);
            tempDate.setDate(tempDate.getDate() - 4);
            finalWhen = tempDate.toISOString().split("T")[0];
        }

        return {
            type: "to-do",
            attributes: {
                title: this.isZoom ? "Zoom Meeeting " : "" + this.name,
                notes: this.details + "\n\n" + this.link,
                when: finalWhen,
                // format: yyyy-mm-dd
                deadline: this.dueDate.toISOString().split("T")[0],
            },
        };
    }
}

// function to convert a date in utc to a date in local time
export function convertUTCToLocal(utcDate: Date): Date {
    const localDate = new Date(
        utcDate.getTime() - utcDate.getTimezoneOffset() * 60 * 1000
    );
    return localDate;
}
