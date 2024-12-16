export default function locationMapper(location: string | undefined): string {
    switch (location) {
        case "FIFTH_FLOOR":
            return "5F";
        case "SIXTH_FLOOR":
            return "6F";
        case "DATA_STATION":
            return "DS";
        default:
            return "";
    }
}


