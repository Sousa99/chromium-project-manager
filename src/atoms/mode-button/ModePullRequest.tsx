import { ITicketType } from "@models/ticket/ITicketType";
import { ModeButton } from "./ModeButton";

export type IProps = {
    type: ITicketType,
    code: string,
    name: string,
}

export const ModePullRequest = (props: IProps) => {

    const code_treated: string = props.code.toUpperCase();

    const copy_string: string = `[${code_treated}]: ${props.type}: ${props.name}`;

    return <ModeButton
        mode_name="Pull Request Title"
        copy_code={copy_string}
    />
    
}