import { ITicketType } from "@models/ticket/ITicketType";
import { ModeButton } from "./ModeButton";

export type IProps = {
    project_main: boolean,
    project_code: string,
    type: ITicketType,
    code: string,
    name: string,
}

export const ModeReport = (props: IProps) => {

    const code_treated: string = props.code.toUpperCase();
    let copy_string: string = `[${code_treated}]: ${props.name}`;

    if (!props.project_main) {
        const project_treated: string = props.project_code
            .toUpperCase()
            .replaceAll(' ', '-');
        copy_string = `[${project_treated}]: ${copy_string}`
    }

    return <ModeButton
        mode_name="Report Code"
        copy_code={copy_string}
    />
    
}