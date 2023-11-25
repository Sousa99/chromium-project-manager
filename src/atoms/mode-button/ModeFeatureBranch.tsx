import { ITicketType } from "@models/ticket/ITicketType";
import { ModeButton } from "./ModeButton";

export type IProps = {
    type: ITicketType,
    code: string,
    name: string,
}

export const ModeFeatureBranch = (props: IProps) => {

    const code_treated: string = props.code.toUpperCase();
    const name_treated: string = props.name
        .toLowerCase()
        .replaceAll(/[^a-zA-Z ]/g, " ")
        .replaceAll(/\s\s+/g, ' ')
        .replaceAll(' ', '-');

    const copy_string: string = `${props.type}/${code_treated}_${name_treated}`;

    return <ModeButton
        mode_name="Branch Name"
        copy_code={copy_string}
    />
    
}